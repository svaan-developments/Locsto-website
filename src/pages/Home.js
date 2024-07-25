import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import logo from "../assets/logo.svg";
import shopArrow from "../assets/shopArrow.svg";
import rightArrow from "../assets/rightArrow.svg";
import downArrow from "../assets/downArrow.svg";
import search from "../assets/search.svg";
import filter from "../assets/filter.svg";
import location from "../assets/location.svg";
import { Link } from "react-router-dom";
import { ApiEndPoints, Constants } from "../Environment";

const Home = () => {
  const navigate = useNavigate();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [shops, setShops] = useState([]);
  const [mobileShops, setMobileShops] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
          fetchShops(latitude, longitude);
        },
        (error) => {
          console.error("Error fetching location: ", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const fetchShops = async (latitude, longitude) => {
    const payload = {
      latitude,
      longitude,
      kms: 10,
    };
    try {
      const response = await axios.post(
        Constants.BaseURL + ApiEndPoints.nearbyshops,
        payload
      );
      setShops(response.data);
      // Filter mobile shops
      const filteredMobileShops = response.data.filter(
        (shop) => shop.company_type === 1
      );
      setMobileShops(filteredMobileShops);
    } catch (error) {
      console.error("Error fetching shops: ", error.response || error.message);
    }
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
      setProducts(response?.data?.data);
      console.log(response?.data?.data, "setProducts");
      navigate("/products", { state: { products: response?.data?.data } });
    } catch (error) {
      console.error(
        "Error fetching products: ",
        error.response || error.message
      );
    }
  };

  const fetchTrendingProducts = async () => {
    try {
      const response = await axios.get(
        Constants.BaseURL_Product + ApiEndPoints.Trending_Products
      );
      setProducts(response.data || []);
    } catch (error) {
      console.error(
        "Error fetching trending products: ",
        error.response || error.message
      );
    }
  };

  useEffect(() => {
    fetchTrendingProducts();
  }, []); // Empty dependency array ensures it only runs once on component mount

  const handleSearch = () => {
    fetchProducts(searchText);
  };

  const handleShopClick = async (companyId, personId) => {
    try {
      const url = `${Constants.BaseURL}${ApiEndPoints.getCompanyProfile(
        companyId,
        personId
      )}`;
      const response = await axios.post(url, {
        latitude: 12.001,
        longitude: 14.001,
      });
      console.log("Shop Profile Response:", response?.data); // Log the response data

      if (response?.data) {
        // Ensure company_id is included in the shopProfile
        navigate(`/shopProfile/${companyId}/${personId}`, {
          state: {
            shopProfile: {
              ...response.data,
              company_id: companyId,
              personId: personId,
            },
          },
        });
      } else {
        console.error("No data received from the API.");
      }
    } catch (error) {
      console.error(
        "Error fetching shop profile: ",
        error.response || error.message
      );
      setError("Error fetching shop profile. Please try again later.");
    }
  };

  return (
    <>
      <div>
        <header className="h-[269px] xl:px-24 pt-4 bg bg-cover bg-center bg-no-repeat bannerMobile">
          <div className="flex xl:justify-between items-center headerMobile">
            <div className="flex xl:gap-16 items-center locationMobile">
              <img className="cursor-pointer" src={logo} alt="Logo" />
              <div
                onClick={fetchCurrentLocation}
                onTouchStart={fetchCurrentLocation}
                className="flex items-baseline gap-2 cursor-pointer"
              >
                <div className="text-white text-base font-medium">Location</div>
                <img src={downArrow} alt="Down Arrow" />
              </div>
            </div>
            <div className="loginPadding">
              <button className="flex justify-center items-center w-[134px] h-[54px] bg-white gap-2 rounded-[100px] homeLogin">
                <a className="text-base font-semibold uppercase" href="#login">
                  Login
                </a>
                <img src={rightArrow} alt="Right Arrow" />
              </button>
            </div>
          </div>
        </header>

        <div className="">
          <div className="search-container">
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
              className="pr-2 cursor-pointer"
              alt="Filter"
              onClick={handleSearch}
            />
          </div>

          <section className="xl:px-24 pt-10 sectionHeight">
            <div className="flex gap-2">
              <h3>Nearby Mobile Shops</h3>
              <img className="" src={shopArrow} alt="Shop Arrow" />
            </div>
            {mobileShops && mobileShops.length > 0 ? (
              <ul className="shop-list pt-6">
                {shops.map((shop) => (
                  <li
                    className="cursor-pointer"
                    key={shop.person_id}
                    onClick={() =>
                      handleShopClick(shop.company_id, shop.person_id)
                    }
                  >
                    <div className="shop-item">
                      {shop.shopImages && shop.shopImages.length > 0 && (
                        <img
                          className="shop-image"
                          src={shop.shopImages[0].img_url}
                          alt={shop.company_name}
                        />
                      )}
                      <div>
                        <h4>{shop.company_name}</h4>
                        <div className="flex items-center gap-2">
                          <img src={location} alt="Location Icon" />
                          <p className="text-gray text-[18px] font-normal">
                            {shop.distance.toFixed(1)} km
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No mobile shops found</p>
            )}
          </section>

          {/* Display Trending Products */}
          <section className="xl:px-24 pt-6 sectionHeight">
            <div className="flex gap-2">
              <h3>Trending Products</h3>
              <img className="" src={shopArrow} alt="Trending Products Arrow" />
            </div>
            <div className="product-container horizontal-scroll pt-6">
              {products && products.length > 0 ? (
                <ul className="Trending-product-list">
                  {products.map((product) => (
                    <li key={product.id} className="product-item">
                      <div>
                        <div className="product-images">
                          {product.product_images?.length > 0 ? (
                            <Link
                              to={`/product/${product?.company_id}`}
                              state={{ product, products, is_avalible: true }} // Pass the products data as state
                            >
                              <img
                                className="product-thumbnail"
                                src={product.product_images[0].img_url}
                                alt={product.product_images[0].type}
                                width={66}
                                height={66}
                              />
                            </Link>
                          ) : (
                            <p>No images available</p>
                          )}
                        </div>
                        <h4 className="text-secondary font-medium text-[18px] py-2 flex-wrap w-[190px]">
                          {product.name}
                        </h4>
                        <p className="text-secondary font-bold text-[20px]">
                          Rs. {product.unit_price}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No trending products found</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
