import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useNavigate} from 'react-router-dom';
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        War Room
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



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