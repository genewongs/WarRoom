import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore, collection, getDoc, updateDoc, addDoc, arrayUnion, FieldValue, firestore, setDoc, deleteDoc, doc} from 'firebase/firestore';
import {firebase} from 'firebase/app';
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

// collection ref
const userCol = collection(db, 'user');

export const getUsers = (userId) => {
  const docRef = doc(userCol, String(userId));
  console.log(String(userId));
  getDoc(docRef)
  .then((docSnap)=>console.log('doc snap', docSnap.data()))
  .catch(()=>console.log('no such document'));
}

export const addUserMonster = async (userId, obj)=>{
  const docRef = doc(userCol, String(userId));
  console.log(String(userId))
  const docs = await updateDoc(docRef, {'monsters': FieldValue.arrayUnion(obj)});
  console.log('docs', docs)}

export const updateUserMonster = (userId, obj)=> {
  return updateDoc(doc(db, 'users', userId),obj);
}
export const deleteUsers = (userId)=>{
  return updateDoc(doc(db, 'users', userid), {toDelete: FieldValue.delete()});
}
