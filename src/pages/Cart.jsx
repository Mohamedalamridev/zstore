import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Item from "../components/Item";
import { useCart } from "../CartContext";
import { MdCleaningServices } from "react-icons/md";
import { useUser } from "../UserContext";
import PaymobCheckout from "./PaymentCheckout";
import CreateAddressesFromCart from "../components/CreateAddressesFromCart";
import SelectExistAddresses from "../components/SelectExistAddresses";

function Cart() {
  const [showAddNewAddress, setAddNewAddress] = useState(true);

  const { state, dispatch } = useCart();
  const { state: userState } = useUser();
  const addresses = userState.profile?.user?.addresses ?? [];

  const { subTotal, discount, total } = useMemo(() => {
    const subTotal = state.cart.reduce(
      (sum, item) => sum + +item.price * item.count,
      0
    );
    const discount = state.cart.reduce(
      (sum, item) => sum + (item.discount || 0) * item.count,
      0
    );
    return { subTotal, discount, total: subTotal - discount };
  }, [state.cart]);

  const handleAddress = () => {
    if (userState.isLogged && addresses.length <= 0) {
      return <CreateAddressesFromCart setAddNewAddress={setAddNewAddress} />;
    }
    if (userState.isLogged && showAddNewAddress) {
      return (
        <>
          <SelectExistAddresses
            addresses={addresses}
            setAddNewAddress={setAddNewAddress}
          />
          <CreateAddressesFromCart setAddNewAddress={setAddNewAddress} />
        </>
      );
    }
    if (userState.isLogged && !showAddNewAddress) {
      return (
        <SelectExistAddresses
          addresses={addresses}
          setAddNewAddress={setAddNewAddress}
        />
      );
    }
    return <span>Login to add delivary information</span>;
  };

  const baseUrl = import.meta.env.VITE_BASE_URL;

  return (
    <>
      <Navbar />
      <section>
        {state.cart.length > 0 ? (
          <div className="xl:px-24 lg:px-10 p-4 border-t border-gray-200">
            <h1 className="uppercase text-3xl font-bold px-4">Your cart</h1>
            <span
              className="font-black text-4xl p-5 flex"
              onClick={() => dispatch({ type: "CLEAR_CART" })}
            >
              <MdCleaningServices className="ml-auto" />
            </span>

            <div className="container gap-8 flex flex-col lg:flex-row">
              <div className="items border-2 max-h-fit border-gray-200 rounded-3xl lg:p-5 p-3 flex-2 gap-4 flex flex-col">
                {state.cart.map((item) => (
                  <Item
                    key={item.id}
                    id={item.id}
                    img={item.img}
                    title={item.title}
                    info={item.info}
                    price={+item.price}
                    count={item.count}
                    discount={item.discount}
                  />
                ))}
              </div>

              <div className="check flex-1 border-2 border-gray-200 p-8 rounded-3xl h-fit">
                {handleAddress()}
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

                {userState.isLogged ? (
                  <PaymobCheckout
                    cartItems={state.cart}
                    totalAmount={total}
                    userId={userState.profile.user?._id}
                  />
                ) : (
                  <button className="w-full mt-6 py-3 rounded-xl bg-gray-600 text-white font-semibold cursor-not-allowed">
                    Login to Checkout
                  </button>
                )}
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
