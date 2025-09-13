import React from "react";

function Brands() {
  const brands = [
    {
      id: 1,
      name: "Zara",
      img: "https://cdn.worldvectorlogo.com/logos/zara-logo-1.svg",
    },
    {
      id: 2,
      name: "H&M",
      img: "https://cdn.worldvectorlogo.com/logos/h-m.svg",
    },
    {
      id: 3,
      name: "Uniqlo",
      img: "https://cdn.worldvectorlogo.com/logos/uniqlo.svg",
    },
  ];

  return (
    <section className="w-full bg-gray-50 py-10 px-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
        Popular Fashion Brands
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center">
        {brands.map((brand) => (
          <div className="bg-white rounded-xl shadow p-4 flex items-center justify-center hover:shadow-lg transition-all cursor-pointer">
            <img
              src={brand.img}
              alt={brand.name}
              className="max-h-12 object-contain"
              onError={(e) => {
                e.target.src = "/placeholder-logo.png"; // صورة بديلة لو ما تم تحميلها
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Brands;
