import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
import downArrow from "../assets/downArrow.svg";
import rightArrow from "../assets/rightArrow.svg";
import searchIcon from "../assets/search.svg";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Link } from "react-router-dom";

const ProductDetails = () => {
  const location = useLocation();
  const product = location.state?.product;
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

  // const getProductImages = (productImages) => {
  //   if (!productImages || productImages.length === 0) {
  //     return [];
  //   }
  //   return productImages.map((image) => ({
  //     original: image.img_url,
  //     thumbnail: image.img_url,
  //   }));
  // };

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
    </>
  );
};

export default ProductDetails;
