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

export const getUserLanguage = async (id: string) => {
  const doc = await usersCollectionRef.doc(id).get();
  if (doc.exists) {
    return doc.data().language;
  } else {
    return null;
  }
};



export const updateName = async (id: string, newName: string) => {
  return await usersCollectionRef
    .doc(id)
    .update({ name: newName }); 
    
};

export const updateAge = async (id: string, newAge: number) => {
  return await usersCollectionRef
    .doc(id)
    .update({ age: newAge }); 
    
};

export const updateInsurance = async (id: string, newInsurance: string) => {
  return await usersCollectionRef
    .doc(id)
    .update({ insurance: newInsurance }); 
    
};

export const updateLanguage = async (id: string, newLanguage: string) => {
  return await usersCollectionRef
    .doc(id)
    .update({ language: newLanguage }); 
    
};



export const deleteUser = async (id: string) => {
  return await usersCollectionRef.doc(id).delete();
};

