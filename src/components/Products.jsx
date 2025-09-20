import React, { useEffect, useState } from "react";
import Product from "./Product";
import { BeatLoader } from "react-spinners";
import Filter from "./Filter";
import HeadTitle from "./HeadTitle";
const baseUrl = import.meta.env.VITE_BASE_URL;

function Products() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState([]);

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
        setFilter(data.products);
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
      <section className="">
        <Filter products={products} setFilter={setFilter} />

        <div className="grid grid-cols-2 lg:grid-cols-3  p-3 md:p-6 gap-y-8 gap-x-2 md:gap-6 lg:p-12 xl:grid-cols-5">
          {filter.length > 0 ? (
            filter.map((p, i) => (
              <Product
                id={p?._id}
                key={i}
                title={p?.title}
                img={p?.imgs[0]}
                info={p?.moreInfo}
                price={p?.price}
                discount={p?.oldPrice - +p.price}
                oldPrice={p?.oldPrice}
                sizes={p?.availableSizes}
              />
            ))
          ) : (
            <p className="col-span-12 text-center text-gray-500">
              No products match this filter.
            </p>
          )}
        </div>
      </section>
      <span className="w-full h-[1px] bg-gray-200 block my-8"></span>
    </>
  );
}

export default Products;
