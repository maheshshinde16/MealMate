import React, { useEffect, useState } from 'react';
import { EnvironmentOutlined, HeartOutlined, StarOutlined, TrophyOutlined, GiftOutlined, CrownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import menuItemApi from '../api/menuItemApi';
import { useCart } from '../context/CartContext';
import './Explore.css';

const Explore = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [menuLoading, setMenuLoading] = useState(true);
  const { addToCart } = useCart();

  const handleAddToCart = (item) => {
    const success = addToCart(item, 1);
    if (success) {
      alert(`${item.name} added to cart!`);
    }
  };

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const items = await menuItemApi.getAllMenuItems();
        setMenuItems(Array.isArray(items) ? items : []);
      } catch (err) {
        setMenuItems([]);
      } finally {
        setMenuLoading(false);
      }
    };

    fetchMenuItems();
  }, []);
  const exploreSections = [
    {
      id: 1,
      icon: <EnvironmentOutlined />,
      title: 'Discover New Restaurants',
      description: 'Explore hidden gems and popular eateries in your neighborhood. From street food to fine dining, find your next favorite spot.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop&auto=format'
    },
    {
      id: 2,
      icon: <HeartOutlined />,
      title: 'Cuisines from Around the World',
      description: 'Satisfy your cravings with authentic cuisines from India, China, Italy, Mexico, and beyond. Adventure awaits in every bite.',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop&auto=format'
    },
    {
      id: 3,
      icon: <StarOutlined />,
      title: 'Top-Rated Picks',
      description: 'Browse restaurants and dishes loved by thousands of MealMate users. Let ratings and reviews guide your choice.',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop&auto=format'
    },
    {
      id: 4,
      icon: <TrophyOutlined />,
      title: 'Featured Collections',
      description: 'Curated lists for every occasion - comfort food, healthy options, dessert paradise, budget meals, and more.',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop&auto=format'
    }
  ];

  const benefits = [
    {
      icon: <GiftOutlined />,
      title: 'Exclusive Offers',
      description: 'Get access to app-only deals, discounts, and cashback rewards on every order.'
    },
    {
      icon: <CrownOutlined />,
      title: 'MealMate Plus',
      description: 'Join our premium membership for unlimited free delivery and extra savings.'
    },
    {
      icon: <StarOutlined />,
      title: 'Loyalty Rewards',
      description: 'Earn points with every order and redeem them for discounts and freebies.'
    }
  ];

  const collections = [
    {
      name: 'Weekend Brunch Specials',
      count: '45+ Restaurants',
      image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&h=300&fit=crop&auto=format'
    },
    {
      name: 'Midnight Cravings',
      count: '30+ Open Late',
      image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400&h=300&fit=crop&auto=format'
    },
    {
      name: 'Healthy & Nutritious',
      count: '60+ Options',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&auto=format'
    },
    {
      name: 'Best Street Food',
      count: '80+ Vendors',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop&auto=format'
    },
    {
      name: 'Dessert Paradise',
      count: '50+ Sweet Spots',
      image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=400&h=300&fit=crop&auto=format'
    },
    {
      name: 'Budget-Friendly Meals',
      count: '100+ Under ₹200',
      image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=400&h=300&fit=crop&auto=format'
    }
  ];

  return (
    <div className="explore-page">
      {/* Hero Section */}
      <section className="explore-hero">
        <div className="hero-container">
          <h1 className="hero-title">Explore With MealMate</h1>
          <p className="hero-subtitle">
            Discover amazing food experiences, exclusive deals, and culinary adventures 
            waiting just around the corner
          </p>
          <button className="cta-btn">Start Exploring</button>
        </div>
      </section>

      {/* Main Sections */}
      <section className="explore-sections">
        <div className="container">
          {exploreSections.map((section, index) => (
            <div 
              key={section.id} 
              className={`explore-card ${index % 2 === 1 ? 'reverse' : ''}`}
            >
              <div className="explore-image">
                <img src={section.image} alt={section.title} />
              </div>
              <div className="explore-content">
                <div className="explore-icon">{section.icon}</div>
                <h2 className="explore-title">{section.title}</h2>
                <p className="explore-description">{section.description}</p>
                <button className="explore-btn">Explore Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="menu-items-section">
        <div className="container">
          <div className="section-header">
            <h2>Explore Meals</h2>
            <p>Fresh items added by restaurant partners</p>
          </div>
          {menuLoading ? (
            <p className="menu-loading">Loading menu items...</p>
          ) : (
            <div className="menu-items-grid">
              {menuItems.length > 0 ? (
                menuItems.map(item => (
                  <div key={item.id} className="menu-item-card">
                    <div className="menu-item-image">
                      <img
                        src={item.imageUrl || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop&auto=format'}
                        alt={item.name}
                      />
                    </div>
                    <div className="menu-item-body">
                      <div className="menu-item-top">
                        <h3>{item.name}</h3>
                        <span className="menu-item-price">₹{Number(item.price || 0).toFixed(2)}</span>
                      </div>
                      <p className="menu-item-vendor">{item.vendorName || 'Restaurant Partner'}</p>
                      {item.description && <p className="menu-item-desc">{item.description}</p>}
                      <div className="menu-item-footer">
                        <span className="menu-item-tag">{item.category || 'Menu Item'}</span>
                        <button 
                          className="add-to-cart-btn"
                          onClick={() => handleAddToCart(item)}
                          disabled={!item.available}
                        >
                          <ShoppingCartOutlined /> Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="menu-empty">No menu items yet. Check back soon!</p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <div className="section-header">
            <h2>More Ways to Save & Enjoy</h2>
            <p>Get the most out of every order with MealMate perks</p>
          </div>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-icon">{benefit.icon}</div>
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-description">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="collections-section">
        <div className="container">
          <div className="section-header">
            <h2>Popular Collections</h2>
            <p>Handpicked selections for every mood and occasion</p>
          </div>
          <div className="collections-grid">
            {collections.map((collection, index) => (
              <div key={index} className="collection-card">
                <div className="collection-image">
                  <img src={collection.image} alt={collection.name} />
                  <div className="collection-overlay">
                    <h3>{collection.name}</h3>
                    <p>{collection.count}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="explore-cta-section">
        <div className="cta-container">
          <h2>Ready to Start Your Food Journey?</h2>
          <p>Download the app and get ₹100 off on your first order</p>
          <button className="cta-btn">Browse Restaurants</button>
        </div>
      </section>
    </div>
  );
};

export default Explore;
