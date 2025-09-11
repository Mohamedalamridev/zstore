import React, { useMemo } from "react";
import Navbar from "../components/Navbar";
import Item from "../components/Item";
import { useCart } from "../CartContext";

function Cart() {
  const { state } = useCart();
  console.log(state);

  const { subTotal, discount, total } = useMemo(() => {
    const subTotal = state.cart.reduce(
      (sum, item) => sum + +item.price * item.count,
      0
    );
    const discount = state.cart.reduce((sum, item) => {
      return (sum + item.discount) * item.count;
    }, 0);

    const total = subTotal - discount;
    return { subTotal, discount, total };
  }, [state.cart]);

  return (
    <>
      <Navbar />

      <section>
        {state.cart.length > 0 ? (
          <div className="xl:px-24 lg:p-6 p-4 lg:px-10 py-16 border-t border-gray-200">
            <h1 className="uppercase pb-8 text-3xl font-black">Your cart</h1>

            <div className="container gap-10 flex flex-col lg:flex-row">
              {/* Items */}
              <div className="items border-2 border-gray-200 rounded-3xl lg:p-5 p-4 flex-2 gap-4 flex flex-col">
                {state.cart.map((item) => (
                  <Item
                    id={item.id}
                    img={item.img}
                    title={item.title}
                    price={+item.price}
                    count={item.count}
                    discount={discount}
                  />
                ))}
              </div>

              {/* Order Summary */}
              <div className="check flex-1 border-2 border-gray-200 p-8 rounded-3xl h-fit">
                <h1 className="text-2xl font-bold mb-6">Order Summary</h1>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2>Sub Total</h2>
                    <span className="font-medium">${subTotal}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <h2>Discount</h2>
                    <span className="text-red-600 font-semibold">
                      - ${discount}
                    </span>
                  </div>
                  <hr />
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Total</h2>
                    <span className="text-xl font-bold">${total}</span>
                  </div>
                </div>

                <button className="w-full mt-6 py-3 rounded-xl bg-black text-white font-semibold hover:bg-blue-700 transition">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <h1 className="text-center py-24 font-semibold text-2xl">
            Your Cart Is Empty
          </h1>
        )}
      </section>
    </>
  );
}

export default Cart;
