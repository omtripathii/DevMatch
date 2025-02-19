import React from "react";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import Login from "./components/Login"
import Profile from "./components/Profile"
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <>
      <div>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/Login" element={<Login/>}></Route>
              <Route path="/Profile" element={<Profile/>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
  
      </div>
    </>
  );
}

export default App;
