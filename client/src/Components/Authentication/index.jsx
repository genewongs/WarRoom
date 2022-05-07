import React, {useState} from 'react';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import {createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../firebase-config.js';
import "regenerator-runtime/runtime.js";

function index() {
  const [exisitingUser, setUserStatus] = useState(true);
  const[currentUser, setCurrentUser] = useState({})
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPW, setRegisterPW] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPW, setLoginPW] = useState('');
  console.log('registerEmail', registerEmail, typeof(registerEmail));
  console.log('registerPW', registerPW);
  console.log('loginEmail', loginEmail);
  console.log('loginPW', loginPW);


  onAuthStateChanged(auth, (user)=> {
    console.log('curernt user', user.email)
    setCurrentUser(user);
  })

  const register = async ()=>{
    try {
      const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPW);
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  };

  const login = async ()=>{
    try {
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPW)
      console.log(user.email)
    } catch(err) {
      console.log(err.message);
    }
  };

  const logout = async ()=> {
    await signOut(auth);
  };

  return (
    <div>
      {exisitingUser && <SignIn login={login} setEmail= {setLoginEmail} setPW={setLoginPW} setUserStatus={setUserStatus}/>}
      {!exisitingUser && <SignUp register={register} setEmail= {setRegisterEmail} setPW={setRegisterPW} setUserStatus={setUserStatus}/>}
    </div>
  )
}
export default index;