import React, { useEffect, useState } from "react";
import Product from "./Product";
import { Link } from "react-router-dom";

function TopSeller() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://zstore-server.onrender.com/api/product/top-seller",
          {
            method: "GET",
            headers: {
              "Content-Type": "Application/json",
            },
          }
        );
        const data = await response.json();
        setProducts(data.products);
        console.log(data.products);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProducts();
  }, []);
  return (
    <>
      <section className="xl:px-24 lg:px-10 px-3 pb-10">
        <h1 className="text-center my-10 font-black text-[#27374D] text-4xl">
          top selling
        </h1>
        <div className="grid grid-cols-4 gap-y-16 ">
          {products.length > 0 &&
            products !== null &&
            products.map((p, i) => {
              return (
                <Product
                  key={p._id}
                  id={p?._id}
                  title={p?.title}
                  img={p?.img[0]}
                  rate={4}
                  price={p?.price}
                  discount={p?.oldPrice - +p.price}
                  oldPrice={p?.oldPrice}
                />
              );
            })}
        </div>
      </section>
      <span className="w-full h-[1px] bg-gray-200 block my-8"></span>
    </>
  );
}

export default TopSeller;
