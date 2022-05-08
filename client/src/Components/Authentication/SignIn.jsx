import * as React from 'react';

export default function SignIn({setUserStatus, setEmail, setPW, login}) {

  const handleSubmit = (e)=>{
    e.preventDefault();
    login()
  };

  const hadnleSignUp = (e)=>{
    e.preventDefault();
    setUserStatus(false);
  }

  return (
    <div className="SignForm">
      <div className="formbox">
        <div className="button-box">
          <div id="formTitle">
            <h2 className="formTitle">War Room</h2>
          </div>
      </div>
      <form id="login"className="input-group">
        <input type="text" className="input-field" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} required/>
        <input type="password" className="input-field" placeholder="Enter Password" onChange={(e)=>setPW(e.target.value)} required/>
        <input type="checkbox" className="check-box"/>
        <span> Remember Password</span>
        <button onClick={handleSubmit} className="submit-btn">Log in</button>
        <p>Don't have account? <a href="" onClick={hadnleSignUp}>Sign up</a></p>
      </form>
      </div>
    </div>
  )

}