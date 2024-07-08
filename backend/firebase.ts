// @ts-nocheck
import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import { getFirestore, Timestamp, FieldValue } from "firebase-admin/firestore";
import serviceAccount from "./service_account.json";
//import { GeoFirestore } from "geofirestore"; // Import GeoFirestore
/// dependencies: "geofirestore": "^5.2.0",
      // "ngeohash": "^0.6.3",
      // "@google-cloud/firestore": "5.0.2",

const app = initializeApp({
  credential: cert(serviceAccount),
});
const db = getFirestore();

//const geoFirestore = new GeoFirestore(db);

export { db, app};

//export geoFirestore
