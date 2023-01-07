import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import UC from "./Views/UnderConstructions.js"
import NavBar from "./Components/NavBar.js"
import Footer from "./Components/Footer.js"

function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
          <Route exact path="/" element={<UC/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
