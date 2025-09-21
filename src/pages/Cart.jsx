import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Item from "../components/Item";
import { useCart } from "../CartContext";
import { MdCleaningServices } from "react-icons/md";
import { useUser } from "../UserContext";
import PaymobCheckout from "./PaymentCheckout";
import CreateAddressesFromCart from "../components/CreateAddressesFromCart";
import SelectExistAddresses from "../components/SelectExistAddresses";
import { Link } from "react-router-dom";
import { LuTruck } from "react-icons/lu";
function Cart() {
  const [addNewAddress, setAddNewAddress] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState({});
  const { state, dispatch } = useCart();
  const { state: userState, userProfile } = useUser();
  const addresses = userProfile?.addresses ?? [];
  const delivety = 30;
  const { subTotal, discount, total } = useMemo(() => {
    const subTotal = state.cart.reduce(
      (sum, item) => sum + +item.price * item.count,
      0
    );
    const discount = state.cart.reduce(
      (sum, item) => sum + (item.discount || 0) * item.count,
      0
    );
    return { subTotal, discount, total: subTotal - discount + delivety };
  }, [state.cart]);

  const handleAddress = () => {
    if (!userState.isLogged) {
      return <span>Login to add delivery information</span>;
    }

    if (addresses.length === 0) {
      return (
        <CreateAddressesFromCart
          addNewAddress={addNewAddress}
          setAddNewAddress={setAddNewAddress}
        />
      );
    }

    if (addNewAddress) {
      return (
        <>
          <SelectExistAddresses
            setSelectedAddress={setSelectedAddress}
            setAddNewAddress={setAddNewAddress}
          />
          <CreateAddressesFromCart
            addNewAddress={addNewAddress}
            setAddNewAddress={setAddNewAddress}
          />
        </>
      );
    }
    if (!addNewAddress && addresses.length !== 0) {
      return (
        <SelectExistAddresses
          setSelectedAddress={setSelectedAddress}
          setAddNewAddress={setAddNewAddress}
        />
      );
    }

    return (
      <SelectExistAddresses
        setSelectedAddress={setSelectedAddress}
        setAddNewAddress={setAddNewAddress}
      />
    );
  };

  const baseUrl = import.meta.env.VITE_BASE_URL;
  function getEstimatedDelivery(processingDays, shippingDays, extraDays = 4) {
    const now = Date.now();
    const totalDays = processingDays + shippingDays;

    const from = new Date(now + totalDays * 24 * 60 * 60 * 1000);
    const to = new Date(now + (totalDays + extraDays) * 24 * 60 * 60 * 1000);

    return { from, to };
  }
  const options = { day: "numeric", month: "long", year: "numeric" };
  const { from, to } = getEstimatedDelivery(2, 10);
  const deliveryDate = `From ${new Date(from).toLocaleDateString(
    "en-GB",
    options
  )} 
  To ${new Date(to).toLocaleDateString("en-GB", options)}`;
  return (
    <>
      <Navbar />
      <section>
        {state.cart.length > 0 ? (
          <div className="xl:px-24 lg:px-10 p-2 md:p-4 border-t border-gray-200">
            <h1 className="uppercase text-3xl font-bold px-4">Your cart</h1>
            <span
              className="p-5 flex items-center gap-2 text-red-500 cursor-pointer"
              onClick={() => dispatch({ type: "CLEAR_CART" })}
            >
              <MdCleaningServices className="ml-auto font-black text-2xl " />
              <span className="font-semibold text-lg">Clear</span>
            </span>

            <div className="container gap-8 flex flex-col lg:flex-row">
              <div className="items border-2 max-h-fit border-gray-200 rounded-3xl lg:p-5 p-3 flex-2 gap-4 flex flex-col">
                {state.cart.map((item) => (
                  <Item
                    key={item.id}
                    color={item.color}
                    size={item.size}
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

              <div className="check flex-1 h-fit">
                {handleAddress()}
                <h1 className="text-2xl font-bold mb-6 text-center">
                  Order Summary
                </h1>

                {/* Delivery Date */}
                <div className="flex items-center gap-3 bg-green-50 border border-green-200 p-3 rounded-xl mb-4">
                  <LuTruck className="text-green-600 text-2xl" />
                  <div>
                    <h2 className="font-semibold text-gray-700">
                      Estimated Delivery
                    </h2>
                    <span className="block text-green-700 font-medium">
                      {deliveryDate}
                    </span>
                    <span className="text-xs text-gray-500 italic">
                      International Shipping
                    </span>
                  </div>
                </div>

                {/* Summary */}
                <div className="space-y-4 mx-6">
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
                  <div className="flex justify-between items-center">
                    <h2>Delivery</h2>
                    <span>${delivety}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Total</h2>
                    <span className="text-xl font-bold">${total}</span>
                  </div>
                </div>

                {/* Checkout Section */}
                <div className="mx-6 mt-6">
                  {userState.isLogged ? (
                    <PaymobCheckout
                      address={selectedAddress}
                      cartItems={state.cart}
                      totalAmount={total}
                      shippingFee={30}
                      deliveryDateFrom={from}
                      deliveryDateTo={to}
                    />
                  ) : (
                    <Link
                      className="flex items-center justify-center gap-2 py-3 px-6 bg-black text-white rounded-xl font-semibold hover:bg-gray-900 transition"
                      to="/login"
                    >
                      <span>Login to Checkout</span>
                    </Link>
                  )}
                </div>
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
