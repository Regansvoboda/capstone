import React, { useContext, useState, useEffect } from "react";
import {BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Home from "./Home"
import NavBar from "./NavBar"
import Animal from "./Animal"
import Map from './Map'
import Signup from "./Signup";
import { UserContext } from './State';
import Login from './Login'
import ProfilePage from './ProfilePage';
import Settings from './Settings';
import ResearchLogin from "./ResearchLogin";
import ResearchPage from "./ResearchPage";

function App() {

  const { user, setUser } = useContext(UserContext);
  const navigate=useNavigate()

  function handleLogin(user) {
    setUser(user);
  }

  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);


    
  // function handleLogout() {
  //     fetch("/logout", {
  //         method: "DELETE",
  //     }).then(
  //         setUser(null),
  //     navigate('/')
  // )};


  
  
  return (
    <div className="App">
      <NavBar />
      <Routes>
      {/* <Route
              path="/login"
              element={
                user ? (
                  <Navigate to="/profile" replace />
                ) : (
                  <Login handleLogin={handleLogin} user={user} />
                )
              }
            /> */}
        <Route path="/" element={<Home />} />
        <Route path="/animals" element={<Animal />} />
        <Route path="/map" element={<Map />} />
        <Route path="/login" element={<Login />} />
        <Route path="/researchlogin" element={<ResearchLogin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/researchprofile" element={<ResearchPage user={user} setUser={setUser}/>} />
        <Route path='/settings' element={<Settings onAcctDelete={setUser} user={user} />} />
      </Routes>
    </div>
  )
};

export default App;