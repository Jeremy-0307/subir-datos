import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { buildSync } from 'esbuild/lib/main.js';
// @ts-ignore
import XLSX from 'xlsx/xlsx.js';
import os from 'os';
import { execSync } from 'child_process';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sheets = ["tag", "business", "product"];
let columnType = new Map();
export async function mainCreator() {
    const outputDir = path.join(process.cwd(), 'output');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    let fileStr = `
import { initializeApp } from 'firebase/app';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { getFirestore, addDoc, setDoc, doc, collection, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { Tag, Business, Product } from 'dbtypes'
`;
    let extracted = {};
    sheets.forEach(sheet => {
        const filePath = path.join(outputDir, `${sheet}.ts`);
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            const regex = /export\s+const\s+(\w+)/g;
            let match;
            let names = [];
            while ((match = regex.exec(content)) !== null) {
                names.push(match[1]);
            }
            extracted[sheet] = names;
            if (names.length > 0) {
                fileStr += `import { ${names.join(', ')} } from './${sheet}';\n`;
            }
        }
        else {
            return { success: false, message: `File not found: ${filePath}` };
        }
    });
    fileStr += `
const storeBusiness = async (db: Firestore, auth: Auth, biz: Business): Promise<Business> => {
  const newBusiness = biz;
  const businessCollection = collection(db, "businesses");
  await setDoc(doc(businessCollection, newBusiness.firebaseUserId), newBusiness);
  return newBusiness;
};\n\n`;
    fileStr += `
const storeProducts = async (db: Firestore, products: Product[], business: Business): Promise<void> => {
  for (let i = 0; i < products.length; i++) {
    const currentProd = products[i];
    await addDoc(collection(db, "products"), currentProd);
  }
};\n\n`;
    fileStr += `
export default async function run() {
  const firebaseConfig = require(path.join(__dirname, 'firebaseConfig'));
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);\n\n`;
    if (extracted['tag'] && extracted['tag'].length > 0) {
        extracted['tag'].forEach((tagName) => {
            fileStr += `  await addDoc(collection(db, "tag"), ${tagName});\n`;
        });
    }
    if (extracted['business'] && extracted['business'].length > 0) {
        extracted['business'].forEach((bizName, index) => {
            fileStr += `  const FB${index} = await storeBusiness(db, auth, ${bizName});\n`;
        });
    }
    if (extracted['product'] && extracted['product'].length > 0) {
        extracted['product'].forEach((prodName) => {
            const businessRef = (extracted['business'] && extracted['business'].length > 0) ? extracted['business'][0] : 'undefined';
            fileStr += `  await storeProducts(db, [${prodName}], ${businessRef});\n`;
        });
    }
    fileStr += `  \n};module.exports = run;\n
module.exports.default = run;\n
module.exports.run = run;\n`;
    const outputPath = path.join(outputDir, 'index.ts');
    fs.writeFileSync(outputPath, fileStr, { encoding: 'utf8' });
    try {
        execSync(`tsc --noEmit "${outputPath}"`, { stdio: 'inherit' });
    }
    catch (error) {
        return { success: false, message: `${error}` };
    }
    const tsFilePath = path.resolve(process.cwd(), 'output/index.ts');
    const jsFilePath = path.resolve(process.cwd(), 'output/index.cjs');
    try {
        buildSync({
            entryPoints: [tsFilePath],
            outfile: jsFilePath,
            bundle: true,
            platform: 'node',
            format: 'cjs',
            target: 'es2020',
            external: ['@grpc/grpc-js'],
        });
        (async () => {
            try {
                const importedModule = await import(jsFilePath);
                const runFunction = typeof importedModule === 'function'
                    ? importedModule
                    : typeof importedModule.default === 'function'
                        ? importedModule.default
                        : null;
                if (runFunction) {
                    await runFunction();
                }
                else {
                    console.error("Error during execution: No valid function export found.");
                    return { success: false, message: `Hubo un error durante la ejecución` };
                }
            }
            catch (err) {
                console.error("********************* Error during execution *********************", err);
                return { success: false, message: `Hubo un error durante la ejecución` };
            }
        })();
    }
    catch (error) {
        console.error('********************* Error during build or execution *********************', error);
        return { success: false, message: `Hubo un error durante la ejecución` };
    }
    return { success: true, message: `Los datos fueron subidos exitosamente` };
}
export function excelToTS(filePath) {
    columnType = loadRules();
    if (!fs.existsSync(filePath)) {
        return { success: false, message: "El archivo enviado no existe" };
    }
    const outputDir = path.join(process.cwd(), 'output');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    const workbook = XLSX.readFile(filePath);
    let insertedData = {};
    for (const sheetName of sheets) {
        const sheet = workbook.Sheets[sheetName];
        if (!sheet) {
            return { success: false, message: `La hoja "${sheetName}" no existe en el archivo` };
        }
        const rows = XLSX.utils.sheet_to_json(sheet);
        const typeName = Normalize(sheetName);
        let tsFileContent = `import { ${typeName} } from 'dbtypes';\n\n`;
        if (sheetName !== "tag") {
            const tagFilePath = path.join(outputDir, 'tag.ts');
            if (fs.existsSync(tagFilePath)) {
                const content = fs.readFileSync(tagFilePath, 'utf8');
                const regex = /export\s+const\s+(\w+)/g;
                let match;
                let names = [];
                while ((match = regex.exec(content)) !== null) {
                    names.push(match[1]);
                }
                if (names.length > 0) {
                    tsFileContent += `import { ${names.join(', ')} } from './tag';\n\n`;
                }
            }
        }
        let processedRows = [];
        let fila = 0;
        let rowData = {};
        // @ts-ignore
        const firstRowRange = XLSX.utils.decode_range(sheet['!ref']);
        const allColumns = [];
        for (let col = firstRowRange.s.c; col <= firstRowRange.e.c; col++) {
            const cellAddress = XLSX.utils.encode_cell({ r: firstRowRange.s.r, c: col });
            const cell = sheet[cellAddress];
            allColumns.push(cell?.v || '');
        }
        for (const row of rows) {
            fila++;
            if (!row.name) {
                return { success: false, message: `La fila ${fila} no tiene la propiedad "name"` };
            }
            const exportName = Capitalize(String(row.name));
            const normalizedExportName = Normalize(exportName);
            let exportStr = "";
            if (row.businessId) {
                exportStr = `export const ${Normalize(row.businessId).replace(/ /g, "")}${normalizedExportName}: ${typeName} = {\n`;
            }
            else {
                exportStr = `export const ${normalizedExportName}: ${typeName} = {\n`;
            }
            for (const key of allColumns) {
                let value = row[key];
                let processedValue;
                if (key == 'created' || key == 'lastUpdate') {
                    processedValue = Number(Date.now());
                    value = 'time';
                }
                else {
                    processedValue = ColumnHandler(key, value);
                }
                if (value === undefined &&
                    (key === 'name' || key === 'businessId' || key === 'firebaseUserId')) {
                    return { success: false, message: `La columna ${key} en la fila ${fila} en la hoja de ${sheetName} no puede ser vacia` };
                }
                processedValue =
                    value === undefined
                        ? Array.isArray(processedValue)
                            ? []
                            : typeof processedValue === "object"
                                ? {}
                                : ""
                        : processedValue;
                exportStr += `  ${key}: ${formatValue(processedValue)},\n`;
                rowData[key] = processedValue;
            }
            ;
            exportStr += '};\n\n';
            tsFileContent += exportStr;
            processedRows.push(rowData);
        }
        const outputPath = path.join(outputDir, `${sheetName}.ts`);
        fs.writeFileSync(outputPath, tsFileContent, { encoding: 'utf8' });
        insertedData[sheetName] = {
            tsContent: tsFileContent,
            rows: processedRows
        };
    }
    return { success: true, message: "exitoso " };
}
function Capitalize(str) {
    return str
        .trim()
        .split(/\s+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
}
function Normalize(input) {
    if (typeof input !== 'string')
        return input;
    let normalized = input.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    normalized = normalized.replace(/[àáâãäå]/g, 'a')
        .replace(/[èéêë]/g, 'e')
        .replace(/[ìíîï]/g, 'i')
        .replace(/[òóôõö]/g, 'o')
        .replace(/[ùúûü]/g, 'u')
        .replace(/ñ/g, 'n')
        .replace(/ç/g, 'c');
    normalized = normalized.charAt(0).toUpperCase() + normalized.slice(1);
    return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}
function loadRules() {
    const rulesPath = path.join(os.homedir(), 'Downloads', 'funciones.xlsx');
    const workbook = XLSX.readFile(rulesPath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rules = XLSX.utils.sheet_to_json(sheet);
    rules.forEach((rule) => {
        if (rule.columnName && rule.type) {
            columnType.set(rule.columnName, rule.type.toLowerCase());
        }
    });
    return columnType;
}
function ColumnHandler(key, value) {
    const tipo = columnType.get(key);
    if (tipo === 'undefined') {
        return value;
    }
    if (tipo) {
        switch (tipo) {
            case 'json':
                if (typeof value === 'string') {
                    try {
                        let jsonString = value.trim();
                        if (!jsonString.startsWith('{')) {
                            jsonString = '{' + jsonString + '}';
                        }
                        jsonString = jsonString.replace(/(\w+):/g, '"$1":');
                        let parsed = JSON.parse(jsonString);
                        if (key.toLowerCase() === 'currentlocation' && typeof parsed === 'object' && parsed !== null) {
                            const newObj = {};
                            Object.keys(parsed).forEach(k => {
                                newObj[k.toLowerCase()] = parsed[k];
                            });
                            parsed = newObj;
                        }
                        const cleanedObject = Object.fromEntries(Object.entries(parsed).map(([k, v]) => [k.replace(/"/g, ''), v]));
                        return cleanedObject;
                    }
                    catch (error) {
                        console.error(`Error parseando JSON en columna ${key}:`, error);
                    }
                }
                return value;
            case 'time':
            case 'date':
                const parsedDate = new Date(value);
                if (isNaN(parsedDate.getTime())) {
                    console.warn(`Valor de fecha inválido para ${key}, asignando NOW.`);
                    return new Date();
                }
                return parsedDate;
            case 'list':
            case 'array':
                if (!value) {
                    return [];
                }
                let arr = value.includes('\n')
                    ? value.split('\n').map((item) => Normalize(item.trim()))
                    : [Normalize(value.trim())];
                if (value.includes('{')) {
                    arr = arr.map((a) => {
                        try {
                            return eval('(' + a + ')');
                        }
                        catch (error) {
                            console.error('Failed to parse array element:', a, error);
                            return a;
                        }
                    });
                }
                return arr;
            default:
                return String(value).trim();
        }
    }
    else {
        return value;
    }
}
function formatValue(value) {
    if (typeof value === 'string') {
        return `'${value.replace(/'/g, "\\'")}'`;
    }
    else if (typeof value === 'number' || typeof value === 'boolean') {
        return String(value);
    }
    else if (value instanceof Date) {
        if (isNaN(value.getTime())) {
            return `new Date()`;
        }
        return `new Date('${value.toISOString()}')`;
    }
    else if (Array.isArray(value)) {
        const validIdentifier = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
        return `[${value
            .map(item => {
            if (typeof item === 'string' && validIdentifier.test(item)) {
                return item;
            }
            else {
                return formatValue(item);
            }
        })
            .join(', ')}]`;
    }
    else if (typeof value === 'object' && value !== null) {
        return JSON.stringify(value);
    }
    else {
        return String(value);
    }
}
