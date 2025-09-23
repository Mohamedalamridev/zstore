import React, { useEffect, useState } from "react";

import { BeatLoader } from "react-spinners";

import FeaturedProducts from "./FeaturedProducts";
import NewArrival from "./NewArrival";
import TopSelling from "./TopSelling";
import Categories from "./Categories";
import Hero from "./Hero";
const baseUrl = import.meta.env.VITE_BASE_URL;
0;

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/products`, {
          method: "GET",
          headers: {
            "Content-Type": "Application/json",
          },
          credentials: "include",
        });
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProducts();
  }, []);

  if (products.length <= 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <BeatLoader />
      </div>
    );
  }

  return (
    <>
      <Hero />
      <section className="mx-2 md:mx-12">
        <TopSelling products={products} />
        <NewArrival products={products} />
        <FeaturedProducts products={products} />
        <Categories />
      </section>
    </>
  );
}

export default Products;
