import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ROUTES } from "./constant";
import Home from "./pages/Home";
import Product from "./pages/product";
import ProductDetails from "./pages/productdetails";
import ShopProfile from "./pages/ShopProfile ";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<Home />} />
            <Route path={ROUTES.PRODUCT} element={<Product />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route
              path="/shopProfile/:companyId/:personId"
              element={<ShopProfile />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
