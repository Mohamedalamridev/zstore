import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function ProductAdmin() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [products, setProducts] = React.useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/products`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        if (response.ok) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  });

  const handleDElete = async (id) => {
    try {
      const response = await fetch(`${baseUrl}/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setProducts(products.filter((product) => product._id !== id));
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <section>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Product Admin</h1>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200">Img</th>
              <th className="py-2 px-4 border-b border-gray-200">ID</th>
              <th className="py-2 px-4 border-b border-gray-200">Title</th>
              <th className="py-2 px-4 border-b border-gray-200">Price</th>
              <th className="py-2 px-4 border-b border-gray-200">Category</th>
              <th className="py-2 px-4 border-b border-gray-200">Stock</th>
              <th className="py-2 px-4 border-b border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.length > 0 &&
              products?.map((product) => (
                <tr key={product._id}>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <img src={product?.imgs[0]} className="w-24 h-28" alt="" />
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {product?._id}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {product?.title}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    ${product?.price}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {product?.category}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {product.soldCount}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <Link
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-4"
                      to={`/dashboard-98568348/edit_product/${product._id}`}
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDElete(product._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ProductAdmin;
