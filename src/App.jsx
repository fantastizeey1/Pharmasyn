import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "/src/components/register/Register";
import Success from "./components/register/succes";
import SignIn from "./components/signIn/signIn";
import SignUp from "./components/register/SignUp";
import Success2 from "./components/signIn/success2";
import RegisterPhamComp from "./components/register/Register2PhamComp";
import Register2phamarcy from "./components/register/Register2phamarcy";
import RegisterPersonel from "./components/register/RegisterPersonel";
import SignIn2 from "./components/signIn/signin2";
import Dashboard from "./components/Dash/Dashboard";
import Home from "./components/Landingpage/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/RegisterPhamComp" element={<RegisterPhamComp />} />
        <Route path="/Register/Pharmacy" element={<Register2phamarcy />} />
        <Route path="/Register/personel" element={<RegisterPersonel />} />
        <Route path="/Success" element={<Success />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignIn2" element={<SignIn2 />} />
        <Route path="/Signin-Success" element={<Success2 />} />
        <Route path="/Dashboard/*" element={<Dashboard />} />
        {/* <Route path="/Dashboard/users" element={<Users />} /> */}

        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
