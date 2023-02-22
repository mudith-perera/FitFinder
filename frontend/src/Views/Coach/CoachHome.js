import React from 'react';

// import SideNavBar from '../../Components/SideNavBar.js';
import SideNavbar from '../../Components/Shared/SideNavbar.js';
import DefaultHome from '../DefaultHome.js';


const CoachHome = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row"}}>
    <div>
      {/* <SideNavBar userRole='coach'/> */}
    <SideNavbar userRole='coach'/>
    </div>
    <div>
      <DefaultHome />
    </div>
    </div>
  );
}
export default CoachHome;