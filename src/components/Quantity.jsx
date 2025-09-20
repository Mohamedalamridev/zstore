import React, { useMemo, useState } from "react";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { useCart } from "../CartContext";

function Quantity({ id, img, title, price, discount }) {
  const { state, dispatch } = useCart();

  const handleDecrease = () => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  };

  const { calcCount } = useMemo(() => {
    let calcCount = state.cart.map((item, i) => {
      return { id: item.id, count: item.count };
    });

    return { calcCount };
  }, [state.cart]);

  return (
    <div className="flex justify-evenly w-44 items-center hover:scale-105  transition-all text-white bg-black py-3 font-bold  rounded-3xl">
      <span className="text-xl px-2 cursor-pointer">
        <FiMinus
          onClick={() => handleDecrease()}
          className="hover:scale-200  transition-all"
        />
      </span>
      <span className="text-md px-1">
        {state.cart.map((item) => {
          return item.id === id && item.count;
        })}
      </span>
      <span className="text-md px-1 cursor-pointer">
        <GoPlus
          className="hover:scale-200  transition-all"
          onClick={() => {
            dispatch({
              type: "ADD_TO_CART",
              payload: { id, img, title, price, discount },
            });
          }}
        />
      </span>
    </div>
  );
}

export default Quantity;
