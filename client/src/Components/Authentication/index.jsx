import React, { useState, useContext } from 'react';
import {
  createUserWithEmailAndPassword, updateProfile, onAuthStateChanged,
  signOut, signInWithEmailAndPassword, useAuth,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { auth } from '../../firebase-config';
import UserContext from '../UserContext';
import 'regenerator-runtime/runtime';
import errorHandling from './errorHandling';

function index() {
  const navigate = useNavigate();
  const [exisitingUser, setUserStatus] = useState(true);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [userName, setUserName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPW, setRegisterPW] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPW, setLoginPW] = useState('');
  const [error, setError] = useState('');

  onAuthStateChanged(auth, (User) => {
    setCurrentUser(User);
  });

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPW);
      updateProfile(auth.currentUser, {
        displayName: userName,
      })
        .then(() => setCurrentUser(user))
        .catch((err) => console.log('profile can\'t be udpated', err));
    } catch (err) {
      errorHandling(err.code, setError);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPW);
      setCurrentUser(user);
      navigate('/');
    } catch (err) {
      errorHandling(err.code, setError);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div>
      {exisitingUser && <SignIn error={error} login={login} setEmail={setLoginEmail} setPW={setLoginPW} setUserStatus={setUserStatus} />}
      {!exisitingUser && <SignUp error={error} setUserName={setUserName} register={register} setEmail={setRegisterEmail} setPW={setRegisterPW} setUserStatus={setUserStatus} />}

    </div>
  );
}
export default index;
