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
exports.default = run;
var app_1 = require("firebase/app");
var fs = require("fs");
var firestore_1 = require("firebase/firestore");
var auth_1 = require("firebase/auth");
var tag_1 = require("./tag");
var business_1 = require("./business");
var product_1 = require("./product");
var loadFirebaseConfig = function () {
    var configPath = './firebaseConfig.json';
    var configData = fs.readFileSync(configPath, 'utf8');
    return JSON.parse(configData);
};
var storeBusiness = function (db, auth, biz) { return __awaiter(void 0, void 0, void 0, function () {
    var newBusiness, businessCollection;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newBusiness = biz;
                businessCollection = (0, firestore_1.collection)(db, "businesses");
                return [4 /*yield*/, (0, firestore_1.setDoc)((0, firestore_1.doc)(businessCollection, newBusiness.firebaseUserId), newBusiness)];
            case 1:
                _a.sent();
                return [2 /*return*/, newBusiness];
        }
    });
}); };
var storeProducts = function (db, products, business) { return __awaiter(void 0, void 0, void 0, function () {
    var i, currentProd;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < products.length)) return [3 /*break*/, 4];
                currentProd = products[i];
                return [4 /*yield*/, (0, firestore_1.addDoc)((0, firestore_1.collection)(db, "products"), currentProd)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}); };
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var firebaseConfig, app, db, auth, FB0, FB1, FB2, FB3, FB4, FB5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    firebaseConfig = {
                        apiKey: "AIzaSyAUSHyN10whF0KBMwR_nOpc_RHWQq1G5Zg",
                        authDomain: "coope-borbon-27d4e.firebaseapp.com",
                        projectId: "coope-borbon-27d4e",
                        storageBucket: "coope-borbon-27d4e.firebasestorage.app",
                        messagingSenderId: "544708923892",
                        appId: "1:544708923892:web:cc2ed329410e026372e9a1",
                        measurementId: "G-KELZCCR1C9"
                    };
                    app = (0, app_1.initializeApp)(firebaseConfig);
                    db = (0, firestore_1.getFirestore)(app);
                    auth = (0, auth_1.getAuth)(app);
                    return [4 /*yield*/, (0, firestore_1.addDoc)((0, firestore_1.collection)(db, "tag"), tag_1.ComidaRapida)];
                case 1:
                    _a.sent();
                    console.log('Negocio FB0 añadido:');
                    return [4 /*yield*/, (0, firestore_1.addDoc)((0, firestore_1.collection)(db, "tag"), tag_1.ComidaChina)];
                case 2:
                    _a.sent();
                    console.log('Negocio FB0 añadido:');
                    return [4 /*yield*/, (0, firestore_1.addDoc)((0, firestore_1.collection)(db, "tag"), tag_1.Farmacia)];
                case 3:
                    _a.sent();
                    console.log('Negocio FB0 añadido:');
                    return [4 /*yield*/, storeBusiness(db, auth, business_1.ElChamoDelEncantoHermanosSolano)];
                case 4:
                    FB0 = _a.sent();
                    return [4 /*yield*/, storeBusiness(db, auth, business_1.TramoNato)];
                case 5:
                    FB1 = _a.sent();
                    return [4 /*yield*/, storeBusiness(db, auth, business_1.TramoDelAngel)];
                case 6:
                    FB2 = _a.sent();
                    return [4 /*yield*/, storeBusiness(db, auth, business_1.ChamoGuzman)];
                case 7:
                    FB3 = _a.sent();
                    return [4 /*yield*/, storeBusiness(db, auth, business_1.ElJardinDeHugo)];
                case 8:
                    FB4 = _a.sent();
                    return [4 /*yield*/, storeBusiness(db, auth, business_1.ElRoperito)];
                case 9:
                    FB5 = _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.ElRoperitoHamburguesaConPapas], business_1.ElChamoDelEncantoHermanosSolano)];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.ElRoperitoHamburguesaSinPapas], business_1.ElChamoDelEncantoHermanosSolano)];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.ElchamodelencantoHermanosSolanoTomate], business_1.ElChamoDelEncantoHermanosSolano)];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.ElchamodelencantoHermanosSolanoCebollas], business_1.ElChamoDelEncantoHermanosSolano)];
                case 13:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.ElchamodelencantoHermanosSolanoFresa], business_1.ElChamoDelEncantoHermanosSolano)];
                case 14:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.ElchamodelencantoHermanosSolanoTomateCherry], business_1.ElChamoDelEncantoHermanosSolano)];
                case 15:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.ElchamodelencantoHermanosSolanoChileDulce], business_1.ElChamoDelEncantoHermanosSolano)];
                case 16:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.ElchamodelencantoHermanosSolanoPapa], business_1.ElChamoDelEncantoHermanosSolano)];
                case 17:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.ElchamodelencantoHermanosSolanoLimonMesino], business_1.ElChamoDelEncantoHermanosSolano)];
                case 18:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.ElchamodelencantoHermanosSolanoArracacheEnPelota], business_1.ElChamoDelEncantoHermanosSolano)];
                case 19:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.ElchamodelencantoHermanosSolanoArracachePicado], business_1.ElChamoDelEncantoHermanosSolano)];
                case 20:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.ElchamodelencantoHermanosSolanoBrocoli], business_1.ElChamoDelEncantoHermanosSolano)];
                case 21:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.ElchamodelencantoHermanosSolanoColiflor], business_1.ElChamoDelEncantoHermanosSolano)];
                case 22:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.TramoNatoPapa], business_1.ElChamoDelEncantoHermanosSolano)];
                case 23:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.TramoNatoChileDulce], business_1.ElChamoDelEncantoHermanosSolano)];
                case 24:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.TramoNatoBrocoli], business_1.ElChamoDelEncantoHermanosSolano)];
                case 25:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.TramoNatoColiflor], business_1.ElChamoDelEncantoHermanosSolano)];
                case 26:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.TramoNatoChayote], business_1.ElChamoDelEncantoHermanosSolano)];
                case 27:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.TramoNatoTomate], business_1.ElChamoDelEncantoHermanosSolano)];
                case 28:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.TramoNatoPepino], business_1.ElChamoDelEncantoHermanosSolano)];
                case 29:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.TramoNatoZanahoria], business_1.ElChamoDelEncantoHermanosSolano)];
                case 30:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.TramoNatoAyoteTierno], business_1.ElChamoDelEncantoHermanosSolano)];
                case 31:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.TramoNatoPina], business_1.ElChamoDelEncantoHermanosSolano)];
                case 32:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.TramoNatoCebollas], business_1.ElChamoDelEncantoHermanosSolano)];
                case 33:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.TramoNatoYuca], business_1.ElChamoDelEncantoHermanosSolano)];
                case 34:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.TramoNatoElote], business_1.ElChamoDelEncantoHermanosSolano)];
                case 35:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.TramoNatoRepollo], business_1.ElChamoDelEncantoHermanosSolano)];
                case 36:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.TramoNatoAjo], business_1.ElChamoDelEncantoHermanosSolano)];
                case 37:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.TramoNatoTamarindo], business_1.ElChamoDelEncantoHermanosSolano)];
                case 38:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.TramoNatoCamote], business_1.ElChamoDelEncantoHermanosSolano)];
                case 39:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.TramoNatoTiquisque], business_1.ElChamoDelEncantoHermanosSolano)];
                case 40:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.TramoNatoAyote], business_1.ElChamoDelEncantoHermanosSolano)];
                case 41:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.TramodelAngelTomate], business_1.ElChamoDelEncantoHermanosSolano)];
                case 42:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.TramodelAngelCas], business_1.ElChamoDelEncantoHermanosSolano)];
                case 43:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.TramodelAngelMora], business_1.ElChamoDelEncantoHermanosSolano)];
                case 44:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.TramodelAngelHongoBlanco], business_1.ElChamoDelEncantoHermanosSolano)];
                case 45:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.TramodelAngelAguacate], business_1.ElChamoDelEncantoHermanosSolano)];
                case 46:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.TramodelAngelPapa], business_1.ElChamoDelEncantoHermanosSolano)];
                case 47:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.TramodelAngelTomateDeArbol], business_1.ElChamoDelEncantoHermanosSolano)];
                case 48:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.TramodelAngelCarambola], business_1.ElChamoDelEncantoHermanosSolano)];
                case 49:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.TramodelAngelNaranjilla], business_1.ElChamoDelEncantoHermanosSolano)];
                case 50:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.TramodelAngelTomateCherry], business_1.ElChamoDelEncantoHermanosSolano)];
                case 51:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.TramodelAngelChileDulce], business_1.ElChamoDelEncantoHermanosSolano)];
                case 52:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.TramodelAngelChilePicante], business_1.ElChamoDelEncantoHermanosSolano)];
                case 53:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.TramodelAngelChilePanameno], business_1.ElChamoDelEncantoHermanosSolano)];
                case 54:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.TramodelAngelHabanoChocolate], business_1.ElChamoDelEncantoHermanosSolano)];
                case 55:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.TramodelAngelCebolla], business_1.ElChamoDelEncantoHermanosSolano)];
                case 56:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.TramodelAngelDulceChinchilla], business_1.ElChamoDelEncantoHermanosSolano)];
                case 57:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.TramodelAngelAjoPelado], business_1.ElChamoDelEncantoHermanosSolano)];
                case 58:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.TramodelAngelVainica], business_1.ElChamoDelEncantoHermanosSolano)];
                case 59:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.ChamoGuzmanRemolacha], business_1.ElChamoDelEncantoHermanosSolano)];
                case 60:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.ChamoGuzmanTomate], business_1.ElChamoDelEncantoHermanosSolano)];
                case 61:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.ChamoGuzmanRepolloMorado], business_1.ElChamoDelEncantoHermanosSolano)];
                case 62:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.ChamoGuzmanChileDulce], business_1.ElChamoDelEncantoHermanosSolano)];
                case 63:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.ChamoGuzmanZuquini], business_1.ElChamoDelEncantoHermanosSolano)];
                case 64:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.ChamoGuzmanChayoteNegro], business_1.ElChamoDelEncantoHermanosSolano)];
                case 65:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.ChamoGuzmanPipas], business_1.ElChamoDelEncantoHermanosSolano)];
                case 66:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.ChamoGuzmanPlatanoVerde], business_1.ElChamoDelEncantoHermanosSolano)];
                case 67:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.ChamoGuzmanPlatanoMaduro], business_1.ElChamoDelEncantoHermanosSolano)];
                case 68:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.ChamoGuzmanLechuga], business_1.ElChamoDelEncantoHermanosSolano)];
                case 69:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.ChamoGuzmanMaracuya], business_1.ElChamoDelEncantoHermanosSolano)];
                case 70:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.ChamoGuzmanAyoteSazon], business_1.ElChamoDelEncantoHermanosSolano)];
                case 71:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.ChamoGuzmanCamote], business_1.ElChamoDelEncantoHermanosSolano)];
                case 72:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.ChamoGuzmanMalanga], business_1.ElChamoDelEncantoHermanosSolano)];
                case 73:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.ChamoGuzmanPapaya], business_1.ElChamoDelEncantoHermanosSolano)];
                case 74:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.ChamoGuzmanLimonMandarina], business_1.ElChamoDelEncantoHermanosSolano)];
                case 75:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.ChamoGuzmanPina], business_1.ElChamoDelEncantoHermanosSolano)];
                case 76:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.ChamoGuzmanElote], business_1.ElChamoDelEncantoHermanosSolano)];
                case 77:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.ChamoGuzmanColiflor], business_1.ElChamoDelEncantoHermanosSolano)];
                case 78:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.ChamoGuzmanCoco], business_1.ElChamoDelEncantoHermanosSolano)];
                case 79:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.ChamoGuzmanZanahoria], business_1.ElChamoDelEncantoHermanosSolano)];
                case 80:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.ChamoGuzmanAyoteTierno], business_1.ElChamoDelEncantoHermanosSolano)];
                case 81:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.ChamoGuzmanChayoteCocoro], business_1.ElChamoDelEncantoHermanosSolano)];
                case 82:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.ChamoGuzmanCebolla], business_1.ElChamoDelEncantoHermanosSolano)];
                case 83:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.ChamoGuzmanRepollo], business_1.ElChamoDelEncantoHermanosSolano)];
                case 84:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.EljardindeHugoSinNombre], business_1.ElChamoDelEncantoHermanosSolano)];
                case 85:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.EljardindeHugoCebollin], business_1.ElChamoDelEncantoHermanosSolano)];
                case 86:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.EljardindeHugoHierbabuena], business_1.ElChamoDelEncantoHermanosSolano)];
                case 87:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.EljardindeHugoRabano], business_1.ElChamoDelEncantoHermanosSolano)];
                case 88:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.EljardindeHugoKelite], business_1.ElChamoDelEncantoHermanosSolano)];
                case 89:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.EljardindeHugoEspinaca], business_1.ElChamoDelEncantoHermanosSolano)];
                case 90:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.EljardindeHugoTamarindo], business_1.ElChamoDelEncantoHermanosSolano)];
                case 91:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.EljardindeHugoSabila], business_1.ElChamoDelEncantoHermanosSolano)];
                case 92:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.EljardindeHugoZanahoria], business_1.ElChamoDelEncantoHermanosSolano)];
                case 93:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.EljardindeHugoCebolla], business_1.ElChamoDelEncantoHermanosSolano)];
                case 94:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.EljardindeHugoVinagreGuineo], business_1.ElChamoDelEncantoHermanosSolano)];
                case 95:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.EljardindeHugoJamaica], business_1.ElChamoDelEncantoHermanosSolano)];
                case 96:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.EljardindeHugoHojasDeLaurel], business_1.ElChamoDelEncantoHermanosSolano)];
                case 97:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.EljardindeHugoCanela], business_1.ElChamoDelEncantoHermanosSolano)];
                case 98:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.EljardindeHugoPaprika], business_1.ElChamoDelEncantoHermanosSolano)];
                case 99:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.EljardindeHugoAjoEnPolvo], business_1.ElChamoDelEncantoHermanosSolano)];
                case 100:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.EljardindeHugoPimientaNegra], business_1.ElChamoDelEncantoHermanosSolano)];
                case 101:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.EljardindeHugoBomba], business_1.ElChamoDelEncantoHermanosSolano)];
                case 102:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.EljardindeHugoAginomoto], business_1.ElChamoDelEncantoHermanosSolano)];
                case 103:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.EljardindeHugoCurcuma], business_1.ElChamoDelEncantoHermanosSolano)];
                case 104:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.EljardindeHugoJengibreEnPolvo], business_1.ElChamoDelEncantoHermanosSolano)];
                case 105:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.EljardindeHugoOreganoSeco], business_1.ElChamoDelEncantoHermanosSolano)];
                case 106:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.EljardindeHugoAchoteEnPasta], business_1.ElChamoDelEncantoHermanosSolano)];
                case 107:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.EljardindeHugoLechuga], business_1.ElChamoDelEncantoHermanosSolano)];
                case 108:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.EljardindeHugoCoyote], business_1.ElChamoDelEncantoHermanosSolano)];
                case 109:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.EljardindeHugoRepollo], business_1.ElChamoDelEncantoHermanosSolano)];
                case 110:
                    _a.sent();
                    return [4 /*yield*/, storeProducts(db, [product_1.EljardindeHugoMorninga], business_1.ElChamoDelEncantoHermanosSolano)];
                case 111:
                    _a.sent();
                    process.exit(0);
                    return [2 /*return*/];
            }
        });
    });
}
;
