import React, { useEffect } from "react";
import { useUser } from "../UserContext";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export const Feild = ({ name, value, placeholder, onChange }) => {
  return (
    <div className="flex flex-col">
      <label className=" mt-3 mb-1 text-lg text-gray-600">{name}</label>
      <input
        placeholder={placeholder}
        type="text"
        className="bg-white p-3 rounded-md shadow-sm border-[1px] border-gray-300"
        name={name || ""}
        value={value || ""}
        onChange={onChange}
      />
    </div>
  );
};

function Address() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const { state } = useUser();
  const { profile } = state;
  const addresses = profile?.user?.addresses;
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    label: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const fetchAddress = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${baseUrl}/api/user/address`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(address),
        credentials: "include",
      });
      if (res.ok) {
        navigate("/profile");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <section className="bg-slate-50 min-h-screen p-8">
        <form className="p-8 bg-white grid grid-cols-2 gap-2">
          <Feild
            onChange={(e) => setAddress({ ...address, label: e.target.value })}
            name="label"
            value={address.label}
            placeholder="Home, Work, Office..."
          />

          <Feild
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            name="city"
            value={address.city}
            placeholder="Enter your city"
          />
          <Feild
            onChange={(e) =>
              setAddress({ ...address, postalCode: e.target.value })
            }
            name="postalCode"
            value={address.postalCode}
            placeholder="e.g. 12345"
          />
          <Feild
            onChange={(e) => setAddress({ ...address, phone: e.target.value })}
            name="phone"
            value={address.phone}
            placeholder="e.g. +20 10 123 4567"
          />

          <Feild
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
            name="street"
            value={address.street}
            placeholder="Street name, building no."
          />

          <Feild
            onChange={(e) => setAddress({ ...address, state: e.target.value })}
            name="state"
            value={address.state}
            placeholder="Street name, building no."
          />

          <Feild
            onChange={(e) =>
              setAddress({ ...address, country: e.target.value })
            }
            name="country"
            value={address.country}
            placeholder="Street name, building no."
          />
        </form>

        <button
          onClick={fetchAddress}
          className="bg-black w-full text-white p-3 my-2 rounded-2xl"
        >
          Save
        </button>
      </section>
      <Footer />
    </>
  );
}

export default Address;
