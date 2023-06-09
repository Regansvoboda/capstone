import React, { createContext, useState, useEffect } from "react";
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Home"
import NavBar from "./NavBar"
import Animal from "./Animal"
import Map from './Map'
import CreateAcc from "./CreateAcc";
// import AboutContainer from './AboutContainer';
import Login from './Login'
import ProfilePage from './ProfilePage';

function App() {

  
  
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/animals" element={<Animal />} />
        <Route path="/map" element={<Map />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<CreateAcc />} />
        <Route path="/users/orders" element={<ProfilePage />} />
      </Routes>
    </div>
  )
};

export default App;