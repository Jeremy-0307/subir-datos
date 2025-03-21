"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainCreator = mainCreator;
exports.excelToTS = excelToTS;
var url_1 = require("url");
var path_1 = require("path");
var fs_1 = require("fs");
var main_js_1 = require("esbuild/lib/main.js");
var xlsx_js_1 = require("xlsx/xlsx.js");
var os_1 = require("os");
var child_process_1 = require("child_process");
var __filename = (0, url_1.fileURLToPath)(import.meta.url);
var __dirname = path_1.default.dirname(__filename);
var sheets = ["tag", "business", "product"];
var columnType = new Map();
function mainCreator() {
    return __awaiter(this, void 0, void 0, function () {
        var outputDir, fileStr, extracted, outputPath, tsFilePath, jsFilePath;
        var _this = this;
        return __generator(this, function (_a) {
            outputDir = path_1.default.join(process.cwd(), 'output');
            if (!fs_1.default.existsSync(outputDir)) {
                fs_1.default.mkdirSync(outputDir, { recursive: true });
            }
            fileStr = "\nimport { initializeApp } from 'firebase/app';\nimport * as fs from 'fs';\nimport { getFirestore, addDoc, setDoc, doc, collection, Firestore } from 'firebase/firestore';\nimport { getAuth, Auth } from 'firebase/auth';\nimport { Tag, Business, Product } from 'dbtypes';\n\n";
            extracted = {};
            sheets.forEach(function (sheet) {
                var filePath = path_1.default.join(outputDir, "".concat(sheet, ".ts"));
                if (fs_1.default.existsSync(filePath)) {
                    var content = fs_1.default.readFileSync(filePath, 'utf8');
                    var regex = /export\s+const\s+(\w+)/g;
                    var match = void 0;
                    var names = [];
                    while ((match = regex.exec(content)) !== null) {
                        names.push(match[1]);
                    }
                    extracted[sheet] = names;
                    if (names.length > 0) {
                        fileStr += "import { ".concat(names.join(', '), " } from './").concat(sheet, "';\n");
                    }
                }
                else {
                    return { success: false, message: "File not found: ".concat(filePath) };
                }
            });
            fileStr += "\nconst loadFirebaseConfig = (): any => {\n  const configPath = './firebaseConfig.json';\n  const configData = fs.readFileSync(configPath, 'utf8');\n  return JSON.parse(configData);\n};\n";
            fileStr += "\nconst storeBusiness = async (db: Firestore, auth: Auth, biz: Business): Promise<Business> => {\n  const newBusiness = biz;\n  const businessCollection = collection(db, \"businesses\");\n  await setDoc(doc(businessCollection, newBusiness.firebaseUserId), newBusiness);\n  return newBusiness;\n};\n\n";
            fileStr += "\nconst storeProducts = async (db: Firestore, products: Product[], business: Business): Promise<void> => {\n  for (let i = 0; i < products.length; i++) {\n    const currentProd = products[i];\n    await addDoc(collection(db, \"products\"), currentProd);\n  }\n};\n\n";
            fileStr += "\nexport default async function run() {\n  const firebaseConfig = {\n    apiKey: \"AIzaSyAUSHyN10whF0KBMwR_nOpc_RHWQq1G5Zg\",\n    authDomain: \"coope-borbon-27d4e.firebaseapp.com\",\n    projectId: \"coope-borbon-27d4e\",\n    storageBucket: \"coope-borbon-27d4e.firebasestorage.app\",\n    messagingSenderId: \"544708923892\",\n    appId: \"1:544708923892:web:cc2ed329410e026372e9a1\",\n    measurementId: \"G-KELZCCR1C9\"\n  };\n  const app = initializeApp(firebaseConfig);\n  const db = getFirestore(app);\n  const auth = getAuth(app);\n\n";
            if (extracted['tag'] && extracted['tag'].length > 0) {
                extracted['tag'].forEach(function (tagName) {
                    fileStr += "  await addDoc(collection(db, \"tag\"), ".concat(tagName, ");\n");
                });
            }
            if (extracted['business'] && extracted['business'].length > 0) {
                extracted['business'].forEach(function (bizName, index) {
                    fileStr += "  const FB".concat(index, " = await storeBusiness(db, auth, ").concat(bizName, ");\n");
                });
            }
            if (extracted['product'] && extracted['product'].length > 0) {
                extracted['product'].forEach(function (prodName) {
                    var businessRef = (extracted['business'] && extracted['business'].length > 0) ? extracted['business'][0] : 'undefined';
                    fileStr += "  await storeProducts(db, [".concat(prodName, "], ").concat(businessRef, ");\n");
                });
            }
            fileStr += "  process.exit(0);\n};\n\n";
            outputPath = path_1.default.join(outputDir, 'index.ts');
            fs_1.default.writeFileSync(outputPath, fileStr, { encoding: 'utf8' });
            try {
                (0, child_process_1.execSync)("tsc --noEmit \"".concat(outputPath, "\""), { stdio: 'inherit' });
            }
            catch (error) {
                return [2 /*return*/, { success: false, message: "".concat(error) }];
            }
            tsFilePath = path_1.default.resolve(process.cwd(), 'output/index.ts');
            jsFilePath = path_1.default.resolve(process.cwd(), 'output/index.cjs');
            try {
                (0, main_js_1.buildSync)({
                    entryPoints: [tsFilePath],
                    outfile: jsFilePath,
                    bundle: true,
                    platform: 'node',
                    format: 'cjs',
                    target: 'node16',
                    external: ['@grpc/grpc-js'],
                });
                (function () { return __awaiter(_this, void 0, void 0, function () {
                    var importedModule, runFunction, err_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, Promise.resolve("".concat(jsFilePath)).then(function (s) { return require(s); })];
                            case 1:
                                importedModule = _a.sent();
                                runFunction = typeof importedModule === 'function'
                                    ? importedModule
                                    : typeof importedModule.default === 'function'
                                        ? importedModule.default
                                        : null;
                                if (runFunction) {
                                    runFunction();
                                }
                                else {
                                    console.error("Error during execution: No valid function export found.");
                                    return [2 /*return*/, { success: false, message: "Hubo un error durante la ejecuci\u00F3n" }];
                                }
                                return [3 /*break*/, 3];
                            case 2:
                                err_1 = _a.sent();
                                console.error("********************* Error during execution *********************", err_1);
                                return [2 /*return*/, { success: false, message: "Hubo un error durante la ejecuci\u00F3n" }];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); })();
            }
            catch (error) {
                console.error('********************* Error during build or execution *********************', error);
                return [2 /*return*/, { success: false, message: "Hubo un error durante la ejecuci\u00F3n" }];
            }
            return [2 /*return*/, { success: true, message: "Los datos fueron subidos exitosamente" }];
        });
    });
}
function excelToTS(filePath) {
    columnType = loadRules();
    if (!fs_1.default.existsSync(filePath)) {
        return { success: false, message: "El archivo enviado no existe" };
    }
    var outputDir = path_1.default.join(process.cwd(), 'output');
    if (!fs_1.default.existsSync(outputDir)) {
        fs_1.default.mkdirSync(outputDir, { recursive: true });
    }
    var workbook = xlsx_js_1.default.readFile(filePath);
    var insertedData = {};
    // Se asume que "sheets" es un arreglo de nombres de hojas a procesar
    for (var _i = 0, sheets_1 = sheets; _i < sheets_1.length; _i++) {
        var sheetName = sheets_1[_i];
        var sheet = workbook.Sheets[sheetName];
        if (!sheet) {
            return { success: false, message: "La hoja \"".concat(sheetName, "\" no existe en el archivo") };
        }
        var rows = xlsx_js_1.default.utils.sheet_to_json(sheet);
        var typeName = Normalize(sheetName);
        var tsFileContent = "import { ".concat(typeName, " } from 'dbtypes';\n\n");
        if (sheetName !== "tag") {
            var tagFilePath = path_1.default.join(outputDir, 'tag.ts');
            if (fs_1.default.existsSync(tagFilePath)) {
                var content = fs_1.default.readFileSync(tagFilePath, 'utf8');
                var regex = /export\s+const\s+(\w+)/g;
                var match = void 0;
                var names = [];
                while ((match = regex.exec(content)) !== null) {
                    names.push(match[1]);
                }
                if (names.length > 0) {
                    tsFileContent += "import { ".concat(names.join(', '), " } from './tag';\n\n");
                }
            }
        }
        var processedRows = [];
        var _loop_1 = function (row) {
            if (!row.name) {
                return { value: { success: false, message: "La fila no tiene la propiedad \"name\"" } };
            }
            var exportName = Capitalize(String(row.name));
            var normalizedExportName = Normalize(exportName);
            var exportStr = "";
            if (row.businessId) {
                exportStr = "export const ".concat(Normalize(row.businessId).replace(/ /g, "")).concat(normalizedExportName, ": ").concat(typeName, " = {\n");
            }
            else {
                exportStr = "export const ".concat(normalizedExportName, ": ").concat(typeName, " = {\n");
            }
            var rowData = {};
            Object.keys(row).forEach(function (key) {
                var value = row[key];
                var processedValue = ColumnHandler(key, value);
                exportStr += "  ".concat(key, ": ").concat(formatValue(processedValue), ",\n");
                rowData[key] = processedValue;
            });
            exportStr += '};\n\n';
            tsFileContent += exportStr;
            processedRows.push(rowData);
        };
        for (var _a = 0, rows_1 = rows; _a < rows_1.length; _a++) {
            var row = rows_1[_a];
            var state_1 = _loop_1(row);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        var outputPath = path_1.default.join(outputDir, "".concat(sheetName, ".ts"));
        fs_1.default.writeFileSync(outputPath, tsFileContent, { encoding: 'utf8' });
        insertedData[sheetName] = {
            tsContent: tsFileContent,
            rows: processedRows
        };
    }
    return { success: true, message: insertedData };
}
function Capitalize(str) {
    return str
        .trim()
        .split(/\s+/)
        .map(function (word) { return word.charAt(0).toUpperCase() + word.slice(1); })
        .join('');
}
function Normalize(input) {
    if (typeof input !== 'string')
        return input;
    var normalized = input.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    normalized = normalized.replace(/[àáâãäå]/g, 'a')
        .replace(/[èéêë]/g, 'e')
        .replace(/[ìíîï]/g, 'i')
        .replace(/[òóôõö]/g, 'o')
        .replace(/[ùúûü]/g, 'u')
        .replace(/ñ/g, 'n')
        .replace(/ç/g, 'c');
    return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}
function loadRules() {
    var rulesPath = path_1.default.join(os_1.default.homedir(), 'Downloads', 'funciones.xlsx');
    var workbook = xlsx_js_1.default.readFile(rulesPath);
    var sheet = workbook.Sheets[workbook.SheetNames[0]];
    var rules = xlsx_js_1.default.utils.sheet_to_json(sheet);
    rules.forEach(function (rule) {
        if (rule.columnName && rule.type) {
            columnType.set(rule.columnName, rule.type.toLowerCase());
        }
    });
    return columnType;
}
function ColumnHandler(key, value) {
    var type = columnType.get(key);
    if (typeof value === 'string') {
        value = Normalize(value);
    }
    if (type) {
        switch (type) {
            case 'int':
            case 'number':
                return Number(value) || 0;
            case 'json':
                if (typeof value === 'string') {
                    try {
                        var jsonString = value.trim();
                        if (!jsonString.startsWith('{')) {
                            jsonString = '{' + jsonString + '}';
                        }
                        jsonString = jsonString.replace(/(\w+):/g, '"$1":');
                        var parsed_1 = JSON.parse(jsonString);
                        // Para 'currentLocation', convertir las claves a minúsculas
                        if (key.toLowerCase() === 'currentlocation' && typeof parsed_1 === 'object' && parsed_1 !== null) {
                            var newObj_1 = {};
                            Object.keys(parsed_1).forEach(function (k) {
                                newObj_1[k.toLowerCase()] = parsed_1[k];
                            });
                            parsed_1 = newObj_1;
                        }
                        // Eliminar las comillas de las claves en el objeto resultante
                        var cleanedObject = Object.fromEntries(Object.entries(parsed_1).map(function (_a) {
                            var k = _a[0], v = _a[1];
                            return [k.replace(/"/g, ''), v];
                        }));
                        return cleanedObject;
                    }
                    catch (error) {
                        console.error("Error parseando JSON en columna ".concat(key, ":"), error);
                    }
                }
                return value;
            case 'time':
            case 'date':
                var parsedDate = new Date(value);
                if (isNaN(parsedDate.getTime())) {
                    console.warn("Valor de fecha inv\u00E1lido para ".concat(key, ", asignando NOW."));
                    return new Date(); // Si el valor es inválido, asignamos la fecha actual.
                }
                return parsedDate;
            case 'list':
            case 'array':
                var arr = void 0;
                if (typeof value === 'string') {
                    if (value.startsWith("{")) {
                        return [];
                    }
                    else {
                        arr = value.includes(',')
                            ? value.split(',').map(function (item) { return item.trim(); })
                            : [value.trim()];
                    }
                    return arr;
                }
                return value;
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
        return "'".concat(value.replace(/'/g, "\\'"), "'");
    }
    else if (typeof value === 'number' || typeof value === 'boolean') {
        return String(value);
    }
    else if (value instanceof Date) {
        // Check if date is valid before calling toISOString()
        if (isNaN(value.getTime())) {
            return "new Date()"; // Return current date if invalid
        }
        return "new Date('".concat(value.toISOString(), "')");
    }
    else if (Array.isArray(value)) {
        var validIdentifier_1 = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
        return "[".concat(value
            .map(function (item) {
            if (typeof item === 'string' && validIdentifier_1.test(item)) {
                return item; // Sin comillas
            }
            else {
                return formatValue(item);
            }
        })
            .join(', '), "]");
    }
    else if (typeof value === 'object' && value !== null) {
        return JSON.stringify(value);
    }
    else {
        return String(value);
    }
}
