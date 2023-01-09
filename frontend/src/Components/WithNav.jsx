import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './NavBar.js'

const WithNav = () => {
  return (
      <>
          <Navbar />
          <Outlet/>
    </>
  )
}

export default WithNav