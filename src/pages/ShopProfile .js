import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
import downArrow from "../assets/downArrow.svg";
import searchIcon from "../assets/search.svg";
import rightArrow from "../assets/rightArrow.svg";
import shopArrow from "../assets/shopArrow.svg";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import AddressIcon from "../assets/addressIcon.svg";

const ShopDetails = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate hook
  const location = useLocation();
  const { shop } = location.state || {};
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  const userId = 157; // Replace with the actual user ID
  const companyId = shop.company_id; // Adjust as per your data structure

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleFollow = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://erpserver.tazk.in/locstoUser/follow/?type=follow",
        {
          following_id: userId,
          followed_id: companyId,
        }
      );
      console.log("Follow response:", response.data);
      setIsFollowing(true);
    } catch (error) {
      console.error("Error following:", error.response || error.message);
      setError("Failed to follow. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchShopProducts = async (companyId) => {
    try {
      const response = await axios.post(
        `https://erpserver.tazk.in/locstoProduct/items/${companyId}?page=0&per_page=100`,
        {
          categories: ["SMARTPHONE"],
        }
      );
      console.log("Shop Products Response", response.data);
      setProducts(response.data || []); // Ensure to set an empty array if response.data.data is undefined
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

  const handleProductClick = (product) => {
    navigate(`/product/${product.item_id}`, { state: { product, products } });
  };

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
          <div className="loginPadding">
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
              style={{
                width: "100%",
                height: "300px",
                backgroundSize: "cover",
                objectFit: "fill",
              }}
            />
          )}
        </div>
        {/* <div className="boxShadow">
          <h2 className="text-[24px] text-primary font-semibold">
            {shop.company_name}
          </h2>
          <div>
            <p>Phone Number: {shop.phone_number}</p>
            {shop.bussiness_whatsapp_number && (
              <p>WhatsApp Number: {shop.bussiness_whatsapp_number}</p>
            )}
            <p>Address: {shop.address}</p>
            {shop.area && <p>Area: {shop.area}</p>}
          </div>
        </div> */}
        <div className="relative">
          {/* <img className="w-full h-auto" src={shopImageUrl} alt="Shop Image" /> */}
          <div className="flex gap-10 boxShadow absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md shadow-lg">
            <div>
              {" "}
              <h2 className="text-[24px] text-primary font-semibold">
                {shop.company_name}
              </h2>
              <div>
                <p>Phone Number: {shop.phone_number}</p>
                {shop.bussiness_whatsapp_number && (
                  <p>WhatsApp Number: {shop.bussiness_whatsapp_number}</p>
                )}
                <div className="flex gap-2 text-[#828282]">
                  <img src={AddressIcon} />
                  <p>{shop.address}</p>
                </div>
                {shop.area && <p>Area: {shop.area}</p>}
              </div>
            </div>
            <div></div>
            <div>
              <button
                onClick={handleFollow}
                disabled={loading || isFollowing}
                className="mt-4 px-4 py-2 text-primary rounded-[22px] border-[1px]"
              >
                {loading
                  ? "Following..."
                  : isFollowing
                  ? "Following"
                  : "Follow"}
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
          </div>
        </div>
      </section>

      <section className="xl:px-24 py-20 sectionHeight sectionPadding">
        <div>
          <div className="flex gap-2">
            <h3>Products</h3>
            <img className="" src={shopArrow} alt="Shop Arrow" />
          </div>
          {loading ? (
            <div>Loading shop products...</div>
          ) : error ? (
            <div>{error}</div>
          ) : products && products.length > 0 ? (
            <ul className="product-list-container pt-6">
              {products.map((product) => (
                <li
                  key={product.item_id}
                  onClick={() => handleProductClick(product)}
                >
                  <div>
                    {product.product_images &&
                      product.product_images.length > 0 && (
                        <img
                          src={product.product_images[0].img_url}
                          alt={product.name}
                          className=""
                        />
                      )}
                  </div>
                  <div>
                    <h4 className="text-secondary font-semibold text-[18px]">
                      {product.name}
                    </h4>
                    <p>Brand: {product.brand}</p>
                    <p className="text-secondary font-bold text-[20px]">
                      Price: Rs. {product.unit_price}
                    </p>
                    {/* <p>Is New: {product.is_new ? "Yes" : "No"}</p> */}
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
