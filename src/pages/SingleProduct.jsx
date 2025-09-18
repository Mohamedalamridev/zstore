import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Reviews from "../components/Reviews";
import Quantity from "../components/Quantity";
import { useParams } from "react-router-dom";
import { MdAddShoppingCart } from "react-icons/md";
import { useCart } from "../CartContext";
import Footer from "../components/Footer";

const baseUrl = import.meta.env.VITE_BASE_URL;

function SingleProduct() {
  const { state, dispatch } = useCart();
  const [currentImg, setCurrentImg] = useState(null);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const isAdded = state.cart.some((item) => item.id === id);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/products/${id}`, {
          credentials: "include",
        });
        const data = await res.json();
        setProduct(data.product);

        if (data.product?.imgs?.length > 0) {
          setCurrentImg(data.product.imgs[0]);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <main className="w-full min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-500">Loading product...</p>
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <main className="w-full min-h-screen bg-gray-50">
        <section className="max-w-7xl mx-auto py-12 px-4 lg:px-8 grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Side Thumbnails */}
            <div className="flex lg:flex-col gap-4 lg:w-28">
              {product.imgs?.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`preview-${i}`}
                  className={`w-20 h-20 object-cover rounded-xl cursor-pointer transition border-2 ${
                    currentImg === src
                      ? "border-black"
                      : "border-transparent hover:border-gray-400"
                  }`}
                  onClick={() => setCurrentImg(src)}
                />
              ))}
            </div>
            {/* Main Image */}
            <div className="flex-1">
              <img
                src={currentImg}
                alt="main preview"
                className="w-full rounded-2xl h-[500px] shadow-md"
              />
            </div>
          </div>

          {/* Product Content */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl lg:text-5xl font-semibold text-gray-900">
                {product.title}
              </h1>

              {/* Price */}
              <div className="mt-4">
                <span className="text-3xl font-bold text-black">
                  ${product.price}
                </span>
                {product.oldPrice && (
                  <span className="line-through text-gray-400 text-lg ml-3">
                    ${product.oldPrice}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 mt-6 border-b border-gray-200 pb-6 leading-relaxed">
                {product.desc}
              </p>
            </div>

            {/* Add to Cart Section */}
            <div className="mt-8">
              {!isAdded ? (
                <button
                  onClick={() =>
                    dispatch({
                      type: "ADD_TO_CART",
                      payload: {
                        id: product._id,
                        title: product.title,
                        img: product.imgs[0],
                        price: product.price,
                        discount: product.oldPrice - product.price,
                        count: product.count,
                        info: product.moreInfo,
                      },
                    })
                  }
                  className="w-full flex items-center justify-center gap-3 bg-black text-white px-6 py-3 rounded-xl text-lg font-medium shadow-md hover:bg-gray-800 transition"
                >
                  <MdAddShoppingCart className="text-xl" />
                  Add to Cart
                </button>
              ) : (
                <Quantity
                  id={product._id}
                  img={product.imgs[0]}
                  title={product.title}
                  price={product.price}
                  discount={product.oldPrice - product.price}
                />
              )}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="max-w-7xl mx-auto px-4 lg:px-8 py-12 border-t border-gray-200">
          <Reviews />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SingleProduct;
