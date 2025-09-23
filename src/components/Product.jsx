import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext";

function Product({ id, title, img, price, oldPrice = 0, sizes = ["other"] }) {
  const { state, dispatch } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const isAdded = state.cart.some((item) => item.id === id);
  const discount =
    oldPrice > 0 ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  const handleAddToCart = () => {
    if (!selectedSize && sizes[0] !== "other") {
      setShowOptions(true);
      return;
    }

    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id,
        title,
        img,
        price,
        oldPrice,
        discount,
        size: selectedSize || "other",
        count: 1,
      },
    });

    setShowOptions(false);
  };

  return (
    <div className="group bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden relative">
      {/* Image */}
      <div className="relative ">
        <img
          src={img}
          alt={title || "Product image"}
          className="w-full h-auto object-cover"
        />
        {discount > 0 && (
          <span className="absolute top-2 right-2 font-semibold bg-red-500 text-white py-1 px-2 rounded-lg text-xs">
            -{discount}%
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between min-h-[220px]">
        {/* Title */}
        <Link
          to={`/product_details/${id}`}
          className="block text-gray-800 font-medium md:text-lg text-sm hover:text-blue-600 transition line-clamp-2"
        >
          {title}
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-lg md:text-xl font-bold">${price}</span>
          {oldPrice > 0 && (
            <span className="text-sm text-gray-400 line-through">
              ${oldPrice}
            </span>
          )}
        </div>

        {/* Sizes */}
        {showOptions && sizes.length > 0 && (
          <div className="mt-4">
            <span className="block text-sm mb-2 font-medium">Select Size:</span>
            <div className="flex flex-wrap gap-2">
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
          className={`mt-5 py-3 px-4 rounded-lg font-semibold text-sm md:text-md transition
            ${
              isAdded
                ? "bg-green-500 text-white cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-900"
            }`}
        >
          {isAdded ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export default Product;
