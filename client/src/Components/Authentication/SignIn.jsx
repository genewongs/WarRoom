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
          <div className="formTitle">
            <h2>War Room</h2>
            <img className="swordImage" src="./assets/sword.png"></img>
          </div>
        </div>
      <form  onSubmit={handleSubmit}  id="login"className="input-group">
        <input type="text" className="input-field" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} required/>
        <input type="password" className="input-field" placeholder="Enter Password" onChange={(e)=>setPW(e.target.value)} required/>
        <input type="checkbox" className="check-box"/>
        <span> Remember Password</span>
        <button className="submit-btn">Log in</button>
        <div className="signUp">
          Don't have account? <br></br>
          <a href="" onClick={hadnleSignUp}>Sign up</a>
        </div>
      </form>
      </div>
    </div>
  )

}