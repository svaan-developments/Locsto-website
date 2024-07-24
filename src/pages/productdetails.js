import React, { useState, useEffect } from "react";
import { Route, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
import downArrow from "../assets/downArrow.svg";
import rightArrow from "../assets/rightArrow.svg";
import shopArrow from "../assets/shopArrow.svg";
import searchIcon from "../assets/search.svg";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Link } from "react-router-dom";
import carKM from "../assets/car.svg";
import whatsapp from "../assets/whatsapp.svg";
import callBTN from "../assets/call_Icon.svg";
import messageBTN from "../assets/message_Icon.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import search from "../assets/search.svg";
import filter from "../assets/filter.svg";
import BackArrow from "../assets/BackArrow.svg";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, products: initialProducts } = location.state || {};
  const [searchText, setSearchText] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [products, setProducts] = useState(initialProducts);
  const [error, setError] = useState(null); // Add error state

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
    if (product) {
      console.log("Product data:", product);
    }
  }, [product]);

  if (!product) {
    return <p>Product not found</p>;
  }

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

  const getImages = (images) => {
    if (!images || images.length === 0) {
      return [];
    }
    return images.map((image) => ({
      original:
        image.img_url || `https://yourimagebaseurl.com/${image.image_path}`,
      thumbnail:
        image.img_url || `https://yourimagebaseurl.com/${image.image_path}`,
    }));
  };

  const phoneNumber = product.bussiness_whatsapp_number;

  const isMobileDevice = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };

  const whatsappUrl = isMobileDevice()
    ? `https://wa.me/${phoneNumber}`
    : `https://web.whatsapp.com/send?phone=${phoneNumber}`;

  // const handleShopClick = (companyId, userId) => {
  //   const shop = products.find((shop) => shop.company_id === companyId);
  //   if (shop) {
  //     navigate(`/shop/${companyId}/${userId}`, { state: { shop } });
  //   } else {
  //     console.error(`Shop with companyId ${companyId} not found in products.`);
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
      console.log("personId", personId); // Log the response data

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

  const handleBackClick = () => {
    navigate(-1); // This navigates back to the previous page
  };
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
        {/* <sectiom>
          <button className="flex items-center gap-4">
            <img src={BackArrow} />
            <p>Back</p>
          </button>
        </sectiom> */}
        <section className="px-4 md:px-8 lg:px-16 xl:px-24 pt-10">
          <button
            onClick={handleBackClick}
            className="flex items-center gap-4 py-4"
          >
            <img src={BackArrow} alt="Back" />
            <p>Back</p>
          </button>
          <div className="flex flex-col gap-10 xl:flex-row">
            <div className="xl:w-1/2 sectionHeight mb-6 xl:mb-0 xl:mr-6">
              {/* <h3 className="text-2xl font-bold mb-4">{product.name}</h3> */}
              {product.product_images && product.product_images.length > 0 ? (
                <ImageGallery
                  items={getProductImages(product.product_images)}
                  additionalClass="custom-gallery"
                />
              ) : (
                <p>No image available</p>
              )}
            </div>
            <div className="xl:w-1/2 pt-10">
              <p className="text-xl font-semibold mb-2 uppercase">
                {product.name}
              </p>
              <p className="mb-2">{product.description}</p>
              <p className="mb-2">{product.descript}</p>
              <p className="mb-2">{product.brand}</p>
              <div className="flex gap-2">
                <p className="text-DarkGray text-[16px] font-normal">
                  category:
                </p>
                <p className="mb-2 lowercase">{product.category}</p>
              </div>

              <p className="text-DarkGray text-[16px] font-normal">RAM: </p>
              <p className="text-DarkGray text-[16px] font-normal">
                Processor:{" "}
              </p>
              <p className="text-DarkGray text-[16px] font-normal">Camera: </p>
              <p className="font-bold text-Neutral text-[40px] mb-2">
                RS {product.unit_price}
              </p>
              {/* <p className="mb-2">Max Price: {product.max_price}</p> */}
            </div>
          </div>
        </section>

        {location.state.is_avalible && (
          <section className="xl:px-24 pt-10 sectionHeight">
            <div className="flex gap-2">
              <h3>Available Shops</h3>
              <img className="" src={shopArrow} alt="Shop Arrow" />
            </div>
            <ul className="product-list-shops mt-10">
              {products.map((item, index) => (
                <li
                  key={item} // Use unique key
                  onClick={() => handleShopClick(item.company_id, 157)}
                  className="product-item-shops"
                >
                  <div className="product-image-shops">
                    {item.shopImages && item.shopImages.length > 0 && (
                      <img
                        src={item.shopImages[0].img_url}
                        alt={`Shop image ${index + 1}`}
                        className="rounded-image-shops"
                      />
                    )}
                  </div>
                  <div className="product-details-shops mb-10">
                    <div className="flex gap-4 text-nowrap">
                      <p className="text-block text-[18px] font-semibold">
                        {item.company_name}
                      </p>
                      <div className="flex gap-2 text-gray">
                        <img src={carKM} />
                        <p className="text-nowrap">
                          {parseInt(item?.distance).toFixed(1)} km away
                          {console.log(item?.distance, "item?.distance")}
                        </p>
                      </div>
                    </div>
                    <p>{item.name}</p>
                    <p>{item.address}</p>
                    {/* <img src={whatsapp} /> */}
                    {/* WhatsApp link */}
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-4 pt-2 w-[280px]"
                    >
                      <img className="" src={messageBTN} alt="callBTN" />
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img className="" src={whatsapp} alt="WhatsApp" />
                      </a>
                      <button className="flex items-center gap-1 bg-primary px-8 py-2 rounded-[26px]">
                        <img className="" src={callBTN} alt="callBTN" />
                        <p className="text-white">Call</p>
                      </button>
                      {/* <img className="" src={callBTN} alt="callBTN" /> */}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </>
  );
};

export default ProductDetails;
