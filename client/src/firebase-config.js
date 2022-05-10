import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore, collection, getDocs, updateDoc, addDoc, arrayUnion, FieldValue, firestore, setDoc, deleteDoc, doc} from 'firebase/firestore';
import { firebase } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDTZTqTiz-wjzwRq8ClTCcIW9boQkkBBcE",
  authDomain: "war-room-7a8e6.firebaseapp.com",
  projectId: "war-room-7a8e6",
  storageBucket: "war-room-7a8e6.appspot.com",
  messagingSenderId: "520301271135",
  appId: "1:520301271135:web:be1cb3dbe7117f057ba3ea",
  measurementId: "G-HK2ZS8KKLH"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
//init db service
export const db = getFirestore();


export const getUsers = (userName) => {
  const colRef = collection(db, userName);
  console.log('getuser beingh called', userName);
  getDocs(colRef)
  .then((snapshot)=>{
    let books = [];
    snapshot.docs.forEach((doc)=>{
      console.log('doc', doc);
      books.push({...doc.data(), id:doc.id})
    })
    console.log('books', books)
  })
  .catch(()=>console.log('no such document'));
};

export const addUserMonster = (userName, obj) => {
  const colRef = collection(db, userName);
  return addDoc(colRef, obj);
};

export const updateUserMonster = (userName, monsterId, updatedArea)=> {
  const docRef = doc(db, userName, monsterId);
  updateDoc(docRef, updatedArea);
};

export const deleteUsers = (userName, monsterId)=>{
  const docRef = doc(db, userName, monsterId);
  return deleteDoc(docRef);
};
