import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: "64px" }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
