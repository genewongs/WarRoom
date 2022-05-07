import React, {useState, useContext} from 'react';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import {createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../firebase-config.js';
import UserContext from '../UserContext.js';
import "regenerator-runtime/runtime.js";
import {useNavigate} from 'react-router-dom';

function index() {
  let navigate = useNavigate();
  const [exisitingUser, setUserStatus] = useState(true);
  const {currentUser, setCurrentUser} = useContext(UserContext);
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPW, setRegisterPW] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPW, setLoginPW] = useState('');
  // console.log('registerEmail', registerEmail, typeof(registerEmail));
  // console.log('registerPW', registerPW);
  // console.log('loginEmail', loginEmail);
  // console.log('loginPW', loginPW);
  console.log('currentUser in authentication', currentUser);


  onAuthStateChanged(auth, (user)=> {
    console.log('curernt user', user.email)
    setCurrentUser(user);
  })

  const register = async ()=>{
    try {
      const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPW);
      setCurrentUser(user)
    } catch (err) {
      console.log(err);
    }
  };

  const login = async ()=>{
    try {
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPW)
      setCurrentUser(user);
      console.log('login Button is working')
      navigate('/');

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