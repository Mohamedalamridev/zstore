import React from "react";
import Product from "./Product";

function Recommends() {
  return (
    <section className="my-6">
      <h1 className="text-center uppercase my-12 text-5xl font-black">
        You might also like
      </h1>
      <div className="grid grid-cols-4 gap-8 ">
        <Product
          id={1}
          name="Classic Blue Shirt"
          img="pro-1.png"
          rate={4}
          price="120"
          oldPrice="200"
        />
        <Product
          id={2}
          name="Classic Blue Shirt"
          img="pro-2.png"
          rate={5}
          price="360"
        />
        <Product
          id={3}
          name="Classic Blue Shirt"
          img="pro-3.png"
          rate={5}
          price="118"
        />
        <Product
          id={4}
          name="Classic Blue Shirt"
          img="pro-4.png"
          rate={4}
          price="199"
          oldPrice="400"
        />
      </div>
    </section>
  );
}

export default Recommends;
