import React from "react";
import { CiMail } from "react-icons/ci";

function Newsletter() {
  return (
    <section className="bg-black xl:m-20 p-8 py-10  m-4 flex flex-col gap-3 justify-center items-center rounded-3xl">
      <h1 className="xl:text-4xl text-md mb-5 font-black text-white">
        STAY UPTO DATE ABOUT OUR LATEST OFFERS
      </h1>
      <form className="flex xl:flex-row gap-3 flex-col w-full">
        <div className="relative bg-white rounded-tr-3xl xl:rounded-tr-0  xl:rounded-tl-3xl rounded-bl-3xl xl:w-[65%] py-3 px-6">
          <input
            placeholder="Enter your email address"
            type="text"
            className=" border-0 outline-0 ml-6 w-full "
          />

          <CiMail className=" absolute text-xl left-5 top-2/4 -translate-y-2/4" />
        </div>
        <button className="bg-white xl:w-[25%] font-semibold text-md cursor-pointer border-0 outline-0 xl:rounded-tr-3xl rounded-br-3xl w-full py-3 px-10">
          Subscribe to Newsletter
        </button>
      </form>
    </section>
  );
}

export default Newsletter;
