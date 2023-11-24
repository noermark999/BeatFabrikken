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
const bookingCollection = collection(db, 'Bookinger')

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

async function addBooking(booking) {
  const docRef = await addDoc(bookingCollection, booking)
  console.log(docRef.id);
  return docRef.id
}

async function getBookinger() {
  let bookingQueryDocs = await getDocs(bookingCollection)
  let bookinger = bookingQueryDocs.docs.map(doc => {
    let data = doc.data()
    data.docID = doc.id
    return data
  })
  return bookinger
} 

async function getBooking(dato, tid, lokaleId) {
  try {
    let bookingQueryDocs = await getDocs(bookingCollection)
    const bookingDoc = bookingQueryDocs.docs.find(doc => doc.data().dato === dato && doc.data().tid === tid && doc.data().lokaleId === lokaleId)
    if (bookingDoc) {
      const booking = bookingDoc.data()
      console.log(booking)
      return booking
    } else {
      console.log('Booking not found')
      return null
    }
  } catch(error) {
    console.error('Error getting booking', error)
    return null
  }
}

export default { getLokale, getLokaler, addBooking, getBookinger, getBooking }