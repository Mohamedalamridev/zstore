import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Reviews from "../components/Reviews";
import Newsletter from "../components/Newsletter";
import Quantity from "../components/Quantity";
import { useParams } from "react-router-dom";

function SingleProduct() {
  const [count, setCount] = useState(1);
  const [currentImg, setCurrentImg] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://zstore-server.onrender.com/api/product/${id}`
        );
        const data = await res.json();
        setProduct(data.product);

        if (data.product?.img?.length > 0) {
          setCurrentImg(data.product.img[0]);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <main className="w-full min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-500">Loading product...</p>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen">
      <Navbar />
      <section className="border-t-2 border-b-2 border-gray-200 product_details grid lg:grid-cols-2 gap-8 p-4 lg:p-24">
        {/* Images */}
        <div className="imgs flex gap-[10%]">
          <div className="side_imgs basis-[25%] flex flex-col justify-between gap-4">
            {product.img?.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`preview-${i}`}
                className={`w-full h-[33%] rounded-2xl cursor-pointer ${
                  currentImg === src ? "border-2 border-[#27374D]" : ""
                }`}
                onClick={() => setCurrentImg(src)}
              />
            ))}
          </div>
          <div className="preview_img basis-[75%]">
            <img
              src={currentImg}
              alt="main preview"
              className="max-w-full h-full rounded-2xl"
            />
          </div>
        </div>

        {/* Product Content */}
        <div className="content">
          <h1 className="name lg:text-4xl text-2xl font-medium">
            {product.title}
          </h1>
          <span className="font-bold text-3xl my-3 block text-[#27374D]">
            ${product.price}
            {product.oldPrice && (
              <span className="line-through text-gray-400 text-lg ml-3">
                ${product.oldPrice}
              </span>
            )}
          </span>
          <p className="text-sm text-gray-500 my-4 border-b pb-4 border-gray-300">
            {product.desc}
          </p>

          {/* Add to Cart */}
          <div className="add_to_cart flex-col flex my-8 gap-7">
            <Quantity
              id={product?._id}
              name={product?.title}
              img={product?.img[0]}
              price={product?.price}
              discount={product?.oldPrice - product.price}
              oldPrice={product?.oldPrice}
            />
            <button className="py-2 px-20 rounded-3xl w-full text-white bg-[#27374D]">
              Add To Cart
            </button>
          </div>
        </div>
      </section>
      <Reviews />
      <Newsletter />
    </main>
  );
}

export default SingleProduct;
