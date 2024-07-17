import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
import downArrow from "../assets/downArrow.svg";
import searchIcon from "../assets/search.svg";
import rightArrow from "../assets/rightArrow.svg";

const ShopDetails = () => {
  const [searchText, setSearchText] = useState("");
  const location = useLocation();
  const { shop } = location.state;
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState(null);

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    const fetchShopProducts = async (userId) => {
      try {
        if (!userId) {
          throw new Error("User ID is undefined or null.");
        }

        const response = await axios.post(
          `https://erpserver.tazk.in/locstoProduct/items/${userId}?page=0&per_page=100`,
          {} // Add empty object as second argument if no data to send
        );

        console.log("Shop Products Response:", response.data);
        setProducts(response.data || []);
        setLoadingProducts(false);
      } catch (error) {
        console.error(
          "Error fetching shop products: ",
          error.response || error.message
        );
        setErrorProducts(
          "Error fetching shop products. Please try again later."
        );
        setLoadingProducts(false);
      }
    };

    if (shop && shop.user_id) {
      fetchShopProducts(shop.user_id);
    } else {
      setErrorProducts("Shop information is not available.");
      setLoadingProducts(false);
    }
  }, [shop]);

  if (!shop) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <header className="h-[94px] xl:px-24 pt-4 bg-primary heightMobile">
        <div className="xl:flex xl:justify-between items-center">
          <div className="flex xl:gap-16 items-center logoLocation">
            <img src={logo} alt="Logo" />
            <div className="flex items-baseline gap-2">
              <div className="text-white text-base font-medium">Location</div>
              <img src={downArrow} alt="Down Arrow" />
            </div>
          </div>
          <div className="search-container-product">
            <input
              type="text"
              className="search-input"
              placeholder="Search here"
              value={searchText}
              onChange={handleInputChange}
            />
            <img src={searchIcon} alt="Search Icon" />
          </div>
          <div>
            <button className="flex justify-center items-center w-[134px] h-[54px] bg-white gap-2 rounded-[100px] loginMobile">
              <a className="text-base font-semibold uppercase">Login</a>
              <img src={rightArrow} alt="Right Arrow" />
            </button>
          </div>
        </div>
      </header>

      <section>
        <div>
          {shop.shopImages.length > 0 && (
            <img
              src={shop.shopImages[0].img_url}
              alt={`Shop Image 1`}
              style={{ width: "100%", height: "300px" }}
            />
          )}
        </div>

        <h2>{shop.company_name}</h2>
        <div>
          <h3>Contact Information:</h3>
          <p>Phone Number: {shop.phone_number}</p>
          {shop.bussiness_whatsapp_number && (
            <p>WhatsApp Number: {shop.bussiness_whatsapp_number}</p>
          )}
          <p>Address: {shop.address}</p>
          {shop.area && <p>Area: {shop.area}</p>}
          <p>City: {shop.city}</p>
          <p>State: {shop.state}</p>
          {shop.zip && <p>Zip Code: {shop.zip}</p>}
          <p>Country: {shop.country}</p>
        </div>
        <div>
          <h3>Opening and Closing Time:</h3>
          {shop.opening_time && <p>Opening Time: {shop.opening_time}</p>}
          {shop.closing_time && <p>Closing Time: {shop.closing_time}</p>}
        </div>
      </section>

      <section>
        <div>
          <h3>Shop Products:</h3>
          {loadingProducts ? (
            <div>Loading shop products...</div>
          ) : errorProducts ? (
            <div>{errorProducts}</div>
          ) : (
            <ul>
              {products.map((product) => (
                <li key={product.id}>
                  <h4>{product.name}</h4>
                  <p>Price: Rs. {product.unit_price}</p>
                  {/* Add more product details as needed */}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
};

export default ShopDetails;
