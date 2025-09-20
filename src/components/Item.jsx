import React, { useState } from "react";

import { MdDelete } from "react-icons/md";
import { useCart } from "../CartContext";
import Quantity from "./Quantity";
import { Link } from "react-router-dom";

function Item({ id, img, title, price, count, discount, size, color }) {
  const { state, dispatch } = useCart();

  return (
    <div className="flex not-last:border-b-[1px] border-gray-400 pb-6">
      <div className="img">
        <img src={img} alt="" className="lg:w-32 w-44 rounded-lg" />
      </div>
      <div className="ml-3">
        <Link to={`/product_details/${id}`}>
          <h1>{title}</h1>
        </Link>

        {size && (
          <h2 className="my-1">
            <span className="font-bold">Size:</span> {"  "}
            {size}
          </h2>
        )}
        <h2 className="font-bold text-lg">
          ${price * count}{" "}
          {discount > 0 && (
            <span className="line-through text-gray-400 text-base font-normal ml-2">
              ${discount}
            </span>
          )}{" "}
        </h2>
      </div>
      <div className="flex ml-auto flex-col justify-between">
        <span
          onClick={() =>
            dispatch({
              type: "REMOVE_ITEM",
              payload: { id },
            })
          }
          className="ml-auto text-2xl text-red-600"
        >
          <MdDelete />
        </span>

        <Quantity
          id={id}
          color={color}
          size={size}
          img={img}
          price={price}
          discount={discount}
          title={title}
          count={count}
        />
      </div>
    </div>
  );
}

export default Item;
