import * as React from 'react';

export default function SignUp({error, setUserStatus, setEmail, setUserName, setPW, register}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    register();
    setUserStatus(true);
  }


return (
  <div onSubmit={handleSubmit}className="SignForm">
    <div className="formbox">
      <div className="button-box">
        <div className="formTitle">
          <h2>War Room</h2>
          <img className="swordImage" src="./assets/sword.png"></img>
        </div>
      </div>
      <form id="register"className="input-group">
        <input type="text" className="input-field" placeholder="User Name" onChange={(e)=>setUserName(e.target.value)} required/>
        <input type="email" className="input-field" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} required/>
        <input type="password" className="input-field" placeholder="Enter Password" onChange={(e)=>setPW(e.target.value)} required/>
        <input type="checkbox" className="check-box"/>
        <span>I agree to the terms & conditions</span>
        <button  type="submit" class="submit-btn">Register</button>
        {error !== '' ? <span style={{ display: 'flex', justifyContent: 'center', color: 'red', marginTop: '10px' }}>{error}</span> : ''}
      </form>
    </div>
  </div>
)
};

