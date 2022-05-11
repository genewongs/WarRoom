const { initializeApp } = require('firebase/app');
const {getAuth} = require('firebase/auth');
const { getFirestore, collection, getDocs, updateDoc, addDoc, arrayUnion, FieldValue, firestore, setDoc, deleteDoc, doc } = require('firebase/firestore');
const { firebase } = require('firebase/app');

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

const auth = getAuth(app);
//init db service
const db = getFirestore();


const getUsers = (userName) => {
  const colRef = collection(db, userName);
  return (
    getDocs(colRef)
      // .then((snapshot) => {
      //   let books = [];
      //   snapshot.docs.forEach((doc) => {
      //     books.push({ ...doc.data(), id: doc.id });
      //   });
      //   return (books);
      // })
      // .catch(() => console.log('no such document'))
  );
};

const addUserMonster = (userName, obj) => {
  const colRef = collection(db, userName);
  return addDoc(colRef, obj);
};

const updateUserMonster = (userName, monsterId, updatedArea) => {
  const docRef = doc(db, userName, monsterId);
  return updateDoc(docRef, updatedArea);
};

const deleteUsers = (userName, monsterId)=>{
  const docRef = doc(db, userName, monsterId);
  return deleteDoc(docRef);
};

module.exports = {
  app,
  auth,
  db,
  getUsers,
  addUserMonster,
  updateUserMonster,
  deleteUsers,
};
