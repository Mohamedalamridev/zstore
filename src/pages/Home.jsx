import React from "react";
import Header from "../components/Header";
import NewCollections from "../components/NewCollections";
import TopSeller from "../components/TopSeller";
import Newsletter from "../components/Newsletter";
import Barnds from "../components/Barnds";

function Home() {
  return (
    <>
      <Header />
      {/* <NewCollections /> */}
      <TopSeller />
      <Newsletter />
      <Barnds />
    </>
  );
}

export default Home;
