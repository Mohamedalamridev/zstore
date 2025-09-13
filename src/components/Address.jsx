import React from "react";

function Address({ label, street, city, postalCode, country, phone }) {
  return (
    <form>
      <label className="block mb-1 font-semibold text-gray-700">
        Label: {label}
      </label>
      <input
        type="text"
        className="p-3 rounded-xl w-full bg-gray-100 text-gray-700 border border-gray-300 focus:outline-none"
        defaultValue={label || "NA"}
      />

      <label className="block mb-1 font-semibold text-gray-700">
        Street: {street}
      </label>
      <input
        type="text"
        className="p-3 rounded-xl w-full bg-gray-100 text-gray-700 border border-gray-300 focus:outline-none"
        defaultValue={street || "NA"}
      />

      <label className="block mb-1 font-semibold text-gray-700">
        City: {city}
      </label>
      <input
        type="text"
        className="p-3 rounded-xl w-full bg-gray-100 text-gray-700 border border-gray-300 focus:outline-none"
        defaultValue={city || "NA"}
      />

      <label className="block mb-1 font-semibold text-gray-700">
        PostalCode: {postalCode}
      </label>
      <input
        type="text"
        className="p-3 rounded-xl w-full bg-gray-100 text-gray-700 border border-gray-300 focus:outline-none"
        defaultValue={postalCode || "NA"}
      />

      <label className="block mb-1 font-semibold text-gray-700">
        Country: {country}
      </label>
      <input
        type="text"
        className="p-3 rounded-xl w-full bg-gray-100 text-gray-700 border border-gray-300 focus:outline-none"
        defaultValue={country || "NA"}
      />

      <label className="block mb-1 font-semibold text-gray-700">
        Phone: {phone}
      </label>
      <input type="text" defaultValue={phone || "NA"} />
    </form>
  );
}

export default Address;
