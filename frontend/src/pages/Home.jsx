import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Home.css';

const Home = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1>Discover Delicious Meals Near You</h1>
            <p className="hero-subtitle">From Local Kitchens & Home Chefs to Your Doorstep</p>
            
            <div className="search-bar">
              <div className="search-input-group">
                <input 
                  type="text" 
                  placeholder="What would you like?" 
                  className="search-input"
                />
              </div>
              <div className="search-input-group">
                <input 
                  type="text" 
                  placeholder="Select Location" 
                  className="search-input"
                />
              </div>
              <button className="search-button">Search</button>
            </div>
          </div>
          
          <div className="hero-images">
            <div className="food-image">
              <img
                src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80"
                alt="Fresh salad bowl"
              />
            </div>
            <div className="food-image">
              <img
                src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80"
                alt="Gourmet burger"
              />
            </div>
            <div className="food-image">
              <img
                src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80"
                alt="Crispy dumplings"
              />
            </div>
            <div className="food-image">
              <img
                src="https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=800&q=80"
                alt="Spiced curry"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <div className="container">
          <div className="service-card">
            <div className="service-icon">
              <img
                src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=300&q=80"
                alt="Healthy meal"
              />
            </div>
            <h3>Healthy Meal Plans</h3>
            <p>Custom diet plans for a healthier you</p>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <img
                src="https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&w=300&q=80"
                alt="Chef plating dish"
              />
            </div>
            <h3>Home Chef Specials</h3>
            <p>Taste unique dishes from home kitchens</p>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <img
                src="https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=300&q=80"
                alt="Delivery rider"
              />
            </div>
            <h3>Fast Delivery Service</h3>
            <p>Quick & reliable delivery to your door</p>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="categories">
        <div className="container">
          <h2 className="section-title">Featured Categories</h2>
          <div className="categories-grid">
            <div className="category-card">
              <div className="category-image">
                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
                  alt="Daily combos"
                />
              </div>
              <h3>Daily Combos</h3>
            </div>
            <div className="category-card">
              <div className="category-image">
                <img
                  src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80"
                  alt="Fit and fresh meals"
                />
              </div>
              <h3>Fit & Fresh</h3>
            </div>
            <div className="category-card">
              <div className="category-image">
                <img
                  src="https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=600&q=80"
                  alt="Street food"
                />
              </div>
              <h3>Street Food</h3>
            </div>
            <div className="category-card">
              <div className="category-image">
                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
                  alt="Chef specials"
                />
              </div>
              <h3>Chef Specials</h3>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How MealMate Works</h2>
          <div className="steps-grid">
            <div className="step-card">
              {/* <div className="step-number">1</div> */}
              <div className="step-icon">
                <img 
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop&auto=format" 
                  alt="Browse & Choose"
                />
              </div>
              <h3>Browse & Choose</h3>
              <p>Explore menus from local vendors & chefs</p>
            </div>
            {/* <div className="step-arrow">→</div> */}
            <div className="step-card">
              {/* <div className="step-number">2</div> */}
              <div className="step-icon">
                <img 
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&auto=format" 
                  alt="Place Your Order"
                />
              </div>
              <h3>Place Your Order</h3>
              <p>Order easily & choose your delivery time</p>
            </div>
            {/* <div className="step-arrow">→</div> */}
            <div className="step-card">
              {/* <div className="step-number">3</div> */}
              <div className="step-icon">
                <img 
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop&auto=format" 
                  alt="Enjoy Your Meal"
                />
              </div>
              <h3>Enjoy Your Meal</h3>
              <p>Sit back & savor delicious food at home</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-content">
            {isAuthenticated ? (
              <>
                <h2>Ready for Your Next Meal, {user?.fullName?.split(' ')[0]}?</h2>
                <p>Explore Delicious Options from Top Restaurants & Home Chefs</p>
              </>
            ) : (
              <>
                <h2>Join MealMate Plus</h2>
                <p>Enjoy Exclusive Discounts & Meal Plans</p>
              </>
            )}
          </div>
          <Link to={isAuthenticated ? "/browse" : "/register"} className="cta-button">
            {isAuthenticated ? "Browse Restaurants" : "Get Started"}
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stat-card">
            <h3 className="stat-number">500+</h3>
            <p className="stat-label">Restaurants & Chefs</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-number">10K+</h3>
            <p className="stat-label">Happy Customers</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-number">15K+</h3>
            <p className="stat-label">Orders Delivered</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
