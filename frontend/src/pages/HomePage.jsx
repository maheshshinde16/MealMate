import React from 'react';
import { Button, Row, Col, Card, Statistic } from 'antd';
import { ShoppingCartOutlined, TeamOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to MealMate</h1>
          <p className="tagline">Eat Together, Even Apart</p>
          <p className="description">
            Experience the next-generation food ordering platform designed for social dining.
            Order food, connect with friends, and enjoy meaningful moments together.
          </p>
          <Link to="/restaurants">
            <Button type="primary" size="large" className="cta-button">
              Order Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose MealMate?</h2>
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={12} md={8}>
            <Card className="feature-card">
              <TeamOutlined className="feature-icon" />
              <h3>Social Dining</h3>
              <p>
                Create virtual dining rooms and enjoy meals with friends, no matter where they are.
              </p>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Card className="feature-card">
              <ShoppingCartOutlined className="feature-icon" />
              <h3>Easy Ordering</h3>
              <p>
                Browse restaurants, customize your order, and get it delivered quickly to your doorstep.
              </p>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Card className="feature-card">
              <EnvironmentOutlined className="feature-icon" />
              <h3>Sustainable</h3>
              <p>
                Track your carbon footprint and make eco-friendly choices with every order.
              </p>
            </Card>
          </Col>
        </Row>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={12} md={6}>
            <Statistic
              title="Active Users"
              value={10}
              suffix="K+"
              valueStyle={{ color: '#ff6b35' }}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Statistic
              title="Restaurants"
              value={500}
              suffix="+"
              valueStyle={{ color: '#ff6b35' }}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Statistic
              title="Orders Delivered"
              value={100}
              suffix="K+"
              valueStyle={{ color: '#ff6b35' }}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Statistic
              title="Cities Covered"
              value={50}
              suffix="+"
              valueStyle={{ color: '#ff6b35' }}
            />
          </Col>
        </Row>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Experience MealMate?</h2>
        <p>Join thousands of food lovers enjoying social dining experiences.</p>
        <Link to="/restaurants">
          <Button type="primary" size="large" className="cta-button">
            Explore Restaurants
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
