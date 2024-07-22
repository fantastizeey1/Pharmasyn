import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "/src/components/register/Register";
import Success from "./components/register/succes";
import SignIn from "./components/signIn/signIn";
import SignUp from "./components/register/SignUp";
import Success2 from "./components/signIn/success2";
import SignIn2 from "./components/signIn/signin2";
import Home from "./components/Landingpage/Home";
import Forgotpassword from "./components/signIn/Forgotpassword";
import Forgotpassword2 from "./components/signIn/Forgotpassword2";
import ChangePassword from "./components/signIn/ChangePassword";
import * as Sentry from "@sentry/react";
import Register2 from "./components/register/Register2";
import Success3 from "./components/signIn/Success3";
import Dashboard2 from "./components/Newdash/Dashboard2";
import Shop from "./components/Newdash/Shop";
import Cart from "./components/Newdash/Cart";
import Inventory from "./components/Newdash/Inventory";
import Order from "./components/Newdash/Order";
import Status from "./components/Newdash/Status";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Register2" element={<Register2 />} />
        <Route path="/Success" element={<Success />} />
        <Route path="/PasswordSuccess" element={<Success3 />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignIn2" element={<SignIn2 />} />
        <Route path="/Signin-Success" element={<Success2 />} />
        <Route path="/Dashboard/*" element={<Dashboard />} />
        <Route path="/Forgotpassword" element={<Forgotpassword />} />
        <Route path="/Forgotpassword2" element={<Forgotpassword2 />} />
        <Route path="/ChangePassword" element={<ChangePassword />} />
        <Route path="/NewDash" element={<Dashboard2 />} />
        <Route path="/Shop" element={<Shop />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Inventory" element={<Inventory />} />
        <Route path="/Orders" element={<Order />} />
        <Route path="/Orders/Status" element={<Status />} />

        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default Sentry.withProfiler(App);
