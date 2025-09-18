import React, { useState, useEffect } from "react";
import { MdCleaningServices, MdFilterListAlt } from "react-icons/md";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { GiSettingsKnobs } from "react-icons/gi";

const SIZES = ["XS", "S", "M", "XL", "2X"];
const categories = ["T-shirt", "Pants", "Shoes", "Dress", "Men's Clothing"];

function Filter({ products, setFilter }) {
  const [showFilter, setShowFilter] = useState(false);

  const [filters, setFilters] = useState({
    size: null,
    price: [0, 1000],
    category: null,
  });

  useEffect(() => {
    let filtered = [...products];

    if (filters.size) {
      filtered = filtered.filter((p) => p.avilableSize?.includes(filters.size));
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
    setFilters({ size: null, price: [0, 1000], category: null });
    setFilter(products);
  };

  return (
    <div>
      {/* Toggle Button */}
      <GiSettingsKnobs
        className="text-3xl cursor-pointer  text-gray-700 hover:text-black transition mt-12 ml-12"
        onClick={() => setShowFilter(true)}
      />

      {/* Overlay */}
      {showFilter && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setShowFilter(false)}
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-white border-r rounded-r-xl shadow-lg p-6 space-y-6 transform transition-transform duration-300 z-50
        ${showFilter ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Filters</h1>
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-sm font-medium text-red-500 hover:text-red-700"
          >
            <MdCleaningServices size={18} />
            Reset
          </button>
        </div>

        <hr className="border-gray-200" />

        {/* Size */}
        <div>
          <h2 className="font-semibold mb-3 text-gray-700">Size</h2>
          <div className="flex gap-2 flex-wrap">
            {SIZES.map((size, i) => (
              <span
                key={i}
                className={`px-4 py-1.5 border rounded-lg cursor-pointer text-sm font-medium transition 
                ${
                  filters.size === size
                    ? "bg-black text-white border-black"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setFilters((prev) => ({ ...prev, size: size }))}
              >
                {size}
              </span>
            ))}
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Price */}
        <div>
          <h2 className="font-semibold mb-3 text-gray-700">Price Range</h2>
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
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>${filters.price[0]}</span>
            <span>${filters.price[1]}</span>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Categories */}
        <div>
          <h2 className="font-semibold mb-3 text-gray-700">Categories</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((c) => (
              <span
                key={c}
                onClick={() => setFilters((prev) => ({ ...prev, category: c }))}
                className={`px-4 py-2 border rounded-lg shadow-sm cursor-pointer text-sm font-medium transition
                ${
                  filters.category === c
                    ? "bg-black text-white border-black"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Filter;
