import React from "react";
import Header from "./Header";
import Hero from "./Hero";
import Cta from "./Cta";
import Featuredproducts from "./Featuredproducts";
import Discoverus from "./Discoverus";
import Footer from "./Footer";
import Slider, { slidesData } from "./Slider";

const Home = () => {
  return (
    <div className="mx-auto xl:w-[99%]">
      <Header />
      <Hero />
      <Slider slides={slidesData} />
      <Cta />
      <Featuredproducts />
      <Discoverus />
      <Footer />
    </div>
  );
};

export default Home;
