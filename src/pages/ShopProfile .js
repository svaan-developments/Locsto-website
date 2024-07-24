import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import downArrow from "../assets/downArrow.svg";
import searchIcon from "../assets/search.svg";
import rightArrow from "../assets/rightArrow.svg";
import shopArrow from "../assets/shopArrow.svg";
import AddressIcon from "../assets/addressIcon.svg";
import Member from "../assets/memberIcon.svg";
import Follow from "../assets/FollowIcon.svg";
import Followers from "../assets/FollowersIcon.svg";
import Google from "../assets/google.svg";
import Gmail from "../assets/Gmail.svg";
import WhatsappIcon from "../assets/whatsappIcon.svg";
import search from "../assets/search.svg";
import filter from "../assets/filter.svg";

const ShopProfile = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [shopProfile, setShopProfile] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);

  const userId = 157;
  const companyId = shopProfile?.company_id;

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
        "https://erpserver.tazk.in/locstoProduct/searchproducts?page=0&per_page=100",
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

  useEffect(() => {
    if (location.state?.shopProfile) {
      setShopProfile(location.state.shopProfile);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchShopProducts = async () => {
      if (companyId) {
        try {
          const response = await axios.post(
            `https://erpserver.tazk.in/locstoProduct/items/${companyId}?page=0&per_page=100`,
            {
              categories: ["SMARTPHONE"],
            }
          );
          setProducts(response.data || []);
        } catch (error) {
          setError("Error fetching shop products. Please try again later.");
        } finally {
          setLoading(false);
        }
      }
      // else {
      //   setError("Shop information is not available.");
      //   setLoading(false);
      // }
    };

    fetchShopProducts();
  }, [companyId]);

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
      setIsFollowing(true);
    } catch (error) {
      setError("Failed to follow. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.item_id}`, { state: { product, products } });
  };

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const truncateText = (text, limit) => {
    if (typeof text !== "string") {
      return "";
    }
    if (text.length <= limit) {
      return text;
    }
    return text.substring(0, limit) + "...";
  };

  const addressLimit = 30;

  if (!shopProfile) {
    return <div>Loading...</div>;
  }

  return (
    <>
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

      <main className="content">
        <section>
          <div className="">
            {shopProfile[0]?.shopImages?.length > 0 && (
              <img
                src={shopProfile[0].shopImages[0].img_url}
                alt={shopProfile[0].shopImages[0].img_name}
                // className={shopProfile[0].shopImages[0].thumbnail ? "thumbnail-class" : "regular-class"}
                style={{
                  width: "100%",
                  height: "300px",
                  backgroundSize: "cover",
                  objectFit: "fill",
                }}
              />
            )}
          </div>

          <div className="relative">
            <div className="xl:flex items-center justify-between gap-10 boxShadow absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md shadow-lg">
              <div>
                <p className="text-primary font-semibold text-[24px]">
                  {shopProfile[0]?.company_name}
                </p>
                {/* <p className="">{shopProfile[0]?.address}</p> */}
                <div className="flex gap-2">
                  <img src={Member} />
                  <p>Member since Dec 2023</p>
                </div>
                <div className="flex gap-6 pt-4">
                  <div className="flex gap-2">
                    <img src={Followers} />
                    <p className="text-block font-medium text-[14px]">
                      216 Followers
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <img src={Follow} />
                    <p className="text-block font-medium text-[14px]">
                      24 Following
                    </p>
                  </div>
                </div>
                <div>
                  <div className="flex gap-2 text-[#828282] pt-2">
                    <img src={AddressIcon} alt="Address Icon" />
                    <p>
                      {isExpanded
                        ? shopProfile?.address
                        : truncateText(shopProfile[0]?.address, addressLimit)}
                      {shopProfile?.address?.length > addressLimit && (
                        <span
                          onClick={handleToggle}
                          className="text-blue-500 cursor-pointer"
                        >
                          {isExpanded ? " Show less" : " Show more"}
                        </span>
                      )}
                    </p>
                  </div>
                  {shopProfile?.near_location && (
                    <p>Near: {shopProfile.near_location}</p>
                  )}
                </div>
              </div>
              <div>
                <p>User verified with you</p>
                <div className="flex gap-4">
                  <img src={Google} />
                  <img src={Gmail} />
                  <img src={WhatsappIcon} />
                </div>
              </div>
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

        <section className="xl:px-24 mt-28 pb-10 sectionHeight sectionPadding">
          <div>
            <div className="flex gap-2">
              <h3>Products</h3>
              <img className="" src={shopArrow} alt="Shop Arrow" />
            </div>
            {loading ? (
              <div>Loading shop products...</div>
            ) : error ? (
              <div>{error}</div>
            ) : products?.length > 0 ? (
              <ul className="product-list-container pt-6">
                {products.map((product) => (
                  <li
                    key={product.item_id}
                    onClick={() => handleProductClick(product)}
                  >
                    <div>
                      {product.product_images?.length > 0 && (
                        <img
                          src={product.product_images[0]?.img_url}
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
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div>No products available</div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default ShopProfile;
