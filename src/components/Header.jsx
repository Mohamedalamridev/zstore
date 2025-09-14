import React from "react";
import Navbar from "./Navbar";
import Sales from "./Sales";

function Header() {
  return (
    <header className="bg-[#F2F0F1] min-h-screen">
      <Navbar />

      <Sales />
    </header>
  );
}

export default Header;
