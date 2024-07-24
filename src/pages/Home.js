import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import logo from "../assets/logo.svg";
import shopArrow from "../assets/shopArrow.svg";
import rightArrow from "../assets/rightArrow.svg";
import downArrow from "../assets/downArrow.svg";
import search from "../assets/search.svg";
import filter from "../assets/filter.svg";
import Select from "react-select";
import { FaMapMarkerAlt } from "react-icons/fa";
import location from "../assets/location.svg";
import { Link } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [shops, setShops] = useState([]);
  const [mobileShops, setMobileShops] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState(null); // Add error state

  const locations = [
    {
      value: "velachery",
      label: "Velachery",
      latitude: 12.9762,
      longitude: 80.2216,
    },
    { value: "omr", label: "OMR", latitude: 12.8434, longitude: 80.1514 },
    {
      value: "perungudi",
      label: "Perungudi",
      latitude: 12.96,
      longitude: 80.2394,
    },
    { value: "trichy", label: "Trichy", latitude: 10.7905, longitude: 78.7047 },
    // Add more cities or regions in Tamil Nadu as needed
  ];

  const handleSelectChange = (selectedOption) => {
    setSelectedLocation(selectedOption);
    // Fetch shops for the selected location
    if (selectedOption) {
      const selectedLoc = locations.find(
        (loc) => loc.value === selectedOption.value
      );
      fetchShops(selectedLoc.latitude, selectedLoc.longitude);
    }
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
          // Trigger fetching shops when location is fetched
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
        "https://erpserver.tazk.in/locstoUser/nearbyshops",
        payload
      );
      setShops(response.data); // Adjust according to the actual response structure
      // Filter mobile shops
      const filteredMobileShops = response.data.filter(
        (shop) => shop.company_type === 1 // Assuming company_type 1 means mobile shops
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

  const fetchTrendingProducts = async () => {
    try {
      const response = await axios.get(
        "https://erpserver.tazk.in/locstoProduct/trending?user_id=&page=0&per_page=100"
      );
      // Assuming response.data contains 'data' field with products array
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

  // const handleShopClick = (companyId, userId) => {
  //   const shop = mobileShops.find((shop) => shop.company_id === companyId);
  //   if (shop) {
  //     // Navigate to shop details page and pass shop object as state
  //     navigate(`/shop/${companyId}/${userId}`, { state: { shop } });
  //   } else {
  //     console.error(
  //       `Shop with companyId ${companyId} not found in mobileShops.`
  //     );
  //   }
  // };

  const handleShopClick = async (companyId, personId) => {
    try {
      const response = await axios.post(
        `https://erpserver.tazk.in/locstoUser/companyProfile/${companyId}/${personId}`,
        {
          latitude: 12.001,
          longitude: 14.001,
        }
      );
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

  const fetchShopProducts = async (companyId) => {
    try {
      const response = await axios.post(
        `https://erpserver.tazk.in/locstoProduct/items/${companyId}?page=0&per_page=100`,
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

  // useEffect(() => {
  //   if (shop && shop.company_id) {
  //     fetchShopProducts(shop.company_id); // Fetch products when shop details are available
  //   } else {
  //     setError("Shop information is not available.");
  //     setLoading(false);
  //   }
  // }, [shop]);

  return (
    <>
      <div>
        <header className="h-[269px] xl:px-24 pt-4 bg bg-cover bg-center bg-no-repeat bannerMobile">
          <div className="flex xl:justify-between items-center headerMobile">
            <div className="flex xl:gap-16 items-center locationMobile">
              <img src={logo} alt="Logo" />
              {/* <div>
                <button
                  className="flex items-center gap-4 bg-white px-4 py-1 rounded-lg"
                  onClick={fetchCurrentLocation}
                  onTouchStart={fetchCurrentLocation} // Add onTouchStart event
                >
                  <FaMapMarkerAlt className="bg-white" />
                  Location
                </button>
                {currentLocation && (
                  <div className="bg-white">
                    <p>
                      Current Location: {currentLocation.latitude},{" "}
                      {currentLocation.longitude}
                    </p>
                  </div>
                )}
              </div> */}
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
              className="pr-2"
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
