import React from 'react';

import './App.css';
import Nav from './components/Nav';
import Search from './components/Search';
import Cards from './components/Card'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { AddUser } from './components/AddUser';
import Documents from './components/Documents';



function App() {
  return (
    <>
    <Nav/>
    <Routes>
      
      <Route path="/" element={<Home />} />
      {/* <Route path="/profile/:id" element={<Profile />} /> */}
      <Route path="/add-user" element={<AddUser />} />
      <Route path="/add-doc" element={<Documents/>} />
    </Routes>
   </>
  );
}

export default App;
