import React, { useEffect, useState } from "react";
import Product from "./Product";
import { BeatLoader } from "react-spinners";
import Fillter from "./Fillter";
const baseUrl = import.meta.env.VITE_BASE_URL;

function TopSeller() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState([]);

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
        setFillter(data.products); // 👈 في البداية خلي المفلترة هي نفس المنتجات
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
      <section className="xl:px-12 min-h-[80vh] lg:px-10 px-3 pb-10 lg:flex gap-6">
        {/* الفلتر بيعدل fillter */}
        <Fillter products={products} setFilter={setFilter} />

        {/* عرض المفلترة بدل كل المنتجات */}
        <div className="grid grid-cols-12 gap-2 gap-y-8 flex-1">
          {filter.length > 0 ? (
            filter.map((p, i) => (
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

export default TopSeller;
