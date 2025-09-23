import React, { useState } from "react";
import { useUser } from "../UserContext";

export const Feild = ({ name, placeholder, value, onchange }) => {
  return (
    <input
      required
      type="text"
      name={name}
      onChange={onchange}
      value={value}
      placeholder={placeholder}
      className="border-[2px] border-gray-300 p-3 $ rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none w-full mb-4"
    />
  );
};

function CreateAddressesFromCart({ setAddNewAddress, addNewAddress }) {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const countries = [
    {
      country: "US",
      phone: "+1",
      cities: ["New York", "Los Angeles", "Chicago", "San Francisco"],
    },
    {
      country: "Egypt",
      phone: "+20",
      cities: ["Cairo", "Alexandria", "Giza", "Luxor"],
    },
    {
      country: "Saudi Arabia",
      phone: "+966",
      cities: ["Riyadh", "Jeddah", "Dammam", "Mecca"],
    },
    {
      country: "UAE",
      phone: "+971",
      cities: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman"],
    },
    {
      country: "UK",
      phone: "+44",
      cities: ["London", "Manchester", "Birmingham", "Liverpool"],
    },
    {
      country: "France",
      phone: "+33",
      cities: ["Paris", "Lyon", "Marseille", "Nice"],
    },
    {
      country: "Canada",
      phone: "+1",
      cities: ["Toronto", "Vancouver", "Montreal", "Ottawa"],
    },
  ];

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

      if (!res.ok) {
        alert(result.message || "Failed to add address");
      }
      setUserProfile(result.user);
    } catch (err) {
      console.error("Add address failed:", err);
    }
  };

  const cities =
    countries.find((e) => e.country === selectedCountry)?.cities || [];

  const phoneKey = countries.find((c) => c.country === selectedCountry)?.phone;

  return (
    <>
      {addNewAddress && (
        <div className="mb-6 m-6">
          <h1 className="font-bold text-xl mb-3">Add Address</h1>
          <form>
            <Feild
              value={address.label}
              name="label"
              placeholder="Address Label (Home, Office, etc.)"
              onchange={(e) =>
                setAddress({ ...address, [e.target.name]: e.target.value })
              }
            />

            <Feild
              value={address.street}
              name="street"
              placeholder="Street Address"
              onchange={(e) =>
                setAddress({ ...address, [e.target.name]: e.target.value })
              }
            />

            <select
              value={selectedCountry}
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                setAddress({ ...address, country: e.target.value, city: "" });
                setSelectedCity("");
              }}
              className="border-[2px] border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none w-full mb-4"
            >
              <option value="">Select Country</option>
              {countries.map((item, i) => (
                <option key={i} value={item.country}>
                  {item.country}
                </option>
              ))}
            </select>

            <select
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setAddress({ ...address, city: e.target.value });
              }}
              disabled={!selectedCountry}
              className="border-[2px] border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none w-full mb-4"
            >
              <option value="">Select City</option>
              {cities.map((city, i) => (
                <option key={i} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <Feild
              name="state"
              value={address.state}
              placeholder="State/Province"
              onchange={(e) =>
                setAddress({ ...address, [e.target.name]: e.target.value })
              }
            />

            <Feild
              name="postalCode"
              placeholder="ZIP/Postal Code"
              value={address.postalCode}
              onchange={(e) =>
                setAddress({ ...address, [e.target.name]: e.target.value })
              }
            />

            <div className="flex">
              <input
                disabled
                type="text"
                value={phoneKey}
                className="border-[2px] border-gray-300 p-3 w-16 rounded-tl-lg rounded-bl-lg focus:outline-none mb-4"
              />
              <Feild
                name="phone"
                phoneKey={phoneKey}
                placeholder="Phone Number"
                value={address.phone}
                onchange={(e) =>
                  setAddress({ ...address, [e.target.name]: e.target.value })
                }
              />
            </div>

            <button
              onClick={handleAddAddress}
              type="submit"
              className="mt-2 px-4  py-2 rounded-xl bg-black text-white font-semibold"
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
      )}
    </>
  );
}

export default CreateAddressesFromCart;
