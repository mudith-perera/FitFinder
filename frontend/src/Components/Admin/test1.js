import React from "react";
import SideNavBar from "../../Components/SideNavBar.js";

const test1 = () => {
  return (
    <div>
      <div style={{ position: "fixed"}}>
        <SideNavBar userRole="admin" />
      </div>
      <div style={{textAlign: 'center'}}>
        <h2>This is Test 1</h2>
      </div>
    </div>
  );
};
export default test1;
