import {getFirestore,collection, getDocs, addDoc, deleteDoc} from 'firebase/firestore';
// import { db } from '../client/src/firebase-config';

//init db service

// collection ref
const userCol = collection(getFirestore(), 'user');

// get collection data
export const getUsers = () => {
  return getDocs(userCol)
  .then((snapshot)=>{
    let users=[];
    snapshot.docs.forEach((doc)=>{
      users.push({...doc.data(), id: doc.id})
    })
    console.log('user is an object containing useremail and monsters property and userId', users);
  })
  .catch(err=>console.log(err));
}

export const addUsers = (obj)=>{
  return addDoc(userCol, obj);
}

export const deleteUsers = (obj)=>{
  return delete(userCol, obj);
}

