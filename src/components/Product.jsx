import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext";

function Product({ id, title, name, img, price, oldPrice, sizes = [] }) {
  const { state, dispatch } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const isAdded = state.cart.some((item) => item.id === id);
  const discount =
    oldPrice > 0 ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowOptions(true);
      return;
    }

    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id,
        name,
        img,
        price,
        title,
        discount,
        count: 1,
        size: selectedSize,
      },
    });
    setShowOptions(false);
  };

  return (
    <div className="group transition-all relative rounded-lg p-2 md:p-4 shadow-lg">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img src={img} alt={title} className="w-full rounded-lg shadow-md" />
        {discount > 0 && (
          <span className="absolute -rotate-45 top-4 -left-9 bg-red-500 text-white px-10 text-sm font-semibold shadow">
            -{discount}%
          </span>
        )}
      </div>

      {/* Content */}
      <div className={` py-4 flex flex-col min-h-[180px] justify-between`}>
        {/* Title */}
        <Link
          to={`/product_details/${id}`}
          className="block font-semibold text-gray-800 md:text-lg text-sm hover:text-blue-600 transition"
        >
          {title}
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-md md:text-lg font-bold text-[#377071]">
            ${price}
          </span>
          {oldPrice > 0 && (
            <span className="text-sm text-gray-400 line-through">
              ${oldPrice}
            </span>
          )}
        </div>

        {/* Sizes */}

        {showOptions && sizes.length > 0 && (
          <div>
            <span className="block text-sm my-1">Select size</span>
            <div className="flex flex-wrap gap-2 mt-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition 
                    ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          disabled={isAdded}
          className={`mt-4 py-2 px-3 rounded-2xl  shadow-md font-semibold text-sm md:text-md transition
            ${
              isAdded
                ? "bg-green-500 text-white"
                : "bg-black text-white hover:bg-gray-800"
            }
          `}
        >
          {isAdded ? "Added" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export default Product;
