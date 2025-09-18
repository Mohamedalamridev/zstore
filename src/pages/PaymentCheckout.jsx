import React from "react";

function PaymobCheckout({ cartItems, totalAmount, userId }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const handleCheckout = async () => {
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
        body: JSON.stringify({ items: items, totalAmount, userId }),
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
      Checkout with Paymob
    </button>
  );
}

export default PaymobCheckout;
