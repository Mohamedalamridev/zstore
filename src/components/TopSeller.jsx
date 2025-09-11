import React from "react";
import Product from "./Product";

function TopSeller() {
  return (
    <>
      <section className="xl:px-24 lg:px-10 px-3 pb-10">
        <h1 className="text-center my-10 font-black text-[#27374D] text-4xl">
          top selling
        </h1>
        <div className="grid grid-cols-4 gap-y-16 ">
          <Product
            id={1}
            name="polo Blue Shirt"
            img="pro-1.png"
            rate={4}
            price="120"
            discount={0}
            oldPrice="200"
          />
          <Product
            id={2}
            name="xyz Shirt"
            img="pro-2.png"
            rate={5}
            price="360"
            discount={800}
          />

          <Product
            id={3}
            name="Classice Shirt"
            img="pro-3.png"
            rate={5}
            price="118"
            discount={80}
          />

          <Product
            id={4}
            name=" Blue Shirt"
            img="pro-4.png"
            rate={4}
            price="199"
            discount={80}
            oldPrice="400"
          />
        </div>
      </section>
      <span className="w-full h-[1px] bg-gray-200 block my-8"></span>
    </>
  );
}

export default TopSeller;
