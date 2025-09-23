import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_PROJECT_URL,
  import.meta.env.VITE_API_KEY
);

const ProductField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}) => (
  <div className="flex flex-col">
    <label className="mb-1 text-sm font-semibold text-gray-700">{label}</label>
    {type === "textarea" ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={type === "number" ? 0 : undefined}
        className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
    )}
  </div>
);

function AddProduct() {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [data, setData] = useState({
    title: "",
    desc: "",
    price: "",
    oldPrice: "",
    category: "",
    availableSizes: [],
    color: "",
    tags: [],
    soldCount: 0,
    stock: 0,
    imgs: [],
    isTopSelling: false,
    isFeatured: false,
    isNewArrival: false,
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const handleUploadImages = async (files) => {
    if (!files.length) return;
    setLoading(true);
    try {
      const urls = await Promise.all(
        Array.from(files).map(async (file) => {
          const fileName = `products_images/${Date.now()}-${file.name}`;
          const { error } = await supabase.storage
            .from("zstore")
            .upload(fileName, file);
          if (error) throw error;
          const { data: publicData } = supabase.storage
            .from("zstore")
            .getPublicUrl(fileName);
          return publicData.publicUrl;
        })
      );
      setData((prev) => ({ ...prev, imgs: [...prev.imgs, ...urls] }));
    } catch (err) {
      setMsg({ type: "error", text: `Upload error: ${err.message}` });
    }
    setLoading(false);
  };

  const removeImage = (index) => {
    setData((prev) => ({
      ...prev,
      imgs: prev.imgs.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.title || !data.price || data.imgs.length === 0) {
      setMsg({
        type: "error",
        text: "Title, price, and at least one image are required.",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/api/products/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      const result = await res.json();
      if (res.ok) {
        setMsg({ type: "success", text: "✅ Product created successfully!" });
        setData({
          title: "",
          desc: "",
          price: "",
          oldPrice: "",
          category: "",
          availableSizes: [],
          color: "",
          tags: [],
          soldCount: 0,
          stock: 0,
          imgs: [],
          isTopSelling: false,
          isFeatured: false,
          isNewArrival: false,
        });
      } else {
        setMsg({
          type: "error",
          text: result.message || "Failed to create product.",
        });
      }
    } catch (err) {
      setMsg({ type: "error", text: `Error: ${err.message}` });
    }
    setLoading(false);
  };

  const categories = [
    "General",
    "T-Shirt",
    "Shirt",
    "Pants",
    "Jeans",
    "Shorts",
    "Dress",
    "Skirt",
    "Suit",
    "Hoodie",
    "Jacket",
    "Coat",
    "Shoes",
    "Sandals",
    "Boots",
    "Sneakers",
    "Watch",
    "Bag",
    "Hat",
    "Accessories",
    "Sportswear",
    "Underwear",
  ];

  return (
    <section className="p-6 max-w-5xl mx-auto">
      <div className="bg-white shadow-md rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Add New Product
        </h1>

        {msg.text && (
          <p
            className={`mb-4 text-sm font-medium ${
              msg.type === "error" ? "text-red-600" : "text-green-600"
            }`}
          >
            {msg.text}
          </p>
        )}

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          <ProductField
            label="Title"
            name="title"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            placeholder="Enter product title"
          />

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold text-gray-700">
              Category
            </label>
            <select
              value={data.category}
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              onChange={(e) => setData({ ...data, category: e.target.value })}
            >
              <option value="">Select Category</option>
              {categories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <ProductField
            label="Price"
            name="price"
            type="number"
            value={data.price}
            onChange={(e) =>
              setData({ ...data, price: Number(e.target.value) })
            }
            placeholder="Enter price"
          />

          <ProductField
            label="Old Price"
            name="oldPrice"
            type="number"
            value={data.oldPrice}
            onChange={(e) =>
              setData({ ...data, oldPrice: Number(e.target.value) })
            }
            placeholder="Enter old price"
          />

          <ProductField
            label="Description"
            name="desc"
            type="textarea"
            value={data.desc}
            onChange={(e) => setData({ ...data, desc: e.target.value })}
            placeholder="Enter description"
          />

          <ProductField
            label="Available Sizes"
            name="availableSizes"
            value={data.availableSizes.join(",")}
            onChange={(e) =>
              setData({ ...data, availableSizes: e.target.value.split(",") })
            }
            placeholder="E.g. S, M, L, XL"
          />

          <ProductField
            label="Color"
            name="color"
            value={data.color}
            onChange={(e) => setData({ ...data, color: e.target.value })}
            placeholder="Enter product color"
          />

          <ProductField
            label="Sold Count"
            name="soldCount"
            type="number"
            value={data.soldCount}
            onChange={(e) =>
              setData({ ...data, soldCount: Number(e.target.value) })
            }
            placeholder="Enter sold count"
          />

          <ProductField
            label="Tags"
            name="tags"
            value={data.tags.join(",")}
            onChange={(e) =>
              setData({ ...data, tags: e.target.value.split(",") })
            }
            placeholder="E.g. T-Shirt, Casual"
          />

          <ProductField
            label="Stock"
            name="stock"
            type="number"
            value={data.stock}
            onChange={(e) =>
              setData({ ...data, stock: Number(e.target.value) })
            }
            placeholder="Enter stock quantity"
          />

          {/* Image Upload */}
          <div className="md:col-span-2">
            <label className="mb-1 text-sm font-semibold text-gray-700">
              Upload Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleUploadImages(e.target.files)}
              className="block w-full border border-gray-300 rounded-lg p-2 mt-1"
            />
            <div className="flex flex-wrap gap-3 mt-3">
              {data.imgs.map((url, i) => (
                <div key={i} className="relative">
                  <img
                    src={url}
                    alt="preview"
                    className="w-28 h-28 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-full shadow"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Flags */}
          <div className="flex flex-col gap-2 md:col-span-2">
            {[
              { key: "isTopSelling", label: "Top Selling" },
              { key: "isFeatured", label: "Featured" },
              { key: "isNewArrival", label: "New Arrival" },
            ].map(({ key, label }) => (
              <label
                key={key}
                className="flex items-center gap-2 text-sm font-medium"
              >
                <input
                  type="checkbox"
                  checked={data[key]}
                  onChange={(e) =>
                    setData({ ...data, [key]: e.target.checked })
                  }
                />
                {label}
              </label>
            ))}
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
            >
              {loading ? "Saving..." : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddProduct;
