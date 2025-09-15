import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { TiThMenuOutline } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import { useUser } from "../UserContext";
import { MdMenu } from "react-icons/md";
import { RiAccountCircle2Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { MdAddShoppingCart } from "react-icons/md";

function Navbar() {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(true);
  const { state: cartState } = useCart();
  const { state: userState, dispatch, logout } = useUser();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { label: "Shop", path: "/" },
    { label: "On Sale", path: "/" },
    { label: "New Arrivals", path: "/" },
  ];

  return (
    <nav className="bg-white flex items-center justify-between shadow-md top-0 z-50 px-4 py-4 lg:px-16 relative">
      <Link to={"/"}>
        <img src="/logo.png" alt="z-store logo" className="w-24 lg:w-26 " />
      </Link>

      {toggle ? (
        <MdMenu
          className="md:hidden text-3xl cursor-pointer absolute right-4 top-2/4 -translate-y-2/4 z-20 "
          onClick={() => setToggle(false)}
        />
      ) : (
        <IoMdClose
          className="md:hidden text-3xl cursor-pointer absolute right-4 top-2/4 -translate-y-2/4 z-20 "
          onClick={() => setToggle(true)}
        />
      )}

      {/* Menu for desktop */}
      <div>
        <ul className="hidden gap-8 md:flex">
          {navLinks.map((item) => {
            return (
              <li className=" text-gray-600">
                <Link to={item.path}>{item.label}</Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* cart icon */}

      {/* Menu for Mobile */}
      <ul
        style={{ transition: "0.5s" }}
        className={`absolute left-0 bg-white shadow-lg w-full p-8 flex-col gap-8 text-xl ${
          !toggle ? "top-4/4" : "-top-100"
        }`}
      >
        <li className="">
          <Link to={userState.isLogged ? "/profile" : "/login"}>
            <RiAccountCircle2Fill className="text-5xl" />
          </Link>
        </li>
        {navLinks.map((item) => {
          return (
            <li className="not-last:border-b-2 py-4 text-gray-500">
              <Link to={item.path}>{item.label}</Link>
            </li>
          );
        })}
      </ul>
      <div className="flex items-center gap-3">
        <Link className="relative" to={"/cart"}>
          <MdAddShoppingCart className="text-2xl mr-9 md:mr-0" />
          {cartState.cart.length > 0 && (
            <span className="absolute -top-3 -left-3 bg-red-500 text-xs  text-white font-bold rounded-full px-2 py-1 ">
              {cartState.cart.length > 0 && cartState.cart.length}
            </span>
          )}
        </Link>
        <Link
          className="hidden md:inline"
          to={userState.isLogged ? "/profile" : "/login"}
        >
          <RiAccountCircle2Fill className="text-4xl" />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
