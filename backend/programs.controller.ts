// @ts-nocheck

import { db } from "./firebase";
import { Programs } from "../common/types";

const programsCollectionRef = db.collection("programs");
//getProgram, getLanguages, getInsurance, getWebsite, getServices, getLocation
import { geoFirestore } from './firebase'; 
import { GeoPoint } from "firebase-admin/firestore";
//import * as ngeohash from 'ngeohash'


//get all programs
export const getPrograms = async () => {
  const snapshot = await db.collection("programs").get();
  let programs = {};
  snapshot.forEach((doc) => {
    programs[doc.id] = doc.data() as Programs;
  });
};


//*****TO CHANGE!! */*********** */
//get all programs meeting given requirements
//*** Later we should change it to accomodate an array of services desired */

/** 
export const getProgramsRadius = async (
  userLatitude: number, 
  userLongitude: number, 
  radius: number, 
  insurance: string, 
  language: string, 
  specialtyServices: string[],
  programalServices: string[]) => {

  const geoCollectionRef = geoFirestore.collection('programs');
  
  //**const data = doc.data();
  

  //***Create a GeoQuery based on a location and radius
  const query = geoCollectionRef.near({
    center: new GeoPoint(userLatitude, userLongitude),
    radius: radius // Radius in kilometers
  });
 
  console.log(`Querying programs within radius:`);
  console.log(`  Latitude: ${userLatitude}`);
  console.log(`  Longitude: ${userLongitude}`);
  console.log(`  Radius: ${radius}`);
  console.log(` service: ${service}`);
 


  const snapshot = await query.get();
  console.log(snapshot)

  console.log(`Number of documents in snapshot: ${snapshot.size}`);
  

  let programs = {};

  snapshot.forEach((doc) => {
    console.log("hi")
    const data = doc.data();
    console.log('Program data:', data);
    const containsInsurance = data.insurance.includes(insurance);
    const containsLanguage = data.languages.includes(language);
    const containsServices = data.services.includes(service);
    //const containsServices = services.every(service => data.services.includes(service));


    console.log(`Checking program ${doc.id}:`);
    console.log(`  containsInsurance: ${containsInsurance}`);
    console.log(`  containsLanguage: ${containsLanguage}`);
    console.log(`  containsServices: ${containsServices}`);

    if (containsInsurance && containsLanguage && containsServices) {
      programs[doc.id] = data;
    }
    
  
  });

  return programs;
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

export const getProgramsRadius3 = async (
  userLatitude: number, 
  userLongitude: number, 
  radius: number, 
  language: string,
  services: string[],
) => {
  //const programsCollectionRef = db.collection('programs');

  console.log(`Querying programs within radius:`);
  console.log(`  Latitude: ${userLatitude}`);
  console.log(`  Longitude: ${userLongitude}`);
  console.log(`  Radius: ${radius}`);

  const snapshot = await programsCollectionRef.get();
  console.log(`Number of documents in snapshot: ${snapshot.size}`);

  let programs = {};

  snapshot.forEach((doc) => {
    const data = doc.data();
    console.log('Program data:', data);

    const programLocation = data.location as GeoPoint;
    const programLat = programLocation.latitude;
    const programLng = programLocation.longitude;
    const distance = haversineDistance(userLatitude, userLongitude, programLat, programLng);
    console.log(`Distance to program ${doc.id}: ${distance} km`);

    if (distance <= radius) {
      const containsLanguage = data.languages.includes(language);
      const containsServices = services.some(service => data.services.includes(service));
      
      console.log(`Checking program ${doc.id}:`);
      console.log(`  containsLanguage: ${containsLanguage}`);
      console.log(`  containsServices: ${containsServices}`);

      if (containsLanguage && containsServices) {
        programs[doc.id] = data;
      }
    }
  });

  return programs;
};


export const getProgram = async (id: string) => {
  const doc = await programsCollectionRef.doc(id).get();
  if (doc.exists) {
    return doc.data();
  } else {
    return null;
  }
};


export const getLanguages = async (id: string) => {
  const doc = await programsCollectionRef.doc(id).get();
  if (doc.exists) {
    return doc.data().languages;
  } else {
    return null;
  }
};

export const getInsurance = async (id: string) => {
  const doc = await programsCollectionRef.doc(id).get();
  if (doc.exists) {
    return doc.data().insurance;
  } else {
    return null;
  }
};

export const getWebsite = async (id: string) => {
  const doc = await programsCollectionRef.doc(id).get();
  if (doc.exists) {
    return doc.data().website;
  } else {
    return null;
  }
};

export const getServices = async (id: string) => {
  const doc = await programsCollectionRef.doc(id).get();
  if (doc.exists) {
    return doc.data().services;
  } else {
    return null;
  }
};

export const getLocation = async (id: string) => {
  const doc = await programsCollectionRef.doc(id).get();
  if (doc.exists) {
    return doc.data().location;
  } else {
    return null;
  }
};