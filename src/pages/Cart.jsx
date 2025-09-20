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

function Cart() {
  const [addNewAddress, setAddNewAddress] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState({});
  const { state, dispatch } = useCart();
  const { state: userState, userProfile } = useUser();
  const addresses = userProfile?.addresses ?? [];
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
                  <hr />
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Total</h2>
                    <span className="text-xl font-bold">${total}</span>
                  </div>
                </div>

                {userState.isLogged ? (
                  <PaymobCheckout
                    address={selectedAddress}
                    cartItems={state.cart}
                    totalAmount={total}
                    userId={userState.profile.user?._id}
                  />
                ) : userState.isLogged ? (
                  <button className="w-full mt-6 py-3 rounded-x text-white font-semibold cursor-not-allowed">
                    Checkout
                  </button>
                ) : (
                  <Link
                    className="flex py-3 rounded-x  m-6 font-semibold rounded-2xl justify-center cursor-pointer bg-black text-white"
                    to={"/login"}
                  >
                    {" "}
                    Login to Checkout
                  </Link>
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
