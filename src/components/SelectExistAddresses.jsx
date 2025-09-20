import React, { useState } from "react";
import { useUser } from "../UserContext";

function SelectExistAddresses({ setAddNewAddress, setSelectedAddress }) {
  const { userProfile } = useUser();

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
        {userProfile.addresses.length > 0 &&
          userProfile.addresses.map((item, index) => (
            <label
              key={index}
              className="flex items-start border rounded-xl p-2 hover:shadow-md transition cursor-pointer"
            >
              {/* Radio Input */}
              <input
                onChange={() => setSelectedAddress(item)}
                type="radio"
                value={item.label}
                name="selectedAddress"
                className="mt-1 h-5 w-5 text-indigo-600 focus:ring-indigo-500"
              />

              {/* Address Content */}
              <div className=" ml-2 flex-1">
                <h2 className="text-lg font-semibold text-gray-900">
                  {item.label}
                  <span className="ml-2 inline-block px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full">
                    Choose This Address
                  </span>
                </h2>

                <ul className="mt-2 text-gray-700 space-y-1">
                  <li>
                    <span className="font-medium text-xm">Country:</span>{" "}
                    {item.country}
                  </li>
                  <li>
                    <span className="font-medium text-xm">City:</span>{" "}
                    {item.city}
                  </li>
                  <li>
                    <span className="font-medium text-xm">Postal Code:</span>{" "}
                    {item.postalCode}
                  </li>
                  <li>
                    <span className="font-medium text-xm">Street:</span>{" "}
                    {item.street}
                  </li>
                </ul>
              </div>
            </label>
          ))}

        <span
          onClick={() => setAddNewAddress(true)}
          className="cursor-pointer bg-indigo-100 text-indigo-700 py-1 px-2 rounded-lg text-lg"
        >
          Or add a new address
        </span>
      </div>
    </section>
  );
}

export default SelectExistAddresses;
