import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import Reviews from "../components/Reviews";
import Newsletter from "../components/Newsletter";

function SingleProduct() {
  const [count, setCount] = useState(1);
  const [currentImg, setCurrentImg] = useState("single-3.png");
  const [selectedSize, setSelectedSize] = useState(null);

  const images = ["single-3.png", "single-4.png", "single-2.png"];
  const sizes = ["Small", "Medium", "Large", "X-Large"];

  const handleDecrease = () => {
    setCount((prev) => Math.max(prev - 1, 1));
  };

  const handleImagePreview = (src) => {
    setCurrentImg(src);
  };

  return (
    <main className="w-full min-h-screen">
      <Navbar />
      <section className="border-t-2 border-b-2 border-gray-200 product_details grid grid-cols-2 gap-8 p-24">
        {/* Images */}
        <div className="imgs flex gap-[10%]">
          <div className="side_imgs basis-[25%] flex flex-col justify-between gap-4">
            {images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`preview-${i}`}
                className={`w-full h-full rounded-2xl cursor-pointer ${
                  currentImg === src ? "border-2 border-[#27374D]" : ""
                }`}
                onClick={() => handleImagePreview(src)}
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
          <h1 className="name text-4xl font-medium">
            The Timeless Navy Blue Dress Shirt.
          </h1>
          <span className="font-bold text-3xl my-3 block text-[#27374D]">
            $180
          </span>
          <p className="text-sm text-gray-500 my-4 border-b pb-4 border-gray-300">
            A stylish and versatile navy blue men's shirt. Made from
            high-quality cotton, it has a classic spread collar, long sleeves,
            and white buttons that add a sharp, elegant touch. It's suitable for
            both formal and casual settings.
          </p>

          {/* Sizes */}
          <div className="sizes border-b border-gray-200 pb-4">
            <h2 className="text-gray-400 text-sm py-6 my-2 font-normal">
              Choose Size
            </h2>
            <div className="flex gap-4">
              {sizes.map((size) => (
                <span
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`flex rounded-2xl py-2 px-5 w-fit cursor-pointer 
                  ${
                    selectedSize === size
                      ? "bg-[#27374D] text-white"
                      : "bg-[#F0F0F0] text-gray-500"
                  }`}
                >
                  {size}
                </span>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <div className="add_to_cart flex my-8 gap-7">
            <div className="control flex items-center bg-[#F0F0F0] py-2 px-10 rounded-3xl">
              <span
                className="text-xl px-3 cursor-pointer"
                onClick={handleDecrease}
              >
                <FiMinus />
              </span>
              <span className="text-2xl px-3">{count}</span>
              <span
                className="text-xl px-3 cursor-pointer"
                onClick={() => setCount((prev) => prev + 1)}
              >
                <GoPlus />
              </span>
            </div>
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
