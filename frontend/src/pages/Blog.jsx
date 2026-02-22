import React from 'react';
import { ClockCircleOutlined, UserOutlined, TagOutlined } from '@ant-design/icons';
import './Blog.css';

const Blog = () => {
  const featuredPost = {
    id: 1,
    title: 'The Future of Food Delivery: Trends Shaping 2026',
    excerpt: 'Explore how AI, sustainability, and hyper-local delivery are transforming the food delivery landscape.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=500&fit=crop&auto=format',
    author: 'Priya Sharma',
    date: 'Feb 15, 2026',
    readTime: '8 min read',
    category: 'Industry Insights'
  };

  const posts = [
    {
      id: 2,
      title: 'Top 10 Restaurants to Try in Mumbai This Month',
      excerpt: 'From street food gems to fine dining, discover the best culinary experiences Mumbai has to offer.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop&auto=format',
      author: 'Rahul Verma',
      date: 'Feb 12, 2026',
      readTime: '5 min read',
      category: 'Food Guide'
    },
    {
      id: 3,
      title: 'How We Ensure Food Safety During Delivery',
      excerpt: 'Behind the scenes look at our comprehensive safety protocols and quality standards.',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=300&fit=crop&auto=format',
      author: 'Anjali Patel',
      date: 'Feb 10, 2026',
      readTime: '6 min read',
      category: 'Company News'
    },
    {
      id: 4,
      title: 'Meet the Chefs: Stories from Our Partner Kitchens',
      excerpt: 'Inspiring journeys of culinary artists bringing authentic flavors to your doorstep.',
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb4c?w=400&h=300&fit=crop&auto=format',
      author: 'Vikram Singh',
      date: 'Feb 8, 2026',
      readTime: '7 min read',
      category: 'Stories'
    },
    {
      id: 5,
      title: 'Sustainable Packaging: Our Green Initiative',
      excerpt: 'How we\'re reducing plastic waste and pioneering eco-friendly delivery solutions.',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop&auto=format',
      author: 'Neha Kapoor',
      date: 'Feb 5, 2026',
      readTime: '5 min read',
      category: 'Sustainability'
    },
    {
      id: 6,
      title: 'Recipe of the Week: Butter Chicken at Home',
      excerpt: 'Master this beloved Indian classic with step-by-step instructions from expert chefs.',
      image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&h=300&fit=crop&auto=format',
      author: 'Chef Arjun',
      date: 'Feb 3, 2026',
      readTime: '4 min read',
      category: 'Recipes'
    },
    {
      id: 7,
      title: 'Building a Tech Platform That Feeds Millions',
      excerpt: 'Engineering insights on scaling microservices to handle peak demand.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop&auto=format',
      author: 'Tech Team',
      date: 'Feb 1, 2026',
      readTime: '10 min read',
      category: 'Technology'
    }
  ];

  const categories = ['All', 'Food Guide', 'Company News', 'Stories', 'Sustainability', 'Recipes', 'Technology', 'Industry Insights'];

  return (
    <div className="blog-page">
      {/* Hero Section */}
      <section className="blog-hero">
        <div className="hero-container">
          <h1 className="hero-title">MealMate Blog</h1>
          <p className="hero-subtitle">
            Food stories, industry insights, and the latest from the world of delivery
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="featured-section">
        <div className="container">
          <div className="featured-post">
            <div className="featured-image">
              <img src={featuredPost.image} alt={featuredPost.title} />
              <span className="featured-badge">Featured</span>
            </div>
            <div className="featured-content">
              <span className="post-category">{featuredPost.category}</span>
              <h2 className="featured-title">{featuredPost.title}</h2>
              <p className="featured-excerpt">{featuredPost.excerpt}</p>
              <div className="post-meta">
                <span className="meta-item">
                  <UserOutlined /> {featuredPost.author}
                </span>
                <span className="meta-item">
                  <ClockCircleOutlined /> {featuredPost.date}
                </span>
                <span className="meta-item">
                  <TagOutlined /> {featuredPost.readTime}
                </span>
              </div>
              <button className="read-more-btn">Read Article</button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="filter-section">
        <div className="container">
          <div className="category-filters">
            {categories.map((category) => (
              <button key={category} className={category === 'All' ? 'category-btn active' : 'category-btn'}>
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="posts-section">
        <div className="container">
          <div className="posts-grid">
            {posts.map((post) => (
              <article key={post.id} className="post-card">
                <div className="post-image">
                  <img src={post.image} alt={post.title} />
                  <span className="post-category">{post.category}</span>
                </div>
                <div className="post-content">
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-excerpt">{post.excerpt}</p>
                  <div className="post-meta">
                    <span className="meta-item">
                      <UserOutlined /> {post.author}
                    </span>
                    <span className="meta-item">
                      <ClockCircleOutlined /> {post.date}
                    </span>
                  </div>
                  <span className="read-time">{post.readTime}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-box">
            <h2>Subscribe to Our Newsletter</h2>
            <p>Get the latest food stories, recipes, and industry insights delivered to your inbox</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email address" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
