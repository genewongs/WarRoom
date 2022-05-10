import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore,collection, getDocs, addDoc, deleteDoc} from 'firebase/firestore';

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

// get collection data
export const getUsers = (userId) => {
  return db.collection('user').doc(userId)
  .then((snapshot)=>{
    let users=[];
    snapshot.docs.forEach((doc)=>{
      users.push({...doc.data(), id: doc.id})
    })
    console.log('user is an object containing useremail and monsters property and userId', users);
  })
  .catch(err=>console.log(err));
}

export const addUsers = (userId, obj)=>{
  return db.collection(users).doc(userId).set(data);
}

export const updateUsers = (userId, obj)=> {
  return db.collection(userid).doc(obj);
}
export const deleteUsers = (userId)=>{
  return db.collection('users').doc(userId).update({toDelete: fieldValue.delete()});
}
