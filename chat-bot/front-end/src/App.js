import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import MessageBoard from './pages/MessageBoard';
import React, { useState } from 'react';

//figure out how to change loggedIn state using login component
function App() {
  const [uid, setUid] = useState("");
 

  return (
    <div className="App">
      {/*<MessageBoard loggedIn = {loggedIn}/>*/}
      {/*render*/}

      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navigate to="/login"/>}/>
            <Route path="/login" element={<Login setUid = {setUid}/>}/>
            <Route path="/signup" element={<SignUp setUid = {setUid}/>}/>
            <Route path="/messageboard" element={<MessageBoard uid = {uid}/>}/>
        </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;
