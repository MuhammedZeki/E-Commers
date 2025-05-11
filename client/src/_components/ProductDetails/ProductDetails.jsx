import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import Breadcrumb from "./Breadcrumb/Breadcrumb";
import Gallery from "./Gallery/Gallery";
import Info from "./Info/Info";
import Tabs from "./Tabs/Tabs";
import { useParams } from "react-router-dom";
import axios from "axios";
const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [singleProduct, setSingleProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/product/${productId}`
        );
        if (res.status === 200) {
          setSingleProduct(res.data);
        } else {
          console.log(res.data.message || res.response.data.message);
        }
      } catch (error) {
        console.log(error.message || error.response.data.message);
      }
    };
    fetchData();
  }, [productId]);
  if (!singleProduct) {
    return <div>Loading...</div>;
  }
  if (singleProduct.length === 0) {
    return <div>Ürün Bulunamadı</div>;
  }
  return (
    <section className="single-product">
      <div className="container">
        <div className="single-product-wrapper">
          <Breadcrumb />
          <div className="single-content">
            <main className="site-main">
              <Gallery singleProduct={singleProduct} />
              <Info singleProduct={singleProduct} />
            </main>
          </div>
          <Tabs
            singleProduct={singleProduct}
            setSingleProduct={setSingleProduct}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPage;
