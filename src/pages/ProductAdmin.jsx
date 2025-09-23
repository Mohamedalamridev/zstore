import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProductAdmin() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
          setProducts(data.products || []);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [baseUrl]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${baseUrl}/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setProducts((prev) => prev.filter((product) => product._id !== id));
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <section>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Product Admin</h1>

        {loading ? (
          <p className="text-gray-500">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead className="bg-black text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Img</th>
                  <th className="py-3 px-4 text-left">ID</th>
                  <th className="py-3 px-4 text-left">Title</th>
                  <th className="py-3 px-4 text-left">Price</th>
                  <th className="py-3 px-4 text-left">Category</th>
                  <th className="py-3 px-4 text-left">Stock</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="py-2 px-4">
                      <img
                        src={product?.imgs?.[0] || "/placeholder.png"}
                        className="w-16 h-20 object-cover rounded"
                        alt={product?.title || "Product"}
                      />
                    </td>
                    <td className="py-2 px-4">{product?._id}</td>
                    <td className="py-2 px-4">{product?.title}</td>
                    <td className="py-2 px-4 font-semibold text-gray-800">
                      ${product?.price}
                    </td>
                    <td className="py-2 px-4">{product?.category}</td>
                    <td className="py-2 px-4">{product?.soldCount}</td>
                    <td className="py-2 px-4 flex gap-2">
                      <Link
                        to={`/dashboard-98568348/edit_product/${product._id}`}
                        className="bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 transition"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductAdmin;
