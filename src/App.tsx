import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes,Route} from "react-router-dom"
import Login from './component/Login/Login';
import Signup from './component/signup/Signup';
import Profile from './component/Profile/Profile';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/profile" element={<Profile/>}/>
    </Routes>
    </Router>
  );
}

export default App;
