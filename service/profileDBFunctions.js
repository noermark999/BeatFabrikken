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

import router from '../routes/profilRoutes.js';
import registreringDBFunctions from "../service/registreringDBFunctions.js";

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


const editUser = async (user) => {
    
  }

const updateUser = async (user, oldUsername) => {
  try {
    const userQuerySnapshot = await getDocs(brugere);
    const userDoc = userQuerySnapshot.docs.find(doc => doc.data().username === oldUsername);

    if (userDoc) {
        await updateDoc(doc(db, 'Bruger', userDoc.id), {
        username: user.username,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        mobilnummer: user.mobilnummer,

      });
      console.log('User updated successfully');
    } else {
      console.log('User not found');
    }
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

const updatePassword = async (username, newPassword) => {
 const salt = registreringDBFunctions.getSalt();
 const saltArray = saltStringToUint8Array(salt);
 const hashedNewPassword = await hashPassword(newPassword, saltArray);

 const userQuerySnapshot = await getDocs(brugere);
 const userDoc = userQuerySnapshot.docs.find(doc => doc.data().username === username);

 if (userDoc) {
  await updateDoc(doc(db, 'Bruger', userDoc.id), {
    password: hashedNewPassword,
    salt: salt
  });
  console.log('Password updated successfully');
} else {
  console.log('User not found');
}
}




export default {updateUser};


