import React, { useState } from "react";

export const Feild = ({ street, placeholder, onchange }) => {
  return (
    <input
      type="text"
      name={street}
      onChange={onchange}
      placeholder={placeholder}
      className="border-[2px] border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none w-full mb-4"
    />
  );
};

function SelectAddress() {
  const [address, setAddress] = useState({
    label: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    street: "",
    phone: "",
  });
  return (
    <div className="mb-6">
      <h1 className="font-bold text-xl mb-3">Add Address</h1>
      <form>
        <Feild
          value={address.label}
          name="label"
          placeholder="Address Label (Home, Office, etc.)"
          onchange={(e) =>
            setAddress(() => ({ ...address, [e.target.name]: e.target.value }))
          }
        />
        <Feild
          value={address.street}
          name="street"
          placeholder="Street Address"
          onchange={(e) =>
            setAddress(() => ({ ...address, [e.target.name]: e.target.value }))
          }
        />
        <Feild
          value={address.city}
          name="city"
          placeholder="City"
          onchange={(e) =>
            setAddress(() => ({ ...address, [e.target.name]: e.target.value }))
          }
        />
        <Feild
          name="state"
          value={address.state}
          placeholder="State/Province"
          onchange={(e) =>
            setAddress(() => ({ ...address, [e.target.name]: e.target.value }))
          }
        />
        <Feild
          name="zip"
          placeholder="ZIP/Postal Code"
          value={address.postalCode}
          onchange={(e) =>
            setAddress(() => ({ ...address, [e.target.name]: e.target.value }))
          }
        />
        <Feild
          name="country"
          placeholder="Country"
          value={address.country}
          onchange={(e) =>
            setAddress(() => ({ ...address, [e.target.name]: e.target.value }))
          }
        />
        <Feild
          name="phone"
          placeholder="Phone Number"
          value={address.phone}
          onchange={(e) =>
            setAddress(() => ({ ...address, [e.target.name]: e.target.value }))
          }
        />

        <button
          type="submit"
          className=" mt-2 px-4 py-2 rounded-xl bg-black text-white font-semibold hover:bg-blue-700 transition"
        >
          Save Address
        </button>
      </form>
    </div>
  );
}

export default SelectAddress;
