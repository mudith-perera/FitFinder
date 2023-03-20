
import React,{useState} from 'react';

//import SideNavBar from '../../Components/SideNavBar.js';
import SideNavbar from '../../Components/Shared/SideNavbar.js';
import DefaultHome from '../DefaultHome.js';

import { useCookies } from 'react-cookie';

const MemberHome = () => {
  const [cookie] = useCookies(['']);
  const [username] = useState((cookie.LoggedUser[2])+ " " + (cookie.LoggedUser[3]));
  return (
    <div style={{ display: "flex", flexDirection: "row"}}>
    <div>
      {/* <SideNavBar userRole='member'/> */}
    <SideNavbar userRole='member' userName = {username}/>
    </div>
    <div>
      <DefaultHome />
    </div>
    </div>
  );
}
export default MemberHome;