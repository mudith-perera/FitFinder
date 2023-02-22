import React from 'react';

// import SideNavBar from '../../Components/SideNavBar.js';
import SideNavbar from '../../Components/Shared/SideNavbar.js';
import DefaultHome from '../DefaultHome.js';

const AdminHome = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row"}}>
    <div>
      {/* <SideNavBar userRole='admin'/> */}
    <SideNavbar userRole='admin'/>
    </div>
    <div>
      <DefaultHome />
    </div>
    </div>
  );
}
export default AdminHome;