import React, { useEffect } from "react";
import { useUser } from "../UserContext.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
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
// export function Feild({ label, value, type }) {
//   return (
//     <div className="mb-4">
//       <label className="block mb-1 font-semibold text-gray-700">{label}</label>
//       <input
//         type={type}
//         value={value || ""}
//         readOnly
//         className="p-3 rounded-xl w-full bg-gray-100 text-gray-700 border border-gray-300 focus:outline-none"
//       />
//     </div>
//   );
// }

function Profile() {
  const { state, dispatch } = useUser();

  const user = state.profile?.user;
  const profile = state.profile?.profile;
  console.log(user?.addresses);
  const addresses = user?.addresses;
  const orders = state.profile?.orders;

  return (
    <>
      <Navbar />
      <section className="min-h-screen p-8 bg-gray-50">
        {/* Profile Card */}
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            User Profile
          </h1>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Feild label="Your Name" value={user?.name} type="text" />
            <Feild label="Email" value={user?.email} type="email" />
          </form>
          <form className="">
            {addresses.length > 0 &&
              addresses &&
              addresses.map((item, idx) => {
                return <Feild label="Label" value={item?.label} />;
              })}
          </form>
        </div>
        <div>
          <form className="m-5">
            {/* {addresses.length > 0 &&
              addresses &&
              addresses.map((item, i) => {
                return <Feild />;
              })} */}
          </form>
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
            <p className="text-gray-500 text-center">No orders found.</p>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Profile;
