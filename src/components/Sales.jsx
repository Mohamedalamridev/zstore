import React from "react";

import { FaArrowRight } from "react-icons/fa6";

export const DiscountsProduct = ({ id, discount, img }) => {
  return (
    <div className="">
      <div key={id} className="relative h-[70vh]">
        <div className="absolute top-3 left-3 p-4 text-center text-3xl z-20 bg-red-500 text-white font-bold">
          <span className="text-shadow-lg">-{discount}%</span>
          <span className="block text-shadow-lg">SALE</span>
        </div>
        <img className="h-full lg:w-[350px] w-full" src={img} alt="" />
        <button className="flex items-center justify-around w-full bg-black text-lg text-white p-4">
          <span> Browser Collection</span>
          <FaArrowRight className="text-white text-lg" />
        </button>
      </div>
    </div>
  );
};

function Sales() {
  return (
    <>
      <section className="pb-10 mx-12 mt-4 mb-24">
        <div className="grid gap-2  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <DiscountsProduct id={6} img="kids.png" discount="70" />
          <DiscountsProduct id={7} img="men.jpg" discount="50" />
          <DiscountsProduct id={7} img="baby.jpg" discount="60" />
          <DiscountsProduct id={8} img="girls.png" discount="40" />
        </div>
      </section>

      <span className="w-full h-[1px] bg-gray-200 block my-8"></span>
    </>
  );
}

export default Sales;
