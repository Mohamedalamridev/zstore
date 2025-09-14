import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./CartContext.jsx";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import SingleProduct from "./pages/SingleProduct.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import { UserProvider, useUser } from "./UserContext.jsx";
import Profile from "./pages/Profile.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import Address from "./pages/Address.jsx";
export const ProtecedRoute = ({ children }) => {
  const { state } = useUser();

  return state.isLogged ? children : <Navigate to="/login" replace />;
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/product_details/:id",
    element: <SingleProduct />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/address",
    element: <Address />,
  },
  {
    path: "/profile",
    element: (
      <ProtecedRoute>
        <Profile />,
      </ProtecedRoute>
    ),
  },
  {
    path: "/success",
    element: <PaymentSuccess />,
  },
]);

createRoot(document.getElementById("root")).render(
  <UserProvider>
    <CartProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </CartProvider>
  </UserProvider>
);
