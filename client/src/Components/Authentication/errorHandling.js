const errorHandling = (err, setError) => {
  if (err === 'auth/user-disabled') {
    setError('Account is disabled');
  } else if (err === 'auth/user-not-found') {
    setError('User is not found');
  } else if (err === 'auth/email-already-in-use') {
    setError('Email is already in use');
  } else if (err === 'auth/invalid-email') {
    setError('Email is invalid');
  } else if (err === 'auth/wrong-password') {
    setError('Wrong password');
  } else if (err === 'auth/too-many-requests') {
    setError(`You've tried too many times`);
  } else {
    setError('');
  }
};

export default errorHandling;
