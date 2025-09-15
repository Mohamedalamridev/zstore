import React from "react";
import { useUser } from "../UserContext.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { Link } from "react-router-dom";
import { useState } from "react";

const Feild = ({
  label,
  value,
  onchange,
  defaultValue,
  disabled = false,
  runValidate,
}) => {
  return (
    <div className="flex flex-col">
      <label className="mt-3 mb-1 text-lg text-gray-600">{label}</label>
      <input
        type="text"
        className={`${
          runValidate && value.trim() === ""
            ? "border-red-500"
            : value.trim() == "" && !runValidate
            ? "border-gray-600"
            : value.trim() !== "" && "border-green-600"
        } bg-gray-100 p-3 rounded-md shadow-sm border border-gray-300 ${
          disabled ? "text-gray-500 cursor-not-allowed" : ""
        }`}
        value={value || ""}
        onChange={onchange}
        defaultValue={defaultValue}
        disabled={disabled}
      />
      {runValidate && value.trim() === "" && (
        <span className="text-red-600 text-sm mt-1">This Feild Is Require</span>
      )}
    </div>
  );
};

function Profile() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [address, setAddress] = useState({
    label: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    street: "",
    phone: "",
  });

  const [showAddAddress, setShowAddAddress] = useState(false);
  const [runValidate, setRunValidate] = useState(false);
  const { state } = useUser();
  const user = state.profile?.user;
  const orders = state.profile?.orders;
  const addresses = user.addresses;
  console.log(state.isLogged);

  const validate = (data) => {
    const isValid = Object.values(data).every(
      (item) => item && item.trim() !== ""
    );
    setRunValidate(!isValid);

    return isValid;
  };

  const handleDelete = async (id) => {
    const res = await fetch(`${baseUrl}/api/user/profile/address/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "Application/json",
      },
      credentials: "include",
    });
    const result = await res.json();
    console.log(result);
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    const isValid = validate(address);
    if (!isValid) {
      return;
    }
    const res = await fetch(`${baseUrl}/api/user/profile/address`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
      credentials: "include",
    });
    const result = await res.json();
    console.log(result);
    setShowAddAddress(false);
    setAddress({
      label: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      street: "",
      phone: "",
    });
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen p-4 md:p-8 bg-gray-50">
        {/* Profile Card */}
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            User Profile
          </h1>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Feild label="Your Name" value={user?.name} disabled={true} />
            <Feild label="Email" value={user?.email} disabled={true} />
          </form>

          {/* Addresses Section */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Addresses</h2>
              <button
                onClick={() => setShowAddAddress(!showAddAddress)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                {showAddAddress ? "Cancel" : "Add New Address"}
              </button>
            </div>

            {/* Add New Address Form */}
            {showAddAddress && (
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-4">
                  Add New Address
                </h3>
                <form
                  onSubmit={handleAddAddress}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <Feild
                    label="Label"
                    runValidate={runValidate}
                    value={address.label}
                    onchange={(e) =>
                      setAddress({ ...address, label: e.target.value })
                    }
                  />
                  <Feild
                    label="City"
                    runValidate={runValidate}
                    value={address.city}
                    onchange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                  />
                  <Feild
                    label="State"
                    runValidate={runValidate}
                    value={address.state}
                    onchange={(e) =>
                      setAddress({ ...address, state: e.target.value })
                    }
                  />
                  <Feild
                    label="Country"
                    runValidate={runValidate}
                    value={address.country}
                    onchange={(e) =>
                      setAddress({ ...address, country: e.target.value })
                    }
                  />
                  <Feild
                    label="Postal Code"
                    runValidate={runValidate}
                    value={address.postalCode}
                    onchange={(e) =>
                      setAddress({ ...address, postalCode: e.target.value })
                    }
                  />
                  <Feild
                    label="Street"
                    runValidate={runValidate}
                    value={address.street}
                    onchange={(e) =>
                      setAddress({ ...address, street: e.target.value })
                    }
                  />
                  <Feild
                    label="Phone"
                    runValidate={runValidate}
                    value={address.phone}
                    onchange={(e) =>
                      setAddress({ ...address, phone: e.target.value })
                    }
                  />
                  <div className="md:col-span-2 flex justify-end space-x-3 mt-4">
                    <button
                      type="button"
                      onClick={() => setShowAddAddress(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Existing Addresses */}
            <div className="space-y-6">
              {addresses.length > 0
                ? addresses.map((item) => (
                    <div
                      key={item?._id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-medium text-gray-800">
                          {item?.label}
                        </h3>
                        <button
                          onClick={() => handleDelete(item?._id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-600">
                        <p>
                          <span className="font-medium">Street:</span>{" "}
                          {item?.street}
                        </p>
                        <p>
                          <span className="font-medium">City:</span>{" "}
                          {item?.city}
                        </p>
                        <p>
                          <span className="font-medium">State:</span>{" "}
                          {item?.state}
                        </p>
                        <p>
                          <span className="font-medium">Country:</span>{" "}
                          {item?.country}
                        </p>
                        <p>
                          <span className="font-medium">Postal Code:</span>{" "}
                          {item?.postalCode}
                        </p>
                        <p>
                          <span className="font-medium">Phone:</span>{" "}
                          {item?.phone}
                        </p>
                      </div>
                    </div>
                  ))
                : !showAddAddress && (
                    <div className="text-center py-8 text-gray-500">
                      <p>No addresses saved yet.</p>
                    </div>
                  )}
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h2>
          {orders && orders.length > 0 ? (
            orders.map((item, i) => (
              <div
                key={i}
                className="bg-white shadow-md rounded-2xl p-6 mb-6 border border-gray-200"
              >
                <div className="flex justify-between items-center mb-4">
                  <h1 className="font-semibold text-lg text-gray-800">
                    Order ID:{" "}
                    <span className="text-indigo-600 font-bold">
                      {item.paymobOrderId}
                    </span>
                  </h1>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      item.paymentStatus === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.paymentStatus}
                  </span>
                </div>
                <h3 className="text-gray-700 font-medium mb-2">
                  Total Amount:{" "}
                  <span className="text-indigo-700 font-bold">
                    EGP {item.amount}
                  </span>
                </h3>
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Items:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {item.items.map((product, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center bg-gray-50 rounded-lg p-3"
                      >
                        <span className="font-medium text-gray-700">
                          {product.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          x {product.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white shadow-md rounded-2xl p-8 text-center">
              <p className="text-gray-500 mb-4">No orders found.</p>
              <Link
                to="/"
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Browse Products
              </Link>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Profile;
