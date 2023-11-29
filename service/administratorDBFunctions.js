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

  apiKey: "AIzaSyDou4WSQ61qMHdL6G9qu-mwWzVv2Ihp5QE",

  authDomain: "beatfabrikkenreincarnated.firebaseapp.com",

  projectId: "beatfabrikkenreincarnated",

  storageBucket: "beatfabrikkenreincarnated.appspot.com",

  messagingSenderId: "709925552016",

  appId: "1:709925552016:web:a44066f7ef79182794fd15"

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