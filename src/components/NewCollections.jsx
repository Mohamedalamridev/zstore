import React from "react";
import Product from "./Product";

function NewCollections() {
  return (
    <>
      <section className="xl:px-24 lg:px-10 px-4 pb-10">
        <h1 className="text-center my-10 font-black text-[#27374D] text-4xl">
          NEW ARRIVALS
        </h1>
        <div className="grid grid-cols-4 gap-8 ">
          <Product
            id={5}
            name="Classic Blue Shirt"
            img="pro-5.png"
            rate={4}
            discount={0}
            price="120"
            oldPrice="200"
          />
          <Product
            id={6}
            name="Classic Blue Shirt"
            img="pro-6.png"
            rate={5}
            discount={50}
            price="360"
          />
          <Product
            id={7}
            name="Classic Blue Shirt"
            img="pro-7.png"
            rate={5}
            discount={0}
            price="118"
          />
          <Product
            id={8}
            name="Classic Blue Shirt"
            img="pro-8.png"
            rate={4}
            discount={100}
            price="199"
            oldPrice="400"
          />
        </div>
      </section>
      <button className="p-3 px-5 rounded-4xl border-2 my-8 mx-auto block ">
        View More
      </button>
      <span className="w-full h-[1px] bg-gray-200 block my-8"></span>
    </>
  );
}

export default NewCollections;
