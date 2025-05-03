import React from "react";
import Sliders from "../../_components/Slider/Sliders";
import Categories from "../../_components/Categories/Categories";
import Products from "../../_components/Products/Products";
import Campaigns from "../../_components/Campaigns/Campaigns";
import Blogs from "../../_components/Blogs/Blogs";
import Brands from "../../_components/Brands/Brands";
import CampaignSingle from "../../_components/CampaignSingle/CampaignSingle";

const Home = () => {
  return (
    <div>
      <Sliders />
      <Categories />
      <Campaigns />
      <Products />
      <Blogs />
      <Brands />
      <CampaignSingle />
    </div>
  );
};

export default Home;
