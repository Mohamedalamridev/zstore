import React, { useState } from "react";
import { useUser } from "../UserContext";

export const Feild = ({ name, placeholder, value, onchange }) => {
  return (
    <input
      type="text"
      name={name}
      onChange={onchange}
      value={value}
      placeholder={placeholder}
      className="border-[2px] border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none w-full mb-4"
    />
  );
};

function CreateAddressesFromCart({ setAddNewAddress, setAddresses }) {
  const { setUserProfile } = useUser();
  const [address, setAddress] = useState({
    label: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    street: "",
    phone: "",
  });

  const handleAddAddress = async (e) => {
    e.preventDefault();
    const baseUrl = import.meta.env.VITE_BASE_URL;

    try {
      const res = await fetch(`${baseUrl}/api/user/profile/address`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(address),
        credentials: "include",
      });
      const result = await res.json();
      console.log(result);

      if (res.ok) {
        setUserProfile(result.user);
      } else {
        alert(result.message || "Failed to add address");
      }
    } catch (err) {
      console.error("Add address failed:", err);
    }
  };

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
          name="postalCode"
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
          onClick={handleAddAddress}
          type="submit"
          className=" mt-2 px-4 py-2 rounded-xl bg-black text-white font-semibold hover:bg-blue-700 transition"
        >
          Save Address
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();

            setAddNewAddress(false);
          }}
          className="text-white font-bold py-2 px-4 ml-4 rounded-2xl bg-red-700"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default CreateAddressesFromCart;
