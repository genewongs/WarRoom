import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';

import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth';

const app = initializeApp(firebaseConfig);
// import { BrowserRouter as Router , Routes, Route, useNavigate } from 'react-router-dom';

// let RoutedApp = ({}) => {

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<App loadPage={"Home"}/>} />
//         <Route path="/Search" element={<App loadPage={"Search"}/>} />'
//         <Route path="/Saved" element={<App loadPage={"Saved"}/>} />'
//       </Routes>
//     </Router>
//   )
// }

ReactDOM.render(<App />, document.getElementById('WarRoom'));
