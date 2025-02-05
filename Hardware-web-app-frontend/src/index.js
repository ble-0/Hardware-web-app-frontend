
// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';  
// import './index.css';

// ReactDOM.render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>,
//     document.getElementById('root')
// );


// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react'
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
import HomePage from './Home';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import CreateHardwarePage from './CreateHardwarePage';
import HardwareItem from "./Hardware"; 



const App =()=>{

    return (
        <Router>    
        <div className ="container">
           <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/createhardware" element={<CreateHardwarePage />} />
            <Route path="/hardware" element={<HardwareItem />} />
           </Routes>
        </div>
        </Router>
    )
}



ReactDOM.createRoot(<App/>, document.getElementById('root'));