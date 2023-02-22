import React from 'react';

// import SideNavBar from '../../Components/SideNavBar.js';
import SideNavbar from '../../Components/Shared/SideNavbar.js';
import DefaultHome from '../DefaultHome.js';

const GymHome = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row"}}>
    <div>
      {/* <SideNavBar userRole='gym'/> */}
    <SideNavbar userRole='gym'/>
    </div>
    <div>
      <DefaultHome />
    </div>
    </div>
  );
}
export default GymHome;