import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./CartContext.jsx";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import SingleProduct from "./pages/SingleProduct.jsx";
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
    path: "/single",
    element: <SingleProduct />,
  },
]);

createRoot(document.getElementById("root")).render(
  <CartProvider>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </CartProvider>
);
