import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext";
import { TiThMenuOutline } from "react-icons/ti";

function Navbar() {
  const [toggle, setToggle] = useState(false);
  const { state } = useCart();

  const navLinks = ["Shop", "On Sale", "New Arrivals", "Brands"];

  const SearchBar = () => (
    <div className="relative bg-[#DDE6ED] py-2 px-4 w-full lg:w-96 rounded-3xl">
      <CiSearch className="absolute left-3 top-2.5 text-xl text-gray-500" />
      <input
        type="text"
        placeholder="Search for products..."
        className="w-full bg-transparent outline-0 border-0 pl-8 text-sm text-[#27374D]"
      />
    </div>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="xl:px-24 lg:px-16 px-4 w-full py-3 flex items-center md:justify-between">
        {/* Logo */}
        <Link to={"/"}>
          <img src="/logo.png" alt="z-store logo" className="w-16" />
        </Link>

        {/* Toggle Button (Mobile) */}
        <button
          className="lg:hidden text-2xl cursor-pointer z-20 mr-6 ml-auto"
          onClick={() => setToggle(!toggle)}
        >
          {toggle ? <IoCloseSharp /> : <TiThMenuOutline />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex gap-8 text-[#27374D] font-medium">
            {navLinks.map((link, idx) => (
              <li
                key={idx}
                className="cursor-pointer hover:text-blue-600 transition"
              >
                {link}
              </li>
            ))}
          </ul>
          <SearchBar />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6 relative">
          {/* Cart */}
          <Link to={"/cart"} className="relative">
            {state.cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 flex justify-center items-center text-white text-xs font-bold rounded-full w-5 h-5">
                {state.cart.length}
              </span>
            )}
            <MdOutlineShoppingCart className="text-3xl text-[#27374D]" />
          </Link>

          {/* User */}
          <Link to={"/signup"}>
            <FaRegUserCircle className="text-3xl text-[#27374D] cursor-pointer hover:text-blue-600 transition" />
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {toggle && (
        <div className="lg:hidden p-8 text-center flex flex-col gap-6 items-center py-6 bg-white shadow-md animate-slideDown">
          <SearchBar />
          <ul className="flex flex-col gap-4 text-[#27374D] font-medium">
            {navLinks.map((link, idx) => (
              <li
                key={idx}
                className="cursor-pointer hover:text-blue-600 transition"
              >
                {link}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
