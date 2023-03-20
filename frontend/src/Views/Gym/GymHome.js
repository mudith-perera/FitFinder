import React, { useState } from 'react';

import { useCookies } from 'react-cookie';

import SideNavbar from '../../Components/Shared/SideNavbar.js';
import DefaultHome from '../DefaultHome.js';

const GymHome = () => {
  const [cookie] = useCookies(['']);
  const [email] = useState((cookie.LoggedUser[4]));
  return (
    <div style={{ display: "flex", flexDirection: "row"}}>
    <div>
    <SideNavbar userRole='gym' userName = {email}/>
    </div>
    <div>
      <DefaultHome />
    </div>
    </div>
  );
}
export default GymHome;