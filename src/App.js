import "./App.css";
import Header from "./Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import AfterLogInPage from "./AfterLogInPage";
import ForgotpasswordPage from "./ForgotpasswordPage";
import DemoLogin from "./DemoLogin";
import WhatappRegister from "./WhatappRegister";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Header />}></Route>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="afterlogin" element={<AfterLogInPage />} />
          <Route path="forpas" element={<ForgotpasswordPage />} />
          <Route path="demologin" element={<DemoLogin />} />
          <Route path="whatapp" element={<WhatappRegister />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
