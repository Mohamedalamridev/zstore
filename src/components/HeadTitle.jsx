import React from "react";

function HeadTitle({ text }) {
  return (
    <div className="w-full text-center my-8">
      <h1 className="text-2xl md:text-4xl font-extrabold text-gray-800 tracking-wide relative inline-block">
        {text}
        <span className="absolute left-0 bottom-[-6px] w-full h-[4px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse"></span>
      </h1>
    </div>
  );
}

export default HeadTitle;
