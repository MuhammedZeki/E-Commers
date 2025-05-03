import React from "react";
import Header from "../Header/HeaderItem";
import Policy from "../Policy/Policy";
import Footer from "../Footer/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Header />
      {children}

      <Policy />
      <Footer />
    </div>
  );
};

export default MainLayout;
