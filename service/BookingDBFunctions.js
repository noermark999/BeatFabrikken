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
const lokalerCollection = collection(db, 'Lokaler')

async function getLokale(lokaleID) {
const docRef = doc(db, 'Lokaler', lokaleID)
  const lokaleQueryDoc = await getDoc(docRef)
  let lokale = lokaleQueryDoc.data()
  lokale.docID = lokaleQueryDoc.id
  return lokale
}

async function getLokaler() {
    let lokalerQueryDocs = await getDocs(lokalerCollection)
    let lokaler = lokalerQueryDocs.docs.map(doc => {
      let data = doc.data()
      data.docID = doc.id
      return data
    })
    return lokaler
}

async function getBookinger() {
  
} 

export default {getLokale, getLokaler}