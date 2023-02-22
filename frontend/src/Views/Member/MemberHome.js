
import React from 'react';

//import SideNavBar from '../../Components/SideNavBar.js';
import SideNavbar from '../../Components/Shared/SideNavbar.js';
import DefaultHome from '../DefaultHome.js';

const MemberHome = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row"}}>
    <div>
      {/* <SideNavBar userRole='member'/> */}
    <SideNavbar userRole='member'/>
    </div>
    <div>
      <DefaultHome />
    </div>
    </div>
  );
}
export default MemberHome;