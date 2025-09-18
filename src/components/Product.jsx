import React, { useState } from "react";
import { IoStarSharp, IoStarHalfSharp, IoStarOutline } from "react-icons/io5";
import {
  MdAddShoppingCart,
  MdFavorite,
  MdFavoriteBorder,
} from "react-icons/md";
import { FaCheckCircle, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext";

function Product({ id, title, name, img, price, oldPrice, count }) {
  const { state, dispatch } = useCart();

  const isAdded = state.cart.some((item) => item.id === id);
  const discountPercentage =
    oldPrice > 0 ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { id, name, img, price, title, discountPercentage, count: 1 },
    });
  };

  return (
    <div
      className="group relative rounded-lg p-1 md:p-4 pb-0 shadow-lg "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative ">
        <img src={img} alt={title} className="w-full rounded-lg shadow-lg" />
        {discountPercentage > 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-semibold shadow">
            -{discountPercentage}%
          </span>
        )}

        {/* Content */}
        <div className="py-6 px-2 flex-col flex justify-between min-h-[130px]">
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
            } py-2 mt-3 px-3 cursor-pointer text-center rounded-2xl shadow-md bg-black text-white font-semibold text-xs `}
          >
            {isAdded ? "Added" : "Add to Cart"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Product;
