import React, {useState} from 'react';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';

function index() {
  const [exisitingUser, setUserStatus] = useState(true);

  return (
    <div>
      {exisitingUser && <SignIn setUserStatus={setUserStatus}/>}
      {!exisitingUser && <SignUp setUserStatus={setUserStatus}/>}
    </div>
  )
}
export default index;