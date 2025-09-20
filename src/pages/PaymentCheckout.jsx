import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useUser } from "../UserContext";

function PaymobCheckout({ cartItems, totalAmount, userId, address }) {
  const { state } = useUser();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const handleCheckout = async () => {
    if (Object.keys(address).length === 0) {
      Swal.fire("please select an address");
      return;
    }
    const items = cartItems.map((item) => {
      return {
        name: item.title,
        amount_cents: String(item.price * 100),
        description: item?.info,
        quantity: String(item.count),
      };
    });
    try {
      const res = await fetch(`${baseUrl}/api/payment/checkout`, {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        credentials: "include",
        body: JSON.stringify({ items: items, totalAmount, userId, address }),
      });

      const data = await res.json();
      if (data.url) window.open(data.url, "_blank");
      else alert("Payment failed");
    } catch (err) {
      console.error(err);
      alert("Payment error");
    }
  };

  return (
    <>
      {state.isLogged ? (
        <button
          onClick={handleCheckout}
          className="w-full mt-6 py-3 rounded-xl bg-black text-white font-semibold hover:bg-blue-700 transition"
        >
          Check Out
        </button>
      ) : (
        <Link to="/login">login</Link>
      )}
    </>
  );
}

export default PaymobCheckout;
