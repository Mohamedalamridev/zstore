import React, { useState } from "react";

function Hero() {
  return (
    <section
      className="w-full h-[100vh] hidden lg:flex relative"
      aria-label="Hero section"
    >
      <div className="content absolute left-11 top-72">
        <h1 className="text-6xl font-bold">
          <span className="sr-only">Zstore</span>
          <span aria-hidden="true">Zstore </span>— Your Style, Your Rules
        </h1>
        <p className="text-2xl w-3/5 my-7">
          Discover our exclusive collection of modern polos that blend comfort
          and style, made to keep your look fresh every day.
        </p>
        <button
          className="bg-black text-white text-lg font-semibold rounded-md py-3 px-4 hover:bg-gray-800 transition-colors"
          aria-label="Shop our collection"
        >
          Shop Now
        </button>
      </div>
      <img
        src="hero.png"
        alt="Fashion model showcasing modern polo collection"
        className="w-full h-full object-cover"
      />
    </section>
  );
}

export default Hero;
