import React from 'react'
import { Outlet } from 'react-router-dom'
import SideNavbar from './SideNavBar.js'

const WithSideNav = () => {
  return (
      <>
          <SideNavbar  />
          <Outlet/>
    </>
  )
}

export default WithSideNav