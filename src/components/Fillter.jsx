import React, { useState, useEffect } from "react";
import { MdCleaningServices } from "react-icons/md";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { MdFilterListAlt } from "react-icons/md";

const SIZES = ["XS", "S", "M", "XL", "2X"];

const categories = ["T-shirt", "Pants", "Shoes", "Dress", "Hoodie"];

const labels = ["New Arrival", "Top Seller", "Discounted"];
const COLORS = [
  { name: "black", hex: "#000000" },
  { name: "green", hex: "#00FF00" },
  { name: "yellow", hex: "#FFFF00" },
  { name: "blue", hex: "#0000FF" },
  { name: "red", hex: "#FF0000" },
];
function Filter({ products, setFilter }) {
  const [showFilter, setShowFilter] = useState(false);

  const [filters, setFilters] = useState({
    size: null,
    color: null,
    price: [0, 1000],
    category: null,
    tags: null,
  });
  useEffect(() => {
    let filtered = [...products];

    if (filters.size) {
      filtered = filtered.filter((p) => p.avilableSize.includes(filters.size));
    }

    if (filters.color) {
      filtered = filtered.filter((p) => p.color === filters.color);
    }

    if (filters.price) {
      const [min, max] = filters.price;
      filtered = filtered.filter((p) => +p.price >= min && +p.price <= max);
    }
    if (filters.category) {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    setFilter(filtered);
  }, [filters, products, setFilter]);

  const resetFilters = () => {
    setFilters({ size: null, color: null, price: [0, 1000] });
    setFilter(products);
  };

  return (
    <aside
      className={`bg-slate-50 px-4 pt-4 lg:p-6 shadow-md rounded-lg mb-5 lg:mb-0 overflow-hidden`}
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold mx-auto">Filters</h1>
        <MdFilterListAlt
          className="text-3xl cursor-pointer"
          onClick={() => setShowFilter((prev) => !prev)}
        />
      </div>

      <div
        className={`container ${!showFilter ? "h-0" : "h-fit"} transition-all`}
      >
        <button
          onClick={resetFilters}
          className="text-red-500 my-2 font-bold cursor-pointer"
        >
          Reset
        </button>
        {/* Size */}
        <h2 className="font-medium">Size</h2>
        <div className="flex gap-2 flex-wrap">
          {SIZES.map((size, i) => (
            <span
              key={i}
              className={`px-3 py-1 border rounded-md cursor-pointer ${
                filters.size === size ? "bg-black text-white" : "bg-white"
              }`}
              onClick={() => setFilters((prev) => ({ ...prev, size: size }))}
            >
              {size}
            </span>
          ))}
        </div>

        {/* Colors */}
        <h2 className="font-medium mt-4">Colors</h2>
        <div className="flex gap-3 mt-3">
          {COLORS.map((color) => (
            <span
              key={color.name}
              style={{ backgroundColor: color.hex }}
              className={`w-8 h-8 rounded-full cursor-pointer border ${
                filters.color === color.name ? "ring-2 ring-black" : ""
              }`}
              onClick={() =>
                setFilters((prev) => ({ ...prev, color: color.name }))
              }
            />
          ))}
        </div>

        {/* Price */}
        <h2 className="font-medium mt-6">Price</h2>
        <div className="mt-3">
          <Slider
            range
            min={0}
            max={1000}
            step={10}
            value={filters.price}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, price: value }))
            }
          />
          <div className="flex justify-between mt-2 text-sm text-gray-700">
            <span>${filters.price[0]}</span>
            <span>${filters.price[1]}</span>
          </div>
        </div>
        {/* Categories  */}
        <div className="my-8">
          <h1 className="mb-3 font-semibold">Categories</h1>
          <div className="flex flex-wrap gap-4">
            {categories.map((c) => {
              return (
                <span
                  onClick={() =>
                    setFilter((prev) => ({ ...prev, category: c }))
                  }
                  className="border-2 border-gray-500 p-2 rounded-md shadow-md"
                >
                  {c}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Filter;
