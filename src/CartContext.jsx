import {
  Children,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

export const initialCart = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};
// Cart Reducer

const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      let itemIndex = state.cart.findIndex((e) => e.id === action.payload.id);

      if (itemIndex >= 0) {
        const updatedCart = [...state.cart];
        updatedCart[itemIndex] = {
          ...updatedCart[itemIndex],
          count: updatedCart[itemIndex].count + 1,
        };
        return {
          ...state,
          cart: updatedCart,
        };
      }

      return {
        ...state,
        cart: [...state.cart, { ...action.payload, count: 1 }],
      };
    }
    case "CLEAR_CART": {
      return { cart: [] };
    }

    case "REMOVE_ITEM": {
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        const updatedCart = [...state.cart];

        if (updatedCart[itemIndex].count > 1) {
          updatedCart[itemIndex] = {
            ...updatedCart[itemIndex],
            count: updatedCart[itemIndex].count - 1,
          };
        } else {
          updatedCart.splice(itemIndex, 1);
        }

        return {
          ...state,
          cart: updatedCart,
        };
      }

      return state;
    }
    default:
      return state;
  }
};

// Cart Context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);
