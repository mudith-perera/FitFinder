import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = () => {
  return(
    <div className="container-xxl" style={{ height: "500px", paddingTop: "180px" }}>
      <div style={{ textAlign: "center" }}>
      <ClipLoader size={150} aria-label="Loading Spinner" data-testid="loader"/>
      </div>
      </div>
  );
}
export default Spinner;
