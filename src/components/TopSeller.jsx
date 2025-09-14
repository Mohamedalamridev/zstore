import React, { useEffect, useState } from "react";
import Product from "./Product";
import { Link } from "react-router-dom";
const baseUrl = import.meta.env.VITE_BASE_URL;
import { BeatLoader } from "react-spinners";
function TopSeller() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/product/top-seller`, {
          method: "GET",
          headers: {
            "Content-Type": "Application/json",
          },
          credentials: "include",
        });
        const data = await response.json();
        setProducts(data.products);
        console.log(data.products);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProducts();
  }, []);
  if (products.length <= 0) {
    return (
      <div className="min-h-[70vh]">
        <BeatLoader />
      </div>
    );
  }
  return (
    <>
      <section className="xl:px-12 lg:px-10 px-3 pb-10">
        <h1 className="text-center my-10 font-black text-[#27374D] text-4xl">
          top selling
        </h1>
        <div className="grid grid-cols-12 gap-2 gap-y-4 ">
          {products.length > 0 &&
            products !== null &&
            products.map((p, i) => {
              return (
                <Product
                  id={p?._id}
                  key={i}
                  title={p?.title}
                  img={p?.img[0]}
                  info={p?.moreInfo}
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
