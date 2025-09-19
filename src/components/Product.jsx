import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext";

function Product({ id, title, name, img, price, oldPrice, count }) {
  const { state, dispatch } = useCart();

  const isAdded = state.cart.some((item) => item.id === id);
  const discount =
    oldPrice > 0 ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { id, name, img, price, title, discount, count: 1 },
    });
  };

  return (
    <div className="group relative rounded-lg p-1 md:p-4 pb-0 shadow-lg ">
      {/* Image */}
      <div className="relative overflow-hidden ">
        <img src={img} alt={title} className=" w-full rounded-lg shadow-lg" />
        {discount > 0 && (
          <span className="absolute -rotate-45 top-4 -left-9 bg-red-500 text-white px-10 text-md font-semibold shadow">
            -{discount}%
          </span>
        )}

        {/* Content */}
        <div className="py-5 px-2 flex-col flex justify-between h-[170px]">
          {/* Title */}
          <Link
            to={`/product_details/${id}`}
            className="block font-semibold text-gray-800 md:text-lg text-xs hover:text-blue-600 transition"
          >
            {title}
          </Link>

          {/* Price */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-md md:text-lg font-bold text-[#377071]">
                ${price}
              </span>
              {oldPrice > 0 && (
                <span className="text-sm text-gray-400 line-through">
                  ${oldPrice}
                </span>
              )}
            </div>
          </div>
          <span
            onClick={handleAddToCart}
            className={`${
              isAdded && "bg-green-500"
            } py-2 mt-3 px-3 cursor-pointer text-center rounded-2xl shadow-md bg-black text-white font-semibold text-sm md:text-md `}
          >
            {isAdded ? "Added" : "Add to Cart"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Product;
