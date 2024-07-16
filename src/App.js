import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { ROUTES } from "./constant";
import Home from "./pages/Home";
import Product from "./pages/product";
import Productdetails from "./pages/productdetails";

function App() {
  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route>
            <Route path='/' element={<Home />} />
            <Route path={ROUTES.PRODUCT} element={<Product />} />
            <Route path={ROUTES.PRODUCTDETAILS} element={<Productdetails />} />
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
