import React, { useEffect, useState } from "react";

import { BeatLoader } from "react-spinners";

import FeaturedProducts from "./FeaturedProducts";
import NewArrival from "./NewArrival";
import TopSelling from "./TopSelling";
import Categories from "./Categories";
const baseUrl = import.meta.env.VITE_BASE_URL;

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
        console.log(data.products);
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
    <section className="max-w-[1400px] mx-auto">
      <TopSelling products={products} />
      <NewArrival products={products} />
      <FeaturedProducts products={products} />
      <Categories />
    </section>
  );
}

export default Products;
