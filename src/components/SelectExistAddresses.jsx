import React, { useState } from "react";

function SelectExistAddresses({ addresses, setAddNewAddress }) {
  return (
    <section className="border-2 md:p-6 p-3 rounded-2xl border-gray-200 shadow-md my-6 bg-white">
      {/* Section Header */}
      <h1 className="md:text-2xl text-xl font-bold text-gray-900 mb-6">
        Choose Address
        <span className="block text-sm font-normal text-gray-500 mt-1">
          Select where you’d like your order delivered
        </span>
      </h1>

      {/* Address List */}
      <div className="space-y-4">
        {addresses.length > 0 &&
          addresses.map((item, index) => (
            <label
              key={index}
              className="flex items-start border rounded-xl p-4 hover:shadow-md transition cursor-pointer"
            >
              {/* Radio Input */}
              <input
                type="radio"
                value={item.label}
                name="selectedAddress"
                className="mt-1 h-5 w-5 text-indigo-600 focus:ring-indigo-500"
              />

              {/* Address Content */}
              <div className="ml-4 flex-1">
                <h2 className="text-lg font-semibold text-gray-900">
                  {item.label}
                  <span className="ml-2 inline-block px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full">
                    Choose This Address
                  </span>
                </h2>

                <ul className="mt-2 text-gray-700 space-y-1">
                  <li>
                    <span className="font-medium">Country:</span> {item.country}
                  </li>
                  <li>
                    <span className="font-medium">City:</span> {item.city}
                  </li>
                  <li>
                    <span className="font-medium">Postal Code:</span>{" "}
                    {item.postalCode}
                  </li>
                  <li>
                    <span className="font-medium">Street:</span> {item.street}
                  </li>
                </ul>
              </div>
            </label>
          ))}
        <button
          onClick={(e) => {
            e.preventDefault();
            setAddNewAddress(true);
          }}
          className="font-semibold cursor-pointer bg-indigo-50 px-3 py-1 text-sm rounded-2xl text-indigo-600 bg focus:ring-indigo-500"
        >
          Add new address
        </button>
      </div>
    </section>
  );
}

export default SelectExistAddresses;
