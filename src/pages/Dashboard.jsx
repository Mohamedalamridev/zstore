import React from "react";
import { Link, Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <section className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 h-screen bg-black text-white p-6">
        <h1 className="text-2xl font-bold mb-10 tracking-wide">
          Admin Dashboard
        </h1>

        <nav className="flex flex-col gap-3">
          <Link
            to="all_products"
            className="px-4 py-2 rounded bg-gray-800 hover:bg-white hover:text-black transition-colors"
          >
            Products
          </Link>

          <Link
            to="orders"
            className="px-4 py-2 rounded bg-gray-800 hover:bg-white hover:text-black transition-colors"
          >
            Orders
          </Link>

          <Link
            to="add_product"
            className="px-4 py-2 rounded bg-gray-800 hover:bg-white hover:text-black transition-colors"
          >
            Add Product
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-white text-gray-900">
        <Outlet />
      </main>
    </section>
  );
}

export default Dashboard;
