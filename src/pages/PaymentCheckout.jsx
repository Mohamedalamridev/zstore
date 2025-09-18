import React from "react";
import Swal from "sweetalert2";

function PaymobCheckout({ cartItems, totalAmount, userId, address }) {
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
    <button
      onClick={handleCheckout}
      className="w-full mt-6 py-3 rounded-xl bg-black text-white font-semibold hover:bg-blue-700 transition"
    >
      Checkout
    </button>
  );
}

export default PaymobCheckout;
