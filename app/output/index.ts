
import { initializeApp } from 'firebase/app';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { getFirestore, addDoc, setDoc, doc, collection, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { Tag, Business, Product } from 'dbtypes'
import { Especias, Frutas, Hierbas, Infusiones, Tuberculos, Vegetales, Hongos } from './tag';
import { ElChamoDelEncantoHermanosSolano, TramoNato, TramoDelAngel, ChamoGuzman, ElJardinDeHugo } from './business';
import { ElchamodelencantoHermanosSolanoTomate, ElchamodelencantoHermanosSolanoCebollas, ElchamodelencantoHermanosSolanoFresa, ElchamodelencantoHermanosSolanoTomateCherry, ElchamodelencantoHermanosSolanoPapa, ElchamodelencantoHermanosSolanoLimonMesino, ElchamodelencantoHermanosSolanoArracacheEnPelota, ElchamodelencantoHermanosSolanoArracachePicado, ElchamodelencantoHermanosSolanoBrocoli, ElchamodelencantoHermanosSolanoColiflor, TramoNatoPapa, TramoNatoChileDulce, TramoNatoBrocoli, TramoNatoColiflor, TramoNatoChayote, TramoNatoTomate, TramoNatoPepino, TramoNatoZanahoria, TramoNatoAyoteTierno, TramoNatoPina, TramoNatoCebollas, TramoNatoYuca, TramoNatoElote, TramoNatoRepollo, TramoNatoAjo, TramoNatoTamarindo, TramoNatoCamote, TramoNatoTiquisque, TramoNatoAyote, TramodelAngelTomate, TramodelAngelCas, TramodelAngelMora, TramodelAngelHongoBlanco, TramodelAngelAguacate, TramodelAngelPapa, TramodelAngelTomateDeArbol, TramodelAngelCarambola, TramodelAngelNaranjilla, TramodelAngelTomateCherry, TramodelAngelChileDulce, TramodelAngelChilePicante, TramodelAngelChilePanameno, TramodelAngelHabanoChocolate, TramodelAngelCebolla, TramodelAngelAjoPelado, TramodelAngelVainica, ChamoGuzmanRemolacha, ChamoGuzmanTomate, ChamoGuzmanRepolloMorado, ChamoGuzmanChileDulce, ChamoGuzmanZuquini, ChamoGuzmanChayoteNegro, ChamoGuzmanPipas, ChamoGuzmanPlatanoVerde, ChamoGuzmanPlatanoMaduro, ChamoGuzmanLechuga, ChamoGuzmanMaracuya, ChamoGuzmanAyoteSazon, ChamoGuzmanCamote, ChamoGuzmanMalanga, ChamoGuzmanPapaya, ChamoGuzmanLimonMandarina, ChamoGuzmanPina, ChamoGuzmanElote, ChamoGuzmanColiflor, ChamoGuzmanCoco, ChamoGuzmanZanahoria, ChamoGuzmanAyoteTierno, ChamoGuzmanChayoteCocoro, ChamoGuzmanCebolla, ChamoGuzmanRepollo, EljardindeHugoCebollin, EljardindeHugoHierbabuena, EljardindeHugoRabano, EljardindeHugoKelite, EljardindeHugoEspinaca, EljardindeHugoTamarindo, EljardindeHugoSabila, EljardindeHugoZanahoria, EljardindeHugoCebolla, EljardindeHugoVinagreGuineo, EljardindeHugoJamaica, EljardindeHugoHojasDeLaurel, EljardindeHugoCanela, EljardindeHugoPaprika, EljardindeHugoAjoEnPolvo, EljardindeHugoPimientaNegra, EljardindeHugoBomba, EljardindeHugoAginomoto, EljardindeHugoCurcuma, EljardindeHugoJengibreEnPolvo, EljardindeHugoOreganoSeco, EljardindeHugoAchoteEnPasta, EljardindeHugoLechuga, EljardindeHugoCoyote, EljardindeHugoRepollo } from './product';

const storeBusiness = async (db: Firestore, auth: Auth, biz: Business): Promise<Business> => {
  const newBusiness = biz;
  const businessCollection = collection(db, "businesses");
  await setDoc(doc(businessCollection, newBusiness.firebaseUserId), newBusiness);
  return newBusiness;
};


const storeProducts = async (db: Firestore, products: Product[], business: Business): Promise<void> => {
  for (let i = 0; i < products.length; i++) {
    const currentProd = products[i];
    await addDoc(collection(db, "products"), currentProd);
  }
};


export default async function run() {
  const firebaseConfig = require(path.join(__dirname, 'firebaseConfig'));
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);

  await addDoc(collection(db, "tag"), Especias);
  await addDoc(collection(db, "tag"), Frutas);
  await addDoc(collection(db, "tag"), Hierbas);
  await addDoc(collection(db, "tag"), Infusiones);
  await addDoc(collection(db, "tag"), Tuberculos);
  await addDoc(collection(db, "tag"), Vegetales);
  await addDoc(collection(db, "tag"), Hongos);
  const FB0 = await storeBusiness(db, auth, ElChamoDelEncantoHermanosSolano);
  const FB1 = await storeBusiness(db, auth, TramoNato);
  const FB2 = await storeBusiness(db, auth, TramoDelAngel);
  const FB3 = await storeBusiness(db, auth, ChamoGuzman);
  const FB4 = await storeBusiness(db, auth, ElJardinDeHugo);
  await storeProducts(db, [ElchamodelencantoHermanosSolanoTomate], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [ElchamodelencantoHermanosSolanoCebollas], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [ElchamodelencantoHermanosSolanoFresa], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [ElchamodelencantoHermanosSolanoTomateCherry], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [ElchamodelencantoHermanosSolanoPapa], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [ElchamodelencantoHermanosSolanoLimonMesino], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [ElchamodelencantoHermanosSolanoArracacheEnPelota], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [ElchamodelencantoHermanosSolanoArracachePicado], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [ElchamodelencantoHermanosSolanoBrocoli], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [ElchamodelencantoHermanosSolanoColiflor], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [TramoNatoPapa], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [TramoNatoChileDulce], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [TramoNatoBrocoli], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [TramoNatoColiflor], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [TramoNatoChayote], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [TramoNatoTomate], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [TramoNatoPepino], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [TramoNatoZanahoria], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [TramoNatoAyoteTierno], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [TramoNatoPina], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [TramoNatoCebollas], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [TramoNatoYuca], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [TramoNatoElote], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [TramoNatoRepollo], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [TramoNatoAjo], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [TramoNatoTamarindo], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [TramoNatoCamote], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [TramoNatoTiquisque], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [TramoNatoAyote], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [TramodelAngelTomate], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [TramodelAngelCas], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [TramodelAngelMora], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [TramodelAngelHongoBlanco], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [TramodelAngelAguacate], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [TramodelAngelPapa], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [TramodelAngelTomateDeArbol], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [TramodelAngelCarambola], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [TramodelAngelNaranjilla], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [TramodelAngelTomateCherry], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [TramodelAngelChileDulce], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [TramodelAngelChilePicante], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [TramodelAngelChilePanameno], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [TramodelAngelHabanoChocolate], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [TramodelAngelCebolla], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [TramodelAngelAjoPelado], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [TramodelAngelVainica], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [ChamoGuzmanRemolacha], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [ChamoGuzmanTomate], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [ChamoGuzmanRepolloMorado], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [ChamoGuzmanChileDulce], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [ChamoGuzmanZuquini], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [ChamoGuzmanChayoteNegro], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [ChamoGuzmanPipas], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [ChamoGuzmanPlatanoVerde], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [ChamoGuzmanPlatanoMaduro], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [ChamoGuzmanLechuga], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [ChamoGuzmanMaracuya], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [ChamoGuzmanAyoteSazon], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [ChamoGuzmanCamote], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [ChamoGuzmanMalanga], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [ChamoGuzmanPapaya], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [ChamoGuzmanLimonMandarina], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [ChamoGuzmanPina], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [ChamoGuzmanElote], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [ChamoGuzmanColiflor], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [ChamoGuzmanCoco], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [ChamoGuzmanZanahoria], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [ChamoGuzmanAyoteTierno], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [ChamoGuzmanChayoteCocoro], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [ChamoGuzmanCebolla], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [ChamoGuzmanRepollo], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [EljardindeHugoCebollin], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [EljardindeHugoHierbabuena], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [EljardindeHugoRabano], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [EljardindeHugoKelite], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [EljardindeHugoEspinaca], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [EljardindeHugoTamarindo], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [EljardindeHugoSabila], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [EljardindeHugoZanahoria], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [EljardindeHugoCebolla], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [EljardindeHugoVinagreGuineo], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [EljardindeHugoJamaica], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [EljardindeHugoHojasDeLaurel], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [EljardindeHugoCanela], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [EljardindeHugoPaprika], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [EljardindeHugoAjoEnPolvo], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [EljardindeHugoPimientaNegra], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [EljardindeHugoBomba], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [EljardindeHugoAginomoto], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [EljardindeHugoCurcuma], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [EljardindeHugoJengibreEnPolvo], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [EljardindeHugoOreganoSeco], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [EljardindeHugoAchoteEnPasta], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [EljardindeHugoLechuga], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [EljardindeHugoCoyote], ElChamoDelEncantoHermanosSolano);
  await storeProducts(db, [EljardindeHugoRepollo], ElChamoDelEncantoHermanosSolano);
  
};module.exports = run;

module.exports.default = run;

module.exports.run = run;
