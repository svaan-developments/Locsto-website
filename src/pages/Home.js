import React, { useState } from 'react';
import logo from '../assets/logo.svg'
import downArrow from '../assets/downArrow.svg'
import rightArrow from '../assets/rightArrow.svg'
import { IoSearchOutline } from "react-icons/io5";
import search from '../assets/search.svg';
import filter from '../assets/filter.svg';
import Select from 'react-select';
import { FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';
import NearbyShops from '../assets/NearbyShops.svg';
import shopArrow from '../assets/shopArrow.svg';
import TrendingProducts from '../assets/TrendingProducts.svg';

const Home = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  const locations = [
    { value: 'new-york', label: 'New York' },
    { value: 'los-angeles', label: 'Los Angeles' },
    { value: 'chicago', label: 'Chicago' },
    // Add more locations as needed
  ];

  const handleSelectChange = (selectedOption) => {
    setSelectedLocation(selectedOption);
  };

  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
        // Optionally, you can fetch the address using a reverse geocoding API
      }, (error) => {
        console.error('Error fetching location: ', error);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const fetchAddress = async (latitude, longitude) => {
  const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
  const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`);
  if (response.data.results.length > 0) {
    const address = response.data.results[0].formatted_address;
    setCurrentLocation({ latitude, longitude, address });
  }
};

// Call fetchAddress inside fetchCurrentLocation function
navigator.geolocation.getCurrentPosition((position) => {
  const { latitude, longitude } = position.coords;
  fetchAddress(latitude, longitude);
}, (error) => {
  console.error('Error fetching location: ', error);
});

  return (
    <>
      <div>
        <header className="h-[269px] xl:px-24 pt-4 bg bgMobile bg-cover bg-center bg-no-repeat bannerMobile">
          <div className="flex xl:justify-between items-center">
            <div className="flex xl:gap-16 items-center">
              <img src={logo} />
              <div className='flex items-baseline gap-2'>
                <div className='text-white text-base font-medium'>Location</div>
                <img src={downArrow}></img>
                </div>
              {/* <div>
                <Select
                  value={selectedLocation}
                  onChange={handleSelectChange}
                  options={locations}
                  placeholder="Select a location"
                />
                <button onClick={fetchCurrentLocation}>
                  <FaMapMarkerAlt className="bg-white" /> Use Current Location
                </button>
                {currentLocation && (
                  <div>
                    <p>
                      Current Location: {currentLocation.latitude},{" "}
                      {currentLocation.longitude}
                    </p>
                  </div>
                )}
              </div> */}
            </div>
            <div>
              <button className="flex justify-center items-center w-[134px] h-[54px] bg-white gap-2 rounded-[100px] loginMobile">
                <a className="text-base font-semibold uppercase">Login</a>
                <img src={rightArrow} />
              </button>
            </div>
          </div>
        </header>

        <div className="relative">
          <div className="search-container">
            <img src={search} />
            <input
              type="text"
              className="search-input"
              placeholder="Search here"
            />
            <img src={filter} className="pr-2" />
          </div>
          {/* Nearby Shops */}
          <section className='xl:px-24 pt-10'>
            <div className='flex gap-2'>
            <h3>Nearby Shops</h3>
            <img className='' src={shopArrow} />
            </div>
            <img className='pt-6' src={NearbyShops} />
          </section>

          {/* Trending Products */}
          <section className='xl:px-24 pt-10'>
            <div className='flex gap-2'>
            <h3>Trending Products</h3>
            <img className='' src={shopArrow} />
            </div>
            <img className='pt-6' src={TrendingProducts} />
          </section>
        </div>
      </div>
    </>
  );
}

export default Home