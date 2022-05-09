import {getFirestore,collection, getDocs, addDoc, deleteDoc} from 'firebase/firestore';

//init db service
export const db = getFirestore();

// collection ref
const userCol = collection(db, 'user');

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

