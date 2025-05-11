import React from "react";
import Categories from "../../_components/Categories/Categories";
import Products from "../../_components/Products/Products";
import CampaignSingle from "../../_components/CampaignSingle/CampaignSingle";

const Shop = () => {
  return (
    <div>
      <Categories />
      <Products />
      <CampaignSingle />
      <Products />
    </div>
  );
};

export default Shop;
