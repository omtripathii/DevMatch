import React from "react";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import Login from "./components/Login"
import Profile from "./components/Profile"
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import appStore from "./utils/appStore"
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";

function App() {
  return (
    <>
      <div>
        <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed/>}></Route>
              <Route path="/Login" element={<Login/>}></Route>
              <Route path="/Profile" element={<Profile/>}></Route>
              <Route path="/connections" element={<Connections/>}></Route>
              <Route path="/requests" element={<Requests/>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
        </Provider>
  
      </div>
    </>
  );
}

export default App;
