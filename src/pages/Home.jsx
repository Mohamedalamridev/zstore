import React from "react";
import Header from "../components/Header";

import Footer from "../components/Footer";
import Products from "../components/Products";

function Home() {
  return (
    <section className="min-h-[120vh] bg-[#F9F9F9]">
      <Header />

      <Products />

      <Footer />
    </section>
  );
}

export default Home;
