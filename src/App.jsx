import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import * as Sentry from "@sentry/react";
import LoadingSpinner from "./components/Landingpage/LoadingSpinner";
import ErrorBoundary from "./ErrorBoundary";

// Lazy load components
const Home = lazy(() => import("./components/Landingpage/Home"));
const Register = lazy(() => import("./components/register/Register"));
const Register2 = lazy(() => import("./components/register/Register2"));
const Success = lazy(() => import("./components/register/succes"));
const Success3 = lazy(() => import("./components/signIn/Success3"));
const SignUp = lazy(() => import("./components/register/SignUp"));
const SignIn = lazy(() => import("./components/signIn/signIn"));
const SignIn2 = lazy(() => import("./components/signIn/signin2"));
const Success2 = lazy(() => import("./components/signIn/success2"));
const Forgotpassword = lazy(() => import("./components/signIn/Forgotpassword"));
const Forgotpassword2 = lazy(() =>
  import("./components/signIn/Forgotpassword2")
);
const ChangePassword = lazy(() => import("./components/signIn/ChangePassword"));
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
const NotFound = lazy(() => import("./components/NotFound"));

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <ErrorBoundary>
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
            <Route path="/Forgotpassword" element={<Forgotpassword />} />
            <Route path="/Forgotpassword2" element={<Forgotpassword2 />} />
            <Route path="/ChangePassword" element={<ChangePassword />} />
            <Route path="/Dashboard" element={<Dashboard2 />} />
            <Route path="/Shop" element={<Shop />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Inventory" element={<Inventory />} />
            <Route path="/Orders" element={<Order />} />
            <Route path="/Orders/Status" element={<Status />} />
            <Route path="/Docs/DocCheck" element={<DocCheck />} />
            <Route path="/Invoice" element={<Invoice />} />
            <Route path="/Admin" element={<Admin />} />
            <Route path="/Docs" element={<Docs />} />
            <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
          </Routes>
        </ErrorBoundary>
      </Suspense>
    </Router>
  );
}

export default Sentry.withProfiler(App);
