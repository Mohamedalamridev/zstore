import React, { useState } from "react";
import { IoStarSharp, IoStarHalfSharp, IoStarOutline } from "react-icons/io5";
import {
  MdAddShoppingCart,
  MdFavorite,
  MdFavoriteBorder,
} from "react-icons/md";
import { FaCheckCircle, FaEye } from "react-icons/fa";
import { useCart } from "../CartContext";
import { Link } from "react-router-dom";

function Product({
  name,
  count,
  img,
  info,
  rate,
  price,
  oldPrice,
  title,
  id,
  discount,
}) {
  const { state, dispatch } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const isAdded = state.cart.some((item) => item.id === id);

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { id, name, img, price, info, title, discount, count: 1 },
    });
  };

  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited);
  };

  const validRate = Math.max(0, Math.min(5, rate));
  const discountPercentage =
    oldPrice > 0 ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  // Render star ratings
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
        stars.push(<IoStarOutline key={i} className="text-yellow-400" />);
      }
    }

    return stars;
  };

  return (
    <div className="col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2">
      <div
        className="relative product group border-[1px] border-gray-200 rounded-xl p-2 shadow-sm hover:shadow-xl transition-all duration-300 bg-white"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden rounded-lg">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg"></div>
          )}

          <img
            src={img}
            alt={name}
            className={`rounded-lg w-full transition-all duration-500 ${
              isHovered ? "scale-110" : "scale-100"
            } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setImageLoaded(true)}
          />

          <div
            className={`absolute inset-0 bg-black/50 bg-opacity-20 flex items-center justify-center md:gap-3 gap-2 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <button
              onClick={handleAddToCart}
              className="bg-white p-2 md:p-4 rounded-full shadow-md hover:bg-gray-100 transition-colors transform hover:scale-110"
              aria-label="Add to cart"
            >
              <MdAddShoppingCart className="text-xl text-gray-800" />
            </button>

            <Link
              to={`/product_details/${id}`}
              className="bg-white p-2 md:p-4 rounded-full shadow-md hover:bg-gray-100 transition-colors transform hover:scale-110"
              aria-label="View details"
            >
              <FaEye className="text-xl text-gray-800" />
            </Link>

            <button
              onClick={handleFavoriteToggle}
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors transform hover:scale-110"
              aria-label={
                isFavorited ? "Remove from favorites" : "Add to favorites"
              }
            >
              {isFavorited ? (
                <MdFavorite className="text-2xl text-red-500" />
              ) : (
                <MdFavoriteBorder className="text-2xl text-gray-800" />
              )}
            </button>
          </div>

          {discountPercentage > 0 && (
            <span className="absolute top-2 left-2 bg-red-500 text-white py-1 px-2 rounded-md text-xs font-bold">
              -{discountPercentage}%
            </span>
          )}
        </div>

        <div className="mt-4">
          <div className="flex items-center mb-2">
            <div className="flex text-sm">{renderStars()}</div>
            <span className="text-xs text-gray-500 ml-1">({count})</span>
          </div>

          <Link to={`/product_details/${id}`}>
            <h2 className="text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors ">
              {title}
            </h2>
          </Link>

          {/* Price */}
          <div className="flex items-center mt-2 justify-between">
            {oldPrice > 0 ? (
              <div className="flex items-center">
                <span className="font-bold text-lg text-[#377071]">
                  ${price}
                </span>
                <span className="text-gray-500 text-sm ml-2 line-through">
                  ${oldPrice}
                </span>
              </div>
            ) : (
              <span className="font-bold text-lg text-gray-900">${price}</span>
            )}

            {isAdded ? (
              <button
                onClick={() => {
                  dispatch({ type: "REMOVE_ITEM", payload: { id } });
                }}
              >
                <FaCheckCircle className="text-[#377071] text-2xl " />
              </button>
            ) : (
              <button onClick={handleAddToCart}>
                <MdAddShoppingCart className="text-2xl" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
