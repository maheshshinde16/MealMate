import React from 'react';
import { Link } from 'react-router-dom';
import './VendorCard.css';

const VendorCard = ({ vendor }) => {
  return (
    <Link to={`/vendor/${vendor.id}`} className="vendor-card-link">
      <div className="vendor-card">
        <div className="vendor-image">
          <span className="vendor-emoji">🏪</span>
        </div>
        <div className="vendor-details">
          <h3 className="vendor-name">{vendor.name}</h3>
          <p className="vendor-cuisine">{vendor.cuisineType}</p>
          <p className="vendor-description">{vendor.description}</p>
          <div className="vendor-info">
            <span className="vendor-rating">
              ⭐ {vendor.rating || '4.5'}
            </span>
            <span className="vendor-address">📍 {vendor.address}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VendorCard;
