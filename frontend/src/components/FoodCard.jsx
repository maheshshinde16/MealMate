import React from 'react';
import Button from './Button';
import './FoodCard.css';

const FoodCard = ({ food, onAddToCart }) => {
  return (
    <div className="food-card">
      <div className="food-image">
        <span className="food-emoji">🍔</span>
      </div>
      <div className="food-details">
        <h3 className="food-name">{food.name}</h3>
        <p className="food-description">{food.description}</p>
        <div className="food-footer">
          <span className="food-price">${food.price}</span>
          <Button variant="primary" onClick={() => onAddToCart(food)}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
