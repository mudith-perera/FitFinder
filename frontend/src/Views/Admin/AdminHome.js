import React from 'react';
import SideNavbar from '../../Components/Shared/SideNavbar.js';
import DefaultHome from '../DefaultHome.js';

const AdminHome = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div>
        <SideNavbar userRole='admin' />
      </div>
      <div>
        <DefaultHome />
      </div>
    </div>
  );
}
export default AdminHome;