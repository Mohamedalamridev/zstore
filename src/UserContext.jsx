import { useState } from "react";
import { createContext, useContext, useEffect, useReducer } from "react";

const initialUser = {
  isLogged: false,
  profile: null,
  isLoading: true,
};

const baseUrl = import.meta.env.VITE_BASE_URL;
const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoading: false,
        isLogged: true,
        profile: action.payload,
      };

    case "UPDATE_PROFILE":
      return {
        ...state,
        profile: {
          ...state.profile,
          addresses: action.payload,
        },
      };

    case "LOGOUT":
      return { ...state.profile, isLogged: false, profile: null };
    default:
      return state;
  }
};

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [orders, setOrders] = useState(null);
  const [state, dispatch] = useReducer(userReducer, initialUser);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/user/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUserProfile(data.user);
          console.log("data from context", data);

          setOrders(data.orders);

          dispatch({
            type: "LOGIN",
            payload: {
              user: data.user,
              orders: data.orders,
              profile: data.profile,
            },
          });
        }
      } catch (err) {
        console.log("No user logged in");
      }
    };

    fetchProfile();
  }, []);

  const logout = async () => {
    try {
      await fetch(`${baseUrl}/api/user/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.log(err);
    }

    dispatch({ type: "LOGOUT" });
  };

  return (
    <UserContext.Provider
      value={{ state, dispatch, logout, userProfile, orders, setUserProfile }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
