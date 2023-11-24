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

async function getBookingForEnDag(dato, lokale) {
  let bookingQueryDocs = await getDocs(bookingCollection);

  let bookinger = bookingQueryDocs.docs.map(doc => {
    let data = doc.data();
    data.docID = doc.id;
    if (data.dato === dato && data.lokaleId === lokale) {
      console.log("test")
      return data;
    }
  });
  return bookinger;
}
console.log(await getBookingForEnDag("2023-11-24", "Sal 1"))

async function getBookingerForUgen(mandagsDato, lokale) {
  let mandag = new Date();
  let result = [];
  mandag.setFullYear(mandagsDato.substring(0,4), mandagsDato.substring(5,7), mandagsDato.substring(8,10))
  for (let i = 0; i < 7; i++) {
    mandag.setDate(new Date().getDate() + i)
    result.push(await getBookingForEnDag(mandag.toISOString().slice(0, 10), lokale))
  }
  return result;
} 
//console.log(await getBookingerForUgen("2023-11-20", "Sal 1"))


async function getBooking(dato, tid, lokaleId) {
  try {
    let bookingQueryDocs = await getDocs(bookingCollection)
    const bookingDoc = bookingQueryDocs.docs.find(doc => doc.data().dato === dato && doc.data().tid === tid && doc.data().lokaleId === lokaleId)
    if (bookingDoc) {
      const booking = bookingDoc.data()
      return booking
    } else {
      console.log('Booking not found')
      return undefined
    }
  } catch(error) {
    console.error('Error getting booking', error)
    return undefined
  }
}

export default { getLokale, getLokaler, addBooking, getBookinger, getBookingerForUgen, getBooking }