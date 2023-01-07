import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import UC from "./Views/UnderConstructions.js"
import NavBar from "./Components/NavBar.js"
import Footer from "./Components/Footer.js"

import Login from "./Views/Login.js"
import SignUp from "./Views/SignUp.js"

function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
          <Route exact path="/" element={<UC/>}/>
          <Route exact path="/uc" element={<UC/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/sign-up" element={<SignUp/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
