import React, { useMemo } from "react";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { useCart } from "../CartContext";

function Quantity({ id, img, title, price, discount }) {
  const { state, dispatch } = useCart();
  const handleDecrease = () => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  };

  const { count } = useMemo(() => {
    let calcCount = state.cart.map((item, i) => {
      return { id: item.id, count: item.count };
    });
    console.log(calcCount);
    return { count: calcCount };
  }, [state.cart]);
  return (
    <div className="flex justify-between my-4 items-center bg-[#F0F0F0] py-1  rounded-3xl">
      <span className="text-xl px-2 cursor-pointer" onClick={handleDecrease}>
        <FiMinus />
      </span>
      <span className="text-2xl px-3">
        {count.map((item, i) => {
          return item.id === id && item.count;
        })}
      </span>
      <span
        className="text-xl px-2 cursor-pointer"
        onClick={() => {
          dispatch({
            type: "ADD_TO_CART",
            payload: { id, img, title, price, discount },
          });
        }}
      >
        <GoPlus />
      </span>
    </div>
  );
}

export default Quantity;
