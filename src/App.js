import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ROUTES } from "./constant";
import Home from "./pages/Home";
import Product from "./pages/product";
import ProductDetails from "./pages/productdetails";
import ShopProfile from "./pages/ShopProfile "; // Ensure the path and case are correct

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<Home />} />
            <Route path={ROUTES.PRODUCT} element={<Product />} />
            {/* <Route path={ROUTES.PRODUCTDETAILS} element={<ProductDetails />} /> */}
            {/* <Route path={ROUTES.MOBILEDETAILS} element={MobileDetails} /> */}
            <Route path="/product/:id" element={<ProductDetails />} />
            {/* <Route
              path="/companyProfile/:companyId/:userId"
              element={<ShopProfile />}
            /> */}
            <Route path="/shop/:companyId/:userId" element={<ShopProfile />} />
          </Route>

          <Route>
            {/* <Route path={ROUTES.PROFILE} element={<Profile />} /> */}
            {/* <Route path={ROUTES.CERTIFICATION} element={<Certificate />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
