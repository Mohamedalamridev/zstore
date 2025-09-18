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

function Product({ id, title, name, img, rate, price, oldPrice, count }) {
  const { state, dispatch } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const isAdded = state.cart.some((item) => item.id === id);
  const validRate = Math.max(0, Math.min(5, rate));
  const discountPercentage =
    oldPrice > 0 ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { id, name, img, price, title, count: 1 },
    });
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(validRate);
    const hasHalfStar = validRate % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<IoStarSharp key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<IoStarHalfSharp key={i} className="text-yellow-400" />);
      } else {
        stars.push(<IoStarOutline key={i} className="text-gray-300" />);
      }
    }
    return stars;
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
        {/* Hover Actions */}
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
