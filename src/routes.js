// src/routes.js
import React, { lazy } from "react";
import NotFound from "./components/NotFound";

// Lazy load components
const Register = lazy(() => import("./components/register/Register"));
const Success = lazy(() => import("./components/register/succes"));
const SignIn = lazy(() => import("./components/signIn/signIn"));
const SignUp = lazy(() => import("./components/register/SignUp"));
const Success2 = lazy(() => import("./components/signIn/success2"));
const SignIn2 = lazy(() => import("./components/signIn/signin2"));
const Home = lazy(() => import("./components/Landingpage/Home"));
const Forgotpassword = lazy(() => import("./components/signIn/Forgotpassword"));
const Forgotpassword2 = lazy(() =>
  import("./components/signIn/Forgotpassword2")
);
const ChangePassword = lazy(() => import("./components/signIn/ChangePassword"));
const Register2 = lazy(() => import("./components/register/Register2"));
const Success3 = lazy(() => import("./components/signIn/Success3"));
const Dashboard2 = lazy(() => import("./components/Newdash/Dashboard2"));
const Shop = lazy(() => import("./components/Newdash/Shop"));
const Cart = lazy(() => import("./components/Newdash/Cart"));
const Inventory = lazy(() => import("./components/Newdash/Inventory"));
const Order = lazy(() => import("./components/Newdash/Order"));
const Status = lazy(() => import("./components/Newdash/Status"));
const Invoice = lazy(() => import("./components/Newdash/Invoice"));
const Admin = lazy(() => import("./components/Newdash/Admin"));
const Docs = lazy(() => import("./components/Newdash/Docs"));
const DocCheck = lazy(() => import("./components/Newdash/DocCheck"));

const routes = [
  { path: "/", element: <Home /> },
  { path: "/Register", element: <Register /> },
  { path: "/Register2", element: <Register2 /> },
  { path: "/Success", element: <Success /> },
  { path: "/PasswordSuccess", element: <Success3 /> },
  { path: "/SignUp", element: <SignUp /> },
  { path: "/SignIn", element: <SignIn /> },
  { path: "/SignIn2", element: <SignIn2 /> },
  { path: "/Signin-Success", element: <Success2 /> },
  { path: "/Forgotpassword", element: <Forgotpassword /> },
  { path: "/Forgotpassword2", element: <Forgotpassword2 /> },
  { path: "/ChangePassword", element: <ChangePassword /> },
  { path: "/NewDash", element: <Dashboard2 /> },
  { path: "/Cart", element: <Cart /> },
  { path: "/Inventory", element: <Inventory /> },
  { path: "/Orders", element: <Order /> },
  { path: "/Orders/Status", element: <Status /> },
  { path: "/Docs/DocCheck", element: <DocCheck /> },
  { path: "/Invoice", element: <Invoice /> },
  { path: "/Admin", element: <Admin /> },
  { path: "/Docs", element: <Docs /> },
  { path: "*", element: <NotFound /> },
];

export default routes;
