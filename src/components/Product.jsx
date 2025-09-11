import React from "react";
import { IoStarSharp } from "react-icons/io5";
import { MdAddShoppingCart } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { useCart } from "../CartContext";
import { FaCheckCircle } from "react-icons/fa";

function Product({ name, img, rate, price, oldPrice = 0, id, discount }) {
  const { state, dispatch } = useCart();
  return (
    <div className="lg:col-span-1  col-span-2">
      <div className="relative img product">
        <div
          className={` absolute h-[70%] add_to_cart hidden w-full top-0 left-0  gap-5 justify-center items-center flex-col`}
        >
          <button
            onClick={() =>
              dispatch({
                type: "ADD_TO_CART",
                payload: {
                  id,
                  name,
                  img,
                  price,
                  discount,
                  count: 1,
                },
              })
            }
            className="text-3xl cursor-pointer bg-white p-4 rounded-full"
          >
            <MdAddShoppingCart />
          </button>
          <button className="text-3xl cursor-pointer bg-white p-4 rounded-full">
            <MdFavoriteBorder />
          </button>
        </div>
        <img src={img} alt="" className="rounded-2xl" />
        {state.cart.map((item, i) => {
          return (
            item.id === id && (
              <span className="-translate-y-12 ml-2 inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-full shadow-md hover:bg-green-700 transition duration-300">
                <FaCheckCircle className="text-lg" />
                Added
              </span>
            )
          );
        })}
        <h1 className="text-xl font-medium mt-2">{name}</h1>

        <div className="rate flex my-1 items-center">
          {Array.from({ length: rate }).map((_, i) => {
            return <IoStarSharp color={"#FFC633"} className="text-lg" />;
          })}
          <span className="ml-1 text-[#526D82] text-xs">{rate}/5</span>
        </div>
        <div>
          {oldPrice > 0 ? (
            <div className="flex items-center">
              <span className="font-bold text-xl text-[#27374D]">${price}</span>
              <span className="text-[#526D82] text-xl font-semibold ml-2 line-through">
                ${oldPrice}
              </span>
              <span className="bg-red-50 text-red-500 py-1 px-3 rounded-3xl ml-2 text-xs">
                -{Math.round((price / oldPrice) * 100)}%
              </span>
            </div>
          ) : (
            <span className="font-bold text-xl text-[#27374D]">${price}</span>
          )}
        </div>
      </div>
    </div>
  );
}
export default Product;
