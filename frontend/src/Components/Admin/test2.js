import React from "react";
import SideNavBar from "../../Components/SideNavBar.js";

const test2 = () => {
  return (
    <div>
      <div style={{ position: "fixed"}}>
        <SideNavBar userRole="admin" />
      </div>
      <div style={{ textAlign: "center" }}>
        <h2>this is test 2</h2>this is test 1
      </div>
    </div>
  );
};
export default test2;
