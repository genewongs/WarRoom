import * as React from 'react';
import RoomContext from '../RoomContext';

export default function SignIn({
  error, setUserStatus, setEmail, setPW, login,
}) {
  const [chatRooms, setChatRooms] = React.useState([
    { label: 'Lobby', value: '27' },
    { label: 'Battlefield 1', value: '11' },
    { label: 'Battlefield 2', value: '56' },
    { label: 'Battlefield 3', value: '78' },
    { label: 'Battlefield 4', value: '90' },
    { label: 'Alex\'s Kitchen', value: '80' },
    { label: 'Broco Lounge', value: '64' },
    { label: 'Glassjaw Room', value: '97' },
    { label: 'Loathing Corner', value: '15' },
    { label: 'Zelroth\'s Lair', value: '69' },
  ]);
  const { room, setRoom, selectRoom } = React.useContext(RoomContext);

  const renderRooms = chatRooms.map((option) => (
    <option key={option.value} label={option.label} value={Number(option.value)}>
      {option.label}
    </option>
  ));

  const handleSubmit = async (e) => {
    console.log('room to join', room);
    e.preventDefault();
    await login();
    selectRoom(room);
  };

  const hadnleSignUp = (e) => {
    e.preventDefault();
    setUserStatus(false);
  };

  return (
    <div className="SignForm">
      <div className="formbox">
        <div className="button-box">
          <div className="formTitle">
            <h2>War Room</h2>
            <img className="swordImage" src="./assets/sword.png" />
          </div>
        </div>
        <form onSubmit={handleSubmit} id="login" className="input-group">
          <input type="text" className="input-field" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" className="input-field" placeholder="Enter Password" onChange={(e) => setPW(e.target.value)} required />
          <div className="custom-dropdown">
            <select onChange={(event) => { setRoom(event.target.value); }} required>
              <option value="" disabled selected>Select A Room</option>
              {renderRooms}
            </select>
          </div>
          <input type="checkbox" className="check-box" />
          <span> Remember Password</span>
          <button className="submit-btn">Log in</button>
          <div className="signUp">
            Don't have account?
            {' '}
            <br />
            <a href="" onClick={hadnleSignUp}>Sign up</a>
          </div>
          {error !== '' ? <span>{error}</span> : ''}
        </form>
      </div>
    </div>
  );
}
