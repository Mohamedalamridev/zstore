import React from "react";
import Header from "../components/Header";
import NewCollections from "../components/NewCollections";
import TopSeller from "../components/TopSeller";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Header />
      {/* <NewCollections /> */}
      <TopSeller />
      {/* <Newsletter /> */}

      <Footer />
    </>
  );
}

export default Home;
