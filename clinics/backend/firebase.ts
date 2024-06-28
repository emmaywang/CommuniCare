// @ts-nocheck
import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import { getFirestore, Timestamp, FieldValue } from "firebase-admin/firestore";
import serviceAccount from "./service_account.json";
import { GeoFirestore } from "geofirestore"; // Import GeoFirestore

const app = initializeApp({
  credential: cert(serviceAccount),
});
const db = getFirestore();

const geoFirestore = new GeoFirestore(db);

export { db, app, geoFirestore};
