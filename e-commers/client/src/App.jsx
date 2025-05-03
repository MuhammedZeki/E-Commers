import { Route, Routes } from "react-router-dom";
import "./App.css";
import NoFoundPage from "./_components/NoFoundPage/NoFoundPageItem";
import Home from "./Pages/Home/Home";
import Shop from "./Pages/Shop/Shop";
import Contact from "./Pages/Contact/Contact";
import Auth from "./_components/Auth/Auth";
import Cart from "./_components/Cart/Cart";
import BlogPage from "./Pages/Blog/BlogPage";
import BlogDetails from "./Pages/BlogDetails/BlogDetails";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import AdminUserPage from "./Pages/admin/AdminUserPage";
import AdminNotFoundPage from "./Pages/admin/AdminNotFoundPage";
import AdminProductsCreatePage from "./Pages/admin/Products/AdminProductsCreatePage";
import AdminCategoriesCreatePage from "./Pages/admin/Categories/AdminCategoriesCreatePage";
import AdminCategoriesUpdatePage from "./Pages/admin/Categories/AdminCategoriesUpdatePage";
import AdminCategoriesPage from "./Pages/admin/Categories/AdminCategoriesPage";
import AdminProductsPage from "./Pages/admin/Products/AdminProductsPage";
import AdminProductsUpdatePage from "./Pages/admin/Products/AdminProductsUpdatePage";
import AdminCouponPage from "./Pages/admin/Coupons/AdminCouponPage";
import AdminCouponCreatePage from "./Pages/admin/Coupons/AdminCouponCreatePage";
import AdminCouponUpdatePage from "./Pages/admin/Coupons/AdminCouponUpdatePage";
import AdminPage from "./Pages/admin/AdminPage";
import Success from "./Pages/admin/Success/Success";
import AdminOrders from "./Pages/admin/AdminOrders";
import DashboardPage from "./Pages/admin/AdminDashboardPage";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/success" element={<Success />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blogDetails" element={<BlogDetails />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="*" element={<NoFoundPage />} />
        <Route path="/admin/*">
          <Route index element={<DashboardPage />} />
          <Route path="users" element={<AdminUserPage />} />
          <Route path="categories" element={<AdminCategoriesPage />} />
          <Route
            path="categories/update/:id"
            element={<AdminCategoriesUpdatePage />}
          />
          <Route
            path="categories/create"
            element={<AdminCategoriesCreatePage />}
          />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="products/create" element={<AdminProductsCreatePage />} />
          <Route
            path="products/update/:id"
            element={<AdminProductsUpdatePage />}
          />
          <Route path="coupons" element={<AdminCouponPage />} />
          <Route path="coupon/create" element={<AdminCouponCreatePage />} />
          <Route path="coupon/update/:id" element={<AdminCouponUpdatePage />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="*" element={<AdminNotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
