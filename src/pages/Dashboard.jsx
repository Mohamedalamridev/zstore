import React from "react";
import { Link, Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <section className="flex">
      {/* Sidebar */}
      <aside className="w-64 h-screen bg-gray-100 p-5">
        <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>

        <nav className="flex flex-col gap-3">
          <Link
            to="all_products"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Products
          </Link>

          <Link
            to="orders"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Orders
          </Link>

          <Link
            to="add_product"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Add Product
          </Link>

          <Link
            to="users"
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
          >
            Users
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </section>
  );
}

export default Dashboard;
