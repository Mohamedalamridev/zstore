import React from "react";
import { IoStarSharp } from "react-icons/io5";

function Review({ rate, name, body, date }) {
  return (
    <div className="p-6 flex flex-col gap-2  border-2 rounded-2xl border-gray-200">
      <div className="flex text-[#FFC633] text-lg">
        {Array.from({ length: rate }).map((_, i) => {
          return <IoStarSharp className="" />;
        })}
      </div>
      <h1 className="user_name font-bold text-lg">{name}</h1>
      <p className="text-sm text-gray-500 font-normal leading-5">"{body}"</p>
      <h2 className="date text-xs mt-1 text-gray-800">{date}</h2>
    </div>
  );
}

export default Review;
