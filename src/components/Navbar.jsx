import React, { useState } from "react";
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
    <nav className="bg-white flex items-center justify-between shadow-sm  top-0 z-50 px-4 py-6 lg:px-16 relative">
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
        <ul className="hidden gap-10 md:flex">
          {navLinks.map((item, i) => {
            return (
              <li key={i} className=" text-gray-600 text-xl">
                <Link to={item.path}>{item.label}</Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Menu for Mobile */}
      <ul
        style={{ transition: "0.3s" }}
        className={`absolute left-0 bg-white shadow-lg w-full p-8 flex-col gap-8 text-xl ${
          !toggle ? "top-4/4" : "-top-100"
        }`}
      >
        <li className="">
          <Link
            className="flex items-center gap-2"
            to={userState.isLogged ? "/profile" : "/login"}
          >
            <RiAccountCircle2Fill className="text-5xl" />
            <span className="font-semibold text-gray-500">
              {userState.isLogged ? "profile" : "login"}
            </span>
          </Link>
        </li>
        {navLinks.map((item, i) => {
          return (
            <li
              onClick={() => setToggle(true)}
              key={i}
              className="not-last:border-b-2 py-4 text-gray-600"
            >
              <Link to={item.path}>{item.label}</Link>
            </li>
          );
        })}
        <li>
          {userState.isLogged && (
            <button
              className="cursor-pointer  text-md mt-4 text-black font-semibold"
              onClick={() => {
                setToggle(true);
                handleLogout();
              }}
            >
              Logout
            </button>
          )}
        </li>
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
        {userState.isLogged ? (
          <Link
            className="hidden md:inline"
            to={userState.isLogged ? "/profile" : "/login"}
          >
            <RiAccountCircle2Fill className="text-4xl" />
          </Link>
        ) : (
          <Link to="/login" className="font-bold text-lg md:inline hidden">
            Login
          </Link>
        )}
        {userState.isLogged && (
          <button
            className="hidden md:inline cursor-pointer text-black font-semibold"
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
