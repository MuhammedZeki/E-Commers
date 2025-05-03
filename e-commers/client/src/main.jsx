import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { Layout } from "./_components/layouts/Layout.jsx";
import ScrollToTop from "./_components/ScrollToTop.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <ScrollToTop />
      <Layout>
        <App />
      </Layout>
    </Router>
  </Provider>
);
