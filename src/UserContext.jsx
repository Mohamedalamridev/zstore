import { createContext, useContext, useEffect, useReducer } from "react";

const initialUser = {
  isLogged: false,
  profile: null,
};
const baseUrl = import.meta.env.VITE_BASE_URL;
const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,

        isLogged: true,
        profile: action.payload,
      };
    case "LOGOUT":
      return { ...state, isLogged: false, profile: null };
    default:
      return state;
  }
};

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
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

          dispatch({
            type: "LOGIN",
            payload: {
              user: data.user,
              orders: data.orders,
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
    <UserContext.Provider value={{ state, dispatch, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
