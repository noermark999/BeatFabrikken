import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    getDocs,
    getDoc,
    doc,
    deleteDoc,
    addDoc,
    updateDoc
  } from 'firebase/firestore'

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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const brugere = collection(db, 'Bruger')

const addUser = async (user) => {
  user.password = await hashPassword(user.password);
  console.log(user);
  const docRef = await addDoc(brugere, user)
  return docRef.id
}

// Funktion til at hashe adgangskoden med SHA-256
async function hashPassword(password) {
  // Konverterer adgangskoden til en Uint8Array
  const encoder = new TextEncoder();
  const data = encoder.encode(password);

  // Hasher adgangskoden med SHA-256
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);

  // Konverterer det hashede resultat til en hex-streng
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashedPassword = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

  return hashedPassword;
}

export default {addUser}