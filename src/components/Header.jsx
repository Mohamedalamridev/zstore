import React from "react";
import Navbar from "./Navbar";

function Header() {
  return (
    <header className="bg-[#F2F0F1] min-h-screen">
      <Navbar />
      <div className="flex flex-col-reverse md:flex-row items-center px-3 md:px-24  md:py-10">
        <div className="content flex-1">
          <h1 className="text-3xl md:text-6xl font-bold text-[#222d41]">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p className="my-6 pr-8s text-md text-[#526D82]">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <button className="px-5 py-3 bg-[#37696a] text-white uppercase rounded-4xl">
            Shop Now
          </button>
          <div className="stats_container grid gap-4 my-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 ">
            <div className="bg-white p-5 rounded-2xl ">
              <h1 className="font-semibold text-4xl text-black mb-2">300+</h1>
              <h2 className="text-sm text-[#526D82]">International Brands</h2>
            </div>
            <div className="bg-white p-5 rounded-2xl  ">
              <h1 className="font-semibold text-4xl text-black mb-2">3,000+</h1>
              <h2 className="text-sm text-[#526D82]">High-Quality Products</h2>
            </div>
            <div className="bg-white p-5 rounded-2xl  ">
              <h1 className="font-semibold text-4xl text-black mb-2">
                40,000+
              </h1>
              <h2 className="text-sm text-[#526D82]">Happy Customerss</h2>
            </div>
          </div>
        </div>
        <div className="img flex-1 ">
          <img src="shopping.png" alt="" className="ml-auto" />
        </div>
      </div>
    </header>
  );
}

export default Header;
