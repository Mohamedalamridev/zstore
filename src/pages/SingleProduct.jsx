import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Reviews from "../components/Reviews";
import Newsletter from "../components/Newsletter";
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
        const res = await fetch(`${baseUrl}/api/product/${id}`);
        const data = await res.json();
        setProduct(data.product);
        console.log(data.product.title);

        if (data.product?.img?.length > 0) {
          setCurrentImg(data.product.img[0]);
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
      <main className="w-full min-h-screen">
        <Navbar />
        <section className="border-t-2 border-b-2 border-gray-200 product_details grid lg:grid-cols-2 gap-8 p-4 lg:p-24">
          {/* Images */}
          <div className="imgs flex gap-[10%]">
            <div className="side_imgs basis-[25%] flex flex-col justify-between gap-4">
              {product.img?.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`preview-${i}`}
                  className={`w-full h-[33%] rounded-2xl cursor-pointer ${
                    currentImg === src ? "border-2 border-black" : ""
                  }`}
                  onClick={() => setCurrentImg(src)}
                />
              ))}
            </div>
            <div className="preview_img basis-[75%]">
              <img
                src={currentImg}
                alt="main preview"
                className="max-w-full h-full rounded-2xl"
              />
            </div>
          </div>

          {/* Product Content */}
          <div className="content">
            <h1 className="name lg:text-4xl text-2xl font-medium">
              {product.title}
            </h1>
            <span className="font-bold text-3xl my-3 block text-black">
              ${product.price}
              {product.oldPrice && (
                <span className="line-through text-gray-400 text-lg ml-3">
                  ${product.oldPrice}
                </span>
              )}
            </span>
            <p className="text-sm text-gray-500 my-4 border-b pb-4 border-gray-300">
              {product.desc}
            </p>

            {/* Add to Cart */}
            <div className="add_to_cart flex-col flex my-8 gap-7">
              {!isAdded ? (
                <button
                  onClick={() => {
                    dispatch({
                      type: "ADD_TO_CART",
                      payload: {
                        id: product._id,
                        title: product.title,
                        img: product.img,
                        price: product.price,
                        discount: product.oldPrice - product.price,
                        count: product.count,
                        info: product.moreInfo,
                      },
                    });
                  }}
                  className=" w-full justify-center mt-4 flex items-center gap-6 bg-black text-white px-4 py-2 rounded-xl shadow hover:bg-[#1b2433] transition"
                >
                  <MdAddShoppingCart className="text-lg" />
                  Add to Cart
                </button>
              ) : (
                <Quantity
                  id={product._id}
                  img={product.img}
                  title={product.title}
                  price={product.price}
                  discount={product.oldPrice - product.price}
                  count={product.count}
                />
              )}
            </div>
          </div>
        </section>
        <Reviews />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}

export default SingleProduct;
