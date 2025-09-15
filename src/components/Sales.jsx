import React from "react";
import { FaArrowRight } from "react-icons/fa6";

export const DiscountsProduct = ({ id, discount, img, category }) => {
  return (
    <div
      key={id}
      className="relative h-[70vh] group overflow-hidden rounded-2xl shadow-lg bg-white"
    >
      {/* Category Label */}
      <div className="absolute top-4 right-4 z-20 bg-blue-600 text-white text-sm font-semibold px-4 py-1 rounded-full shadow-md">
        {category}
      </div>

      {/* Discount Badge */}
      <div className="absolute top-4 left-4 z-20 bg-red-600 text-white font-bold rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-md">
        <span className="text-lg">-{discount}%</span>
        <span className="text-xs">SALE</span>
      </div>

      {/* Image */}
      <img
        className="h-full w-full object-cover transform group-hover:scale-105 transition duration-500"
        src={img}
        alt={category}
      />

      {/* Button */}
      <button className="absolute bottom-0 left-0 w-full flex items-center justify-between bg-black/80 text-white text-lg font-medium px-6 py-4 transition duration-300 group-hover:bg-black">
        <span>Browse Collection</span>
        <FaArrowRight className="text-white text-lg" />
      </button>
    </div>
  );
};

function Sales() {
  return (
    <>
      <section className="pb-10 px-6 mt-4 mb-24">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          🔥 Hot Discounts
        </h2>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <DiscountsProduct
            id={6}
            img="kids.png"
            discount="70"
            category="Kids"
          />
          <DiscountsProduct id={7} img="men.jpg" discount="50" category="Men" />
          <DiscountsProduct
            id={7}
            img="baby.jpg"
            discount="60"
            category="Baby"
          />
          <DiscountsProduct
            id={8}
            img="girls.png"
            discount="40"
            category="Girls"
          />
        </div>
      </section>

      <span className="w-full h-[1px] bg-gray-200 block my-8"></span>
    </>
  );
}

export default Sales;
