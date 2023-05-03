import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import SideNavbar from '../../Components/Shared/SideNavbar.js';
import DefaultHome from '../DefaultHome.js';


const CoachHome = () => {

  const [cookie] = useCookies(['']);
  const [username] = useState((cookie.LoggedUser[2]) + " " + (cookie.LoggedUser[3]));

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div>
        <SideNavbar userRole='coach' userName={username} />
      </div>
      <div>
        <DefaultHome />
      </div>
    </div>
  );
}
export default CoachHome;