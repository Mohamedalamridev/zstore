import React, { useEffect } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useCart } from "../CartContext";

function PaymentSuccess() {
  const { dispatch } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const success = query.get("success");
  useEffect(() => {
    if (!success) {
      navigate("/");
    }
  }, [success, navigate]);
  if (success === "true") {
    dispatch({ type: "CLEAR_CART" });
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white shadow-lg rounded-2xl p-10 text-center max-w-md">
          <CheckCircle className="mx-auto text-green-500 w-16 h-16 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Successful 🎉
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you! Your payment has been completed successfully.
          </p>
          <Link
            to="/"
            className="inline-block bg-green-500 text-white px-6 py-3 rounded-xl shadow hover:bg-green-600 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }
  if (success === "false") {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">❌ Payment Failed</h1>
        <p className="mb-6">Something went wrong. Please try again.</p>
      </div>
    );
  }
}

export default PaymentSuccess;
