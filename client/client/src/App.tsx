import React from "react";
import "./App.css";
import Nav from "./components/Nav";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { AddUser } from "./components/AddUser";
import Documents from "./components/Documents";
import ViewDetails from "./components/ViewDetails";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>

      <Nav />
    <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/add-doc" element={<Documents />} />
        <Route path="/view-details/:id" element={<ViewDetails />} />
      </Routes>
    </>
  );
}

export default App;
