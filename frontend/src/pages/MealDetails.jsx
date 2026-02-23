import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import menuItemApi from '../api/menuItemApi';
import { useCart } from '../context/CartContext';
import { getMealImageUrl } from '../config/mealImages';
import Loader from '../components/Loader';
import './MealDetails.css';

const MealDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getMealImage = (item) => {
    if (item?.imageUrl) return item.imageUrl;
    // Check if we have a specific image for this meal
    const specificImage = getMealImageUrl(item?.name);
    if (specificImage) return specificImage;
    // Fallback to dynamic Unsplash search if no specific mapping
    const mealName = item?.name || 'food';
    return `https://source.unsplash.com/featured/800x600/?${encodeURIComponent(mealName)}`;
  };

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const data = await menuItemApi.getMenuItemById(id);
        setMeal(data);
      } catch (err) {
        setError('Failed to load meal details');
      } finally {
        setLoading(false);
      }
    };

    fetchMeal();
  }, [id]);

  const handleAddToCart = () => {
    if (!meal) return;
    const success = addToCart(meal, 1);
    if (success) {
      alert(`${meal.name} added to cart!`);
    }
  };

  if (loading) return <Loader fullPage />;

  if (error) {
    return (
      <div className="meal-details">
        <p className="meal-error">{error}</p>
        <button className="meal-back-btn" onClick={() => navigate('/browse')}>
          Back to Browse
        </button>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="meal-details">
        <p className="meal-error">Meal not found</p>
        <button className="meal-back-btn" onClick={() => navigate('/browse')}>
          Back to Browse
        </button>
      </div>
    );
  }

  return (
    <div className="meal-details">
      <button className="meal-back-btn" onClick={() => navigate('/browse')}>
        Back to Browse
      </button>

      <div className="meal-details-card">
        <div className="meal-details-image">
          <img
            src={getMealImage(meal)}
            alt={meal.name}
            onError={(e) => {
              const mealName = meal?.name || 'food';
              e.target.src = `https://source.unsplash.com/featured/800x600/?${encodeURIComponent(mealName)}`;
            }}
          />
        </div>
        <div className="meal-details-content">
          <div className="meal-details-top">
            <h1>{meal.name}</h1>
            <span className="meal-price">₹{Number(meal.price || 0).toFixed(2)}</span>
          </div>
          <p className="meal-vendor">{meal.vendorName || 'Restaurant Partner'}</p>
          <p className="meal-description">
            {meal.description || 'Freshly prepared meal made with quality ingredients.'}
          </p>

          <div className="meal-meta">
            <span className={`meal-availability ${meal.available ? 'available' : 'unavailable'}`}>
              {meal.available ? 'Available now' : 'Currently unavailable'}
            </span>
          </div>

          <button
            className="meal-add-btn"
            onClick={handleAddToCart}
            disabled={!meal.available}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealDetails;
