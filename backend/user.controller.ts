// @ts-nocheck

import { db } from "./firebase";
import { Users } from "../common/types";

const usersCollectionRef = db.collection("users");

export const addUser = async (id: string, user: Users) => {
  const newDoc = usersCollectionRef.doc(id, user);
  return await newDoc.set(user);
};

export const getUsers = async () => {
  const snapshot = await db.collection("Users").get();
  let Users = {};
  snapshot.forEach((doc) => {
    Users[doc.id] = doc.data() as Users;
  });
};

export const getUser = async (id: string) => {
  const doc = await usersCollectionRef.doc(id).get();
  if (doc.exists) {
    return doc.data();
  } else {
    return null;
  }
};

export const getUserInsurance = async (id: string) => {
  const doc = await usersCollectionRef.doc(id).get();
  if (doc.exists) {
    return doc.data().insurance;
  } else {
    return null;
  }
};

export const getUserServices = async (id: string) => {
  const doc = await usersCollectionRef.doc(id).get();
  if (doc.exists) {
    return doc.data().services;
  } else {
    return null;
  }
};
/*
export const getUserLanguage = async (id: string) => {
  const doc = await usersCollectionRef.doc(id).get();
  if (doc.exists) {
    return doc.data().language;
  } else {
    return null;
  }
};*/



export const updateUsername = async (id: string, newUsername: string) => {
  return await usersCollectionRef
    .doc(id)
    .update({ username: newUsername }); 
    
};

/*
export const updateAge = async (id: string, newAge: number) => {
  return await usersCollectionRef
    .doc(id)
    .update({ age: newAge }); 
    
};*/

export const updateInsurance = async (id: string, newInsurance: string) => {
  return await usersCollectionRef
    .doc(id)
    .update({ insurance: newInsurance }); 
    
};

export const updateSex = async (id: string, newSex: string) => {
  return await usersCollectionRef
    .doc(id)
    .update({ sex: newSex }); 
    
};



export const updatePolicyName = async (id: string, newPolicyName: string) => {
  return await usersCollectionRef
    .doc(id)
    .update({ policyName: newPolicyName }); 
    
};

/*
export const updateLanguage = async (id: string, newLanguage: string) => {
  return await usersCollectionRef
    .doc(id)
    .update({ language: newLanguage }); 
    
};
*/

export const updateServices=async (id: string, addServices: Array, removeServices: Array)=>{
  const user = usersCollectionRef.doc(id);
  const updates: any = {};
  
  // Add services to the array
  if (addServices && addServices.length > 0) {
    updates.services = admin.firestore.FieldValue.arrayUnion(...addServices);
  }

  // Remove services from the array
  if (removeServices && removeServices.length > 0) {
    updates.services = admin.firestore.FieldValue.arrayRemove(...removeServices);
  }

  // Only proceed with updates if there's something to update
  if (Object.keys(updates).length > 0) {
    await user.update(updates);
    res.status(200).send({
      message: `SUCCESS updated user with id: ${id}, added services: ${addServices || 'none'}, removed services: ${removeServices || 'none'}`,
    });
  } else {
    res.status(400).send({
      error: "No services to add or remove.",
    });
  }
}

export const deleteUser = async (id: string) => {
  return await usersCollectionRef.doc(id).delete();
};

