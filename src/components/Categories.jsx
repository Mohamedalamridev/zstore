import React from "react";

function Categories() {
  return (
    <section className="p-4 bg-gradient-to-r from-blue-100 via-blue-200 to-green-100">
      <div className="container grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        <div className="cat-1 p-12 h-72 bg-white shadow-lg rounded-lg text-2xl font-bold    ">
          Polo
        </div>
        <div className="">
          <img src="t-shirts.png" className="h-auto w-full" alt="" />
        </div>
        <div className="cat-1 p-12 h-72 bg-white shadow-lg rounded-lg text-2xl font-bold    ">
          Shirt
        </div>
        <div className="cat-1 p-12 h-72 bg-white shadow-lg rounded-lg text-2xl font-bold    ">
          Shose
        </div>
      </div>
    </section>
  );
}

export default Categories;
