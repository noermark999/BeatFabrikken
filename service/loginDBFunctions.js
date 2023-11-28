import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    getDocs,
    getDoc,
    doc,
    deleteDoc,
    addDoc,
    updateDoc,
    where
  } from 'firebase/firestore'
import regisreringDBFunctions from './registreringDBFunctions.js';

const firebaseConfig = {
  apiKey: "AIzaSyBA1THaQC10sV-iVeSrCm7WRgZKAGp9Wl0",
  authDomain: "beatfabrikken.firebaseapp.com",
  projectId: "beatfabrikken",
  storageBucket: "beatfabrikken.appspot.com",
  messagingSenderId: "58921661526",
  appId: "1:58921661526:web:85724090a059e129cff7f7",
  measurementId: "G-RP8EPZ4RKR"
};


// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig);
const db = getFirestore(firebase_app);
const brugere = collection(db, 'Bruger')

const getUser = async (username) => {
  try {
    const userQuerySnapshot = await getDocs(brugere);
    
    // Find det korrekte dokument baseret på brugernavn
    const userDoc = userQuerySnapshot.docs.find(doc => doc.data().username === username);

    if (userDoc) {
      const user = userDoc.data();
      user.docID = userDoc.id;
      return user;
    } else {
      console.log('User not found');
      return null;
    }
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

async function checkLogInUser(username, password) {
  const user = await getUser(username);
  if (user) {
      const salt = regisreringDBFunctions.saltStringToUint8Array(user.salt)
      const hashedInputPassword = await regisreringDBFunctions.hashPassword(password, salt);
      if (hashedInputPassword === user.password) {
          return true;
      }
  }
  console.log("Forkert kode og navn");
  return false;
}

async function checkIsAdmin(username) {
  const user = await getUser(username);
  if (user) {
    if (user.admin) {
      return true
    }
  }
  return false
}

export default {getUser,checkLogInUser, checkIsAdmin}