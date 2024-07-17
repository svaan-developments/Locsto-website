// mobileDetails.jsx
import React from "react";

const MobileDetails = ({ shopId }) => {
  // Fetch mobile details based on shopId from API or other data source

  return (
    <div>
      <h2>Mobile Details</h2>
      <p>Shop ID: {shopId}</p>
      {/* Add more details here */}
    </div>
  );
};

export default MobileDetails;
