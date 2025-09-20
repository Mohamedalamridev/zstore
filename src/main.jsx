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
import Dashboard from "./pages/Dashboard.jsx";
import ProductAdmin from "./pages/ProductAdmin.jsx";
import AddProduct from "./components/AddProduct.jsx";
import EditProduct from "./pages/EditProduct.jsx";
import Orders from "./pages/Orders.jsx";

export const ProtecedRoute = ({ children }) => {
  const { state, userProfile } = useUser();
  if (state.isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }
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
  {
    path: "/dashboard-98568348",
    element: <Dashboard />,
    children: [
      {
        path: "all_products",
        index: true,
        element: <ProductAdmin />,
      },

      {
        path: "add_product",
        element: <AddProduct />,
      },

      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "edit_product/:id",
        element: <EditProduct />,
      },
    ],
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
