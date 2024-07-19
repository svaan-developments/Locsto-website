import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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

const ProductDetails = () => {
  const location = useLocation();
  const { product, products } = location.state || {};

  console.log(products, "products detail search based");

  const [searchText, setSearchText] = useState("");

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
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

  const phoneNumber = "8754770098";

  const isMobileDevice = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };

  const whatsappUrl = isMobileDevice()
    ? `https://wa.me/${phoneNumber}`
    : `https://web.whatsapp.com/send?phone=${phoneNumber}`;

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

      <section className="px-4 md:px-8 lg:px-16 xl:px-24 pt-10">
        <div className="flex flex-col gap-10 xl:flex-row">
          <div className="xl:w-1/2 sectionHeight mb-6 xl:mb-0 xl:mr-6">
            <h3 className="text-2xl font-bold mb-4">{product.name}</h3>
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
            <p className="mb-2 lowercase">{product.category}</p>
            <p className="font-bold text-Neutral text-[40px] mb-2">
              RS {product.unit_price}
            </p>
            {/* <p className="mb-2">Max Price: {product.max_price}</p> */}
          </div>
        </div>
      </section>

      {/* <section className="xl:px-24 pt-10 sectionHeight">
        <div className="flex gap-2">
          <h3>Available Shops</h3>
          <img className="" src={shopArrow} alt="Shop Arrow" />
        </div>
        <ul className="product-list-shops mt-10">
          {products.map((item, index) => (
            <li key={index} className="product-item-shops">
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
                      {(item.distance / 1000).toFixed(1)} km away
                    </p>
                  </div>
                </div>
                <p>{item.name}</p>
                <p>{item.address}</p>
                <div className="flex items-center gap-4 pt-2 w-[280px]">
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
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section> */}
    </>
  );
};

export default ProductDetails;
