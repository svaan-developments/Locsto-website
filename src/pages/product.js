import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import downArrow from "../assets/downArrow.svg";
import rightArrow from "../assets/rightArrow.svg";
import "react-image-gallery/styles/css/image-gallery.css";
import axios from "axios";
import search from "../assets/search.svg";
import filter from "../assets/filter.svg";
import { ApiEndPoints, Constants } from "../Environment";

const Product = () => {
  const [searchText, setSearchText] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const initialProducts = location.state?.products || [];
  const [currentLocation, setCurrentLocation] = useState(null);
  const [products, setProducts] = useState(initialProducts);

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    fetchProducts(searchText);
  };

  const fetchProducts = async (searchText) => {
    const payload = {
      latitude: currentLocation?.latitude || 0,
      longitude: currentLocation?.longitude || 0,
      brand: searchText,
      is_new: "",
    };

    try {
      const response = await axios.post(
        Constants.BaseURL_Product + ApiEndPoints.Seacrch_products,
        payload
      );
      setProducts(response?.data?.data); // Adjust according to the actual response structure
      console.log(response?.data?.data, "setProducts");

      // Navigate to "/products" route and pass the products data
      navigate("/products", { state: { products: response?.data?.data } });
    } catch (error) {
      console.error(
        "Error fetching products: ",
        error.response || error.message
      );
    }
  };

  // Function to parse the pic_filename field and extract image URLs
  const getProductImages = (productImages) => {
    if (!productImages || productImages.length === 0) {
      return [];
    }
    return productImages.map((image) => ({
      original:
        image.img_url || `https://yourimagebaseurl.com/${image.image_path}`,
      thumbnail:
        image.img_url || `https://yourimagebaseurl.com/${image.image_path}`,
    }));
  };

  useEffect(() => {
    // Log the products data for debugging
    console.log("Products data:", products);
    products.forEach((product) => {
      if (product.product_images && product.product_images.length > 0) {
        const imageUrls = getProductImages(product.product_images);
        console.log(`Image URLs for product ${product.name}:`, imageUrls);
      }
    });
  }, [products]);

  return (
    <>
      {/* <div> */}
      <header className="header-fixed h-[94px] xl:px-24 pt-4 bg-primary heightMobile">
        <div className="xl:flex xl:justify-between items-center">
          <div className="flex xl:gap-16 items-center logoLocation">
            <img
              src={logo}
              alt="Logo"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            />
            <div className="flex items-baseline gap-2">
              <div className="text-white text-base font-medium">Location</div>
              <img src={downArrow} alt="Down Arrow" />
            </div>
          </div>
          <div className="search-container-product">
            <img src={search} alt="Search" />
            <input
              type="text"
              className="search-input"
              placeholder="Search your product here"
              value={searchText}
              onChange={handleSearchTextChange}
            />
            <img
              src={filter}
              className="pr-2"
              alt="Filter"
              onClick={handleSearch}
            />
          </div>
          <div className="loginPadding">
            <button className="flex justify-center items-center w-[134px] h-[54px] bg-white gap-2 rounded-[100px] loginMobile">
              <a className="text-base font-semibold uppercase">Login</a>
              <img src={rightArrow} alt="Right Arrow" />
            </button>
          </div>
        </div>
      </header>
      {/* </div> */}
      <main className="content mobile-product">
        {/* Display Products Passed from Home Component */}
        <section className="xl:px-24 pt-10">
          <div>
            <h3 className="py-4">Result for</h3>
            {products.length > 0 ? (
              <ul className="product-list">
                {products.map((product) => (
                  <li key={product.item_id} className="product-item">
                    <Link
                      to={`/product/${product.item_id}`}
                      state={{ product, products, is_avalible: true }}
                    >
                      {product.product_images &&
                      product.product_images.length > 0 ? (
                        <img
                          src={
                            getProductImages(product.product_images)[0].original
                          }
                          alt={product.name}
                          className="product-thumbnail"
                        />
                      ) : (
                        <p>No image available</p>
                      )}
                      <h4 className="text-secondary font-medium text-[18px] py-2 flex-wrap w-[190px]">
                        {product.name}
                      </h4>
                      <p className="text-secondary font-bold text-[20px]">
                        Rs. {product.unit_price}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No products found</p>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Product;
