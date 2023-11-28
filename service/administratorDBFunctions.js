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
const holdCollection = collection(db, 'Hold')

async function addHold(hold) {
  const docRef = await addDoc(holdCollection, hold)
  return docRef.id
}

async function getHold(holdNavn) {
    const docRef = doc(db, 'Hold', holdNavn)
    const holdQueryDoc = await getDoc(docRef)
    let hold = holdQueryDoc.data()
    return hold
  }

  async function getAlleHold() {
    let alleHoldQueryDocs = await getDocs(holdCollection)
    let alleHold = alleHoldQueryDocs.docs.map(doc => {
      let data = doc.data()
      data.docID = doc.id
      return data
    })
    return alleHold
  }


  export default {getHold, getAlleHold, addHold }