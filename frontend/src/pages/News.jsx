import React from 'react';
import { ClockCircleOutlined, RightOutlined } from '@ant-design/icons';
import './News.css';

const News = () => {
  const featuredNews = {
    id: 1,
    title: 'MealMate Expands to 10 New Cities Across India',
    excerpt: 'We\'re thrilled to announce our expansion into 10 new cities, bringing delicious food delivery to millions more customers nationwide.',
    image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&h=500&fit=crop&auto=format',
    date: 'Feb 18, 2026',
    category: 'Expansion',
    badge: 'Latest'
  };

  const newsItems = [
    {
      id: 2,
      title: 'Introducing MealMate Plus: Premium Membership Program',
      excerpt: 'Get unlimited free delivery, exclusive discounts, and priority support with our new membership program.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&auto=format',
      date: 'Feb 15, 2026',
      category: 'Product Launch'
    },
    {
      id: 3,
      title: '5 Million Orders Milestone Achieved',
      excerpt: 'We\'ve crossed 5 million monthly orders, thanks to our amazing customers and restaurant partners.',
      image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=300&fit=crop&auto=format',
      date: 'Feb 12, 2026',
      category: 'Milestones'
    },
    {
      id: 4,
      title: 'New Partnerships with 500+ Premium Restaurants',
      excerpt: 'Exciting new restaurant partners join MealMate, bringing even more variety and quality to our platform.',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop&auto=format',
      date: 'Feb 10, 2026',
      category: 'Partnerships'
    },
    {
      id: 5,
      title: 'Green Delivery Initiative: 100% Eco-Friendly Packaging',
      excerpt: 'MealMate commits to sustainable future with transition to fully biodegradable packaging materials.',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop&auto=format',
      date: 'Feb 8, 2026',
      category: 'Sustainability'
    },
    {
      id: 6,
      title: 'AI-Powered Recommendations Now Live',
      excerpt: 'Experience personalized restaurant suggestions powered by advanced machine learning algorithms.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop&auto=format',
      date: 'Feb 5, 2026',
      category: 'Technology'
    },
    {
      id: 7,
      title: 'MealMate Raises $50M in Series B Funding',
      excerpt: 'Investment will fuel expansion, technology development, and support for restaurant partners.',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop&auto=format',
      date: 'Feb 1, 2026',
      category: 'Funding'
    },
    {
      id: 8,
      title: 'Winter Food Festival: Celebrating Regional Cuisines',
      excerpt: 'Join us for a month-long celebration of India\'s diverse culinary heritage with special menus and offers.',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop&auto=format',
      date: 'Jan 28, 2026',
      category: 'Events'
    },
    {
      id: 9,
      title: 'Safety First: Enhanced Hygiene Protocols',
      excerpt: 'New certification program ensures highest food safety standards across all partner restaurants.',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop&auto=format',
      date: 'Jan 25, 2026',
      category: 'Safety'
    }
  ];

  const pressReleases = [
    {
      title: 'MealMate Named "Best Food Delivery App 2026"',
      date: 'Feb 14, 2026',
      source: 'Tech Awards India'
    },
    {
      title: 'CEO Interview: Future of Food Delivery',
      date: 'Feb 10, 2026',
      source: 'Business Today'
    },
    {
      title: 'MealMate\'s Impact on Local Restaurant Economy',
      date: 'Feb 6, 2026',
      source: 'Economic Times'
    }
  ];

  return (
    <div className="news-page">
      {/* Hero Section */}
      <section className="news-hero">
        <div className="hero-container">
          <h1 className="hero-title">MealMate News</h1>
          <p className="hero-subtitle">
            Stay updated with the latest announcements, updates, and stories from MealMate
          </p>
        </div>
      </section>

      {/* Featured News */}
      <section className="featured-news-section">
        <div className="container">
          <div className="featured-news">
            <div className="featured-news-image">
              <img src={featuredNews.image} alt={featuredNews.title} />
              <span className="news-badge">{featuredNews.badge}</span>
            </div>
            <div className="featured-news-content">
              <span className="news-category">{featuredNews.category}</span>
              <h2 className="featured-news-title">{featuredNews.title}</h2>
              <p className="featured-news-excerpt">{featuredNews.excerpt}</p>
              <div className="news-meta">
                <span className="news-date">
                  <ClockCircleOutlined /> {featuredNews.date}
                </span>
              </div>
              <button className="read-more-btn">
                Read Full Story <RightOutlined />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="news-grid-section">
        <div className="container">
          <div className="section-header">
            <h2>Recent Updates</h2>
            <p>Latest news and announcements from MealMate</p>
          </div>

          <div className="news-grid">
            {newsItems.map((news) => (
              <article key={news.id} className="news-card">
                <div className="news-card-image">
                  <img src={news.image} alt={news.title} />
                  <span className="news-category">{news.category}</span>
                </div>
                <div className="news-card-content">
                  <h3 className="news-card-title">{news.title}</h3>
                  <p className="news-card-excerpt">{news.excerpt}</p>
                  <div className="news-footer">
                    <span className="news-date">
                      <ClockCircleOutlined /> {news.date}
                    </span>
                    <button className="news-link">
                      Read more <RightOutlined />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="press-section">
        <div className="container">
          <div className="section-header">
            <h2>In The Press</h2>
            <p>MealMate featured in leading publications</p>
          </div>

          <div className="press-list">
            {pressReleases.map((press, index) => (
              <div key={index} className="press-item">
                <div className="press-content">
                  <h3 className="press-title">{press.title}</h3>
                  <div className="press-meta">
                    <span className="press-source">{press.source}</span>
                    <span className="press-separator">•</span>
                    <span className="press-date">{press.date}</span>
                  </div>
                </div>
                <button className="press-link">
                  <RightOutlined />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="news-newsletter-section">
        <div className="newsletter-container">
          <h2>Stay in the Loop</h2>
          <p>Subscribe to get MealMate news and updates delivered to your inbox</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email address" />
            <button>Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;
