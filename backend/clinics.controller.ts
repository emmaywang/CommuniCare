// @ts-nocheck

import { db } from "./firebase";
import { Clinics } from "../common/types";

const clinicsCollectionRef = db.collection("clinics");
//getClinic, getLanguages, getInsurance, getWebsite, getServices, getLocation
import { geoFirestore } from './firebase'; 
import { GeoPoint } from "firebase-admin/firestore";
//import * as ngeohash from 'ngeohash'


//get all clinics
export const getClinics = async () => {
  const snapshot = await db.collection("clinics").get();
  let clinics = {};
  snapshot.forEach((doc) => {
    clinics[doc.id] = doc.data() as Clinics;
  });
};


//*****TO CHANGE!! */*********** */
//get all clinics meeting given requirements
//*** Later we should change it to accomodate an array of services desired */

/** 
export const getClinicsRadius = async (
  userLatitude: number, 
  userLongitude: number, 
  radius: number, 
  insurance: string, 
  language: string, 
  specialtyServices: string[],
  clinicalServices: string[]) => {

  const geoCollectionRef = geoFirestore.collection('clinics');
  
  //**const data = doc.data();
  

  //***Create a GeoQuery based on a location and radius
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
    //const containsServices = services.every(service => data.services.includes(service));


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
**/


function haversineDistance(lat1, lon1, lat2, lon2) {
  const toRad = (x) => (x * Math.PI) / 180;

  const R = 6371; // Radius of the Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export const getClinicsRadius3 = async (
  userLatitude: number, 
  userLongitude: number, 
  radius: number, 
  language: string,
  services: string[],
) => {
  const clinicsCollectionRef = db.collection('clinics');

  console.log(`Querying clinics within radius:`);
  console.log(`  Latitude: ${userLatitude}`);
  console.log(`  Longitude: ${userLongitude}`);
  console.log(`  Radius: ${radius}`);

  const snapshot = await clinicsCollectionRef.get();
  console.log(`Number of documents in snapshot: ${snapshot.size}`);

  let clinics = {};

  snapshot.forEach((doc) => {
    const data = doc.data();
    console.log('Clinic data:', data);

    const clinicLocation = data.location as GeoPoint;
    const clinicLat = clinicLocation.latitude;
    const clinicLng = clinicLocation.longitude;
    const distance = haversineDistance(userLatitude, userLongitude, clinicLat, clinicLng);
    console.log(`Distance to clinic ${doc.id}: ${distance} km`);

    if (distance <= radius) {
      const containsLanguage = data.languages.includes(language);
      const containsServices = services.every(service => data.services.includes(service));
      
      console.log(`Checking clinic ${doc.id}:`);
      console.log(`  containsLanguage: ${containsLanguage}`);
      console.log(`  containsServices: ${containsServices}`);

      if (containsLanguage && containsSpecialtyServices && containsClinicalServices) {
        clinics[doc.id] = data;
      }
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