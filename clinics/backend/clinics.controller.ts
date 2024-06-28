// @ts-nocheck

import { db } from "./firebase";
import { Clinics } from "../common/types";

const clinicsCollectionRef = db.collection("clinics");
//getClinic, getLanguages, getInsurance, getWebsite, getServices, getLocation
import { geoFirestore } from './firebase'; 
import { GeoPoint } from "firebase-admin/firestore";


//get all clinics
export const getClinics = async () => {
  const snapshot = await db.collection("clinics").get();
  let clinics = {};
  snapshot.forEach((doc) => {
    clinics[doc.id] = doc.data() as Clinics;
  });
};

//get all clinics meeting given requirements
//*** Later we should change it to accomodate an array of services desired */
export const getClinicsRadius = async (
  userLatitude: number, 
  userLongitude: number, 
  radius: number, 
  insurance: string, 
  language: string, 
  service: string) => {

  const geoCollectionRef = geoFirestore.collection('clinics');
  
  //const data = doc.data();
  

  //Create a GeoQuery based on a location and radius
  const query = geoCollectionRef.near({
    center: new GeoPoint(userLatitude, userLongitude),
    radius: radius // Radius in kilometers
  });
 
  console.log(`Querying clinics within radius:`);
  console.log(`  Latitude: ${userLatitude}`);
  console.log(`  Longitude: ${userLongitude}`);
  console.log(`  Radius: ${radius}`);
  console.log(` service: ${service}`);
 


  const snapshot = await query.get();
  console.log(snapshot)

  console.log(`Number of documents in snapshot: ${snapshot.size}`);

  let clinics = {};

  snapshot.forEach((doc) => {
    console.log("hi")
    const data = doc.data();
    console.log('Clinic data:', data);
    const containsInsurance = data.insurance.includes(insurance);
    const containsLanguage = data.languages.includes(language);
    const containsServices = data.services.includes(service);


    console.log(`Checking clinic ${doc.id}:`);
    console.log(`  containsInsurance: ${containsInsurance}`);
    console.log(`  containsLanguage: ${containsLanguage}`);
    console.log(`  containsServices: ${containsServices}`);

    if (containsInsurance && containsLanguage && containsServices) {
      clinics[doc.id] = data;
    }
  });

  return clinics;
};


export const getClinic = async (id: string) => {
  const doc = await clinicsCollectionRef.doc(id).get();
  if (doc.exists) {
    return doc.data();
  } else {
    return null;
  }
};


export const getLanguages = async (id: string) => {
  const doc = await clinicsCollectionRef.doc(id).get();
  if (doc.exists) {
    return doc.data().languages;
  } else {
    return null;
  }
};

export const getInsurance = async (id: string) => {
  const doc = await clinicsCollectionRef.doc(id).get();
  if (doc.exists) {
    return doc.data().insurance;
  } else {
    return null;
  }
};

export const getWebsite = async (id: string) => {
  const doc = await clinicsCollectionRef.doc(id).get();
  if (doc.exists) {
    return doc.data().website;
  } else {
    return null;
  }
};

export const getServices = async (id: string) => {
  const doc = await clinicsCollectionRef.doc(id).get();
  if (doc.exists) {
    return doc.data().services;
  } else {
    return null;
  }
};

export const getLocation = async (id: string) => {
  const doc = await clinicsCollectionRef.doc(id).get();
  if (doc.exists) {
    return doc.data().location;
  } else {
    return null;
  }
};