import React, { useState } from "react";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { useCart } from "../CartContext";
import { Link } from "react-router-dom";

function Item({ id, img, title, info, price, count, discount }) {
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
        <p className="py-1 text-gray-500 font-normal text-xs">
          {" "}
          {info &&
            info.length > 0 &&
            info.map((item, i) => {
              return (
                <span className="" key={i}>
                  {item}
                </span>
              );
            })}
        </p>
        <h2 className="font-bold text-lg">
          ${price * count}{" "}
          <span className="font-normal text-md text-red-500">-${discount}</span>
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

        <div className="flex justify-evenly items-center bg-[#F0F0F0] py-1  rounded-3xl">
          <span className="text-xl px-2 cursor-pointer">
            <FiMinus
              onClick={() =>
                dispatch({
                  type: "REMOVE_ITEM",
                  payload: { id },
                })
              }
            />
          </span>
          <span className="text-md px-1">{count}</span>
          <span className="text-md px-1 cursor-pointer">
            <GoPlus
              onClick={() => {
                dispatch({
                  type: "ADD_TO_CART",
                  payload: { id, img, title, info, price, count, discount },
                });
              }}
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Item;
