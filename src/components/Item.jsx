import React, { useState } from "react";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { useCart } from "../CartContext";

function Item({ id, img, title, info, price, count, discount }) {
  const { state, dispatch } = useCart();
  const handleDecrease = () => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  };

  return (
    <div className="flex gap-4 not-last:border-b-[1px] border-gray-400 pb-4">
      <div className="img">
        <img src={img} alt="" className="lg:max-w-32 w-28 rounded-lg" />
      </div>
      <div>
        <h1>{title}</h1>
        <p className="py-1 text-gray-500 font-normal text-sm"> {info}</p>
        <h2 className="font-black text-xl">${price * count} </h2>
      </div>
      <div className="flex ml-auto flex-col justify-between">
        <span
          onClick={() =>
            dispatch({
              type: "REMOVE_ITEM",
              payload: {
                id,
              },
            })
          }
          className="ml-auto text-2xl text-red-600"
        >
          <MdDelete />
        </span>
        <div className="flex items-center bg-[#F0F0F0] py-1 px-1 rounded-3xl">
          <span
            className="text-xl px-2 cursor-pointer"
            onClick={handleDecrease}
          >
            <FiMinus />
          </span>
          <span className="text-xl px-3">{count}</span>
          <span
            className="text-xl px-2 cursor-pointer"
            onClick={() => {
              dispatch({
                type: "ADD_TO_CART",
                payload: { id, img, title, price, count, discount },
              });
            }}
          >
            <GoPlus />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Item;
