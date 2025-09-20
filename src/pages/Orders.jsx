import React, { useEffect, useState } from "react";

function Orders() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/orders`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const result = await response.json();
        console.log(result.orders);
        setOrders(result.orders);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllOrders();
  }, []);
  return (
    <section className="bg-sky-50 p-4">
      <div className="container grid grid-cols-2 gap-4">
        {orders && orders.length > 0 ? (
          orders.map((order, i) => {
            return (
              <div key={i} className="bg-white shadow-md p-6 rounded-2xl">
                <h1 className="font-bold text-xl text-blue-600 mb-3 border-b-2 border-gray-400 pb-4">
                  Order ID: {order.paymobOrderId}
                </h1>
                <span className="text-gray-500 my-2 block">
                  Date: {new Date(order.createdAt).toLocaleDateString()}
                </span>
                <span className="text-2xl font-bold">
                  Status: {order.status}
                </span>
                <div>
                  <span className="font-bold text-2xl mb-3 block">Items: </span>
                  {order.items.map((item) => {
                    return (
                      <div className="mb-3 pb-3 border-b-2 border-gray-200">
                        <h1>
                          {" "}
                          <span className="font-bold mr-2">Name:</span>{" "}
                          {item.name}
                        </h1>
                        <h2>
                          <span className="font-bold text-gray-500">
                            Quantity:
                          </span>{" "}
                          {item.quantity}x
                        </h2>
                      </div>
                    );
                  })}
                  <h1 className="font-semibold text-2xl text-gray-800">
                    Total Amount: ${order.totalAmount}
                  </h1>
                </div>
                {/* Delivary To: {orders.address.map((item) => {})} */}
              </div>
            );
          })
        ) : (
          <h1 className="text-2xl text-center">No orders found</h1>
        )}
      </div>
    </section>
  );
}

export default Orders;
