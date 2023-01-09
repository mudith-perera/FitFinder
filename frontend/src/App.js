import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UC from "./Views/UnderConstructions.js";
import WithNavBar from "./Components/WithNav.jsx";
import WithoutNavBar from "./Components/WithoutNav.jsx";
import Footer from "./Components/Footer.js";

import Login from "./Views/Login.js";
import SignUp from "./Views/SignUp.js";
import Home from "./Views/Home.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<WithoutNavBar />}></Route>

        <Route element={<WithNavBar />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/uc" element={<UC />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/login" element={<Login />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
