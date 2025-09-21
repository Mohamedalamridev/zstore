import React from "react";
import HeadTitle from "./HeadTitle";

function Categories() {
  return (
    <>
      <HeadTitle text="Shop by Category" />
      <section className="p-4 my-16">
        <div className="container grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          <img src="polo.png" className="h-auto rounded-2xl shadow-lg" alt="" />
          <img
            src="shirts.png"
            className="h-auto rounded-2xl shadow-lg"
            alt=""
          />

          <img
            src="t-shirts.png"
            className="h-auto rounded-2xl shadow-lg"
            alt=""
          />
          <img
            src="shoes.png"
            className="h-auto rounded-2xl shadow-lg"
            alt=""
          />
        </div>
      </section>
    </>
  );
}

export default Categories;
