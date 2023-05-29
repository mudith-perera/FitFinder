
import React,{useState} from 'react';

//import SideNavBar from '../../Components/SideNavBar.js';
import SideNavbar from '../../Components/Shared/SideNavbar.js';

import { useCookies } from 'react-cookie';
import MemberStats from '../../Components/Member/MemberStats.js';

const MemberHome = () => {
  const [cookie] = useCookies(['']);
  const [username] = useState(
    (cookie.LoggedUser[2] || '') + ' ' + (cookie.LoggedUser[3] || '')
  );
  return (
    <div style={{ display: "flex", flexDirection: "row"}}>
    <div>
    <SideNavbar userRole='member' userName = {username}/>
    </div>
    <div>
      {/* <DefaultHome /> */}
      <MemberStats/>
    </div>
    </div>
  );
}
export default MemberHome;