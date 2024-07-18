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
  const { shop } = location.state || {};
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const fetchShopProducts = async (companyId) => {
    try {
      const response = await axios.post(
        `https://erpserver.tazk.in/locstoProduct/items/6?page=0&per_page=100`,
        {
          categories: ["SMARTPHONE"],
        }
      );
      console.log("Shop Products Response:", response.data.data);
      setProducts(response.data.data || []); // Ensure to set an empty array if response.data.data is undefined
      setLoading(false);
    } catch (error) {
      console.error(
        "Error fetching shop products: ",
        error.response || error.message
      );
      setError("Error fetching shop products. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (shop && shop.company_id) {
      fetchShopProducts(shop.company_id); // Fetch products when shop details are available
    } else {
      setError("Shop information is not available.");
      setLoading(false);
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
          {shop.shopImages && shop.shopImages.length > 0 && (
            <img
              src={shop.shopImages[0].img_url}
              alt="Shop Image 1"
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
          {loading ? (
            <div>Loading shop products...</div>
          ) : error ? (
            <div>{error}</div>
          ) : products && products.length > 0 ? (
            <ul>
              {products.map((product) => (
                <li key={product.item_id}>
                  <h4>{product.name}</h4>
                  <p>Brand: {product.brand}</p>
                  <p>Category: {product.category}</p>
                  <p>Price: Rs. {product.unit_price}</p>
                  <p>Cost Price: Rs. {product.cost_price}</p>
                  <p>Max Price: Rs. {product.max_price}</p>
                  <p>Quantity: {product.quantity}</p>
                  <p>Is New: {product.is_new ? "Yes" : "No"}</p>
                  <p>Bookmark: {product.bookmark ? "Yes" : "No"}</p>
                  <p>Shop Type: {product.shop_type}</p>
                  <p>Creation Date: {product.creationDate}</p>
                  <p>Last Updated: {product.itemUpdated}</p>
                  <p>Description: {product.descript}</p>
                  <p>Variant: {product.variant || "N/A"}</p>
                  <p>Color: {product.color || "N/A"}</p>
                  <div>
                    {product.product_images &&
                    product.product_images.length > 0 ? (
                      product.product_images.map((image, index) => (
                        <img
                          key={index}
                          src={image.img_url}
                          alt={image.type}
                          width={66}
                          height={66}
                        />
                      ))
                    ) : (
                      <p>No images available</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div>No products available</div>
          )}
        </div>
      </section>
    </>
  );
};

export default ShopDetails;
