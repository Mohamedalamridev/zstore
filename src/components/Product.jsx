import React from "react";
import { IoStarSharp } from "react-icons/io5";
import { MdAddShoppingCart, MdFavoriteBorder } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { useCart } from "../CartContext";
import Quantity from "./Quantity";

function Product({
  name,
  count,
  img,
  rate = 0,
  price,
  oldPrice = 0,
  id,
  discount,
}) {
  const { state, dispatch } = useCart();

  const isAdded = state.cart.some((item) => item.id === id);

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { id, name, img, price, discount, count: 1 },
    });
  };

  const validRate = Math.max(0, Math.min(5, rate));
  const discountPercentage =
    oldPrice > 0 ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  return (
    <div className="lg:col-span-1 col-span-4">
      <div className="relative w-[95%] product group border-[1px] border-gray-200 rounded-2xl p-3 shadow-sm">
        {/* product image */}
        <img
          src={img}
          alt={name}
          className="rounded-2xl  w-full group-hover:scale-105 transition-transform duration-300"
        />

        {/* added to cart badge */}
        {isAdded && (
          <span className="absolute top-2 left-2 inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-full shadow-md animate-bounce">
            <FaCheckCircle className="text-lg" />
            Added
          </span>
        )}

        {/* product name */}
        <h1 className="text-xl font-medium mt-2">{name}</h1>

        {/* rating */}
        <div className="rate flex my-1 items-center">
          {Array.from({ length: validRate }).map((_, i) => (
            <IoStarSharp key={i} color="#FFC633" className="text-lg" />
          ))}
          <span className="ml-1 text-[#526D82] text-xs">{validRate}/5</span>
        </div>

        {/* price */}
        <div className="flex items-center justify-between mt-2">
          {oldPrice > 0 ? (
            <div className="flex items-center">
              <span className="font-bold text-xl text-[#27374D]">${price}</span>
              <span className="text-[#526D82] text-xl font-semibold ml-2 line-through">
                ${oldPrice}
              </span>
              <span className="bg-red-50 text-red-500 py-1 px-3 rounded-3xl ml-2 text-xs font-medium">
                -{discountPercentage}%
              </span>
            </div>
          ) : (
            <span className="font-bold text-xl text-[#27374D]">${price}</span>
          )}

          {/* add to cart button always visible */}
        </div>
        {!isAdded ? (
          <button
            onClick={handleAddToCart}
            className=" w-full mt-4 flex items-center gap-2 bg-[#27374D] text-white px-4 py-2 rounded-xl shadow hover:bg-[#1b2433] transition"
          >
            <MdAddShoppingCart className="text-lg" />
            Add to Cart
          </button>
        ) : (
          <Quantity id={id} count={count} />
        )}
      </div>
    </div>
  );
}

export default Product;
