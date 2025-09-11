import React, { useState } from "react";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { useCart } from "../CartContext";
import Quantity from "./Quantity";

function Item({ id, img, title, info, price, count, discount }) {
  const { state, dispatch } = useCart();

  return (
    <div className="flex gap-4 not-last:border-b-[1px] border-gray-400 pb-4">
      <div className="img">
        <img src={img} alt="" className="lg:w-32 w-28 rounded-lg" />
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
        <Quantity
          id={id}
          img={img}
          price={price}
          discount={discount}
          title={title}
          count={count}
          key={id}
        />
      </div>
    </div>
  );
}

export default Item;
