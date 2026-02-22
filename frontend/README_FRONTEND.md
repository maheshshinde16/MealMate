# MealMate Frontend

## Overview

MealMate Frontend is a modern React application built with Redux Toolkit for state management and Ant Design for UI components.

## Tech Stack

- **Framework**: React 18.x
- **State Management**: Redux Toolkit
- **Styling**: CSS3 + Ant Design
- **HTTP Client**: Axios
- **Routing**: React Router v6
- **Real-time**: Socket.io Client
- **Maps**: Google Maps React

## Project Structure

```
src/
├── components/       # Reusable components
├── pages/           # Page components
├── redux/           # State management (store, slices, actions)
├── services/        # API and external services
├── hooks/           # Custom React hooks
├── utils/           # Utility functions
├── styles/          # Global styles
└── assets/          # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.development
```

### Environment Configuration

Create `.env.development` file:

```env
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_WEBSOCKET_URL=ws://localhost:8080/ws
REACT_APP_GOOGLE_MAPS_KEY=your_key_here
REACT_APP_RAZORPAY_KEY=your_key_here
```

### Development Server

```bash
# Start development server
npm start
```

The app will be available at `http://localhost:3000`

### Build

```bash
# Build for production
npm run build
```

### Testing

```bash
# Run tests
npm test
```

## Features

### Implemented
- ✅ Home Page with Hero section
- ✅ Navigation Header and Footer
- ✅ Redux Store with slices for:
  - Authentication
  - User
  - Restaurants
  - Cart
  - Orders
  - Social
- ✅ API Integration setup (Axios)
- ✅ Custom Hooks (useAuth)
- ✅ Utility Functions and Constants

### Coming Soon
- 🔄 Restaurant Listing and Details
- 🔄 Menu Browsing
- 🔄 Cart Management
- 🔄 Checkout and Payment
- 🔄 Order Tracking
- 🔄 User Profile
- 🔄 Social Features
- 🔄 Real-time Updates (WebSocket)

## Component Architecture

### Common Components
- **Header**: Navigation and search
- **Footer**: Footer with links
- **Button**: Reusable button component
- **Modal**: Modal dialogs
- **Card**: Card container

### Feature Components
- **Auth**: Login, Register, OTP verification
- **Restaurant**: Restaurant listing, details, menu
- **Order**: Cart, checkout, order tracking
- **Payment**: Payment options, gateway
- **Social**: Dining rooms, friends, feed
- **Profile**: User profile, addresses, preferences
- **Admin**: Dashboard, management panels

## State Management (Redux)

### Store Structure

```
state: {
  auth: {
    user,
    token,
    isAuthenticated,
    loading,
    error
  },
  user: {
    profile,
    addresses,
    favorites,
    orders,
    loading,
    error
  },
  restaurant: {
    restaurants,
    selectedRestaurant,
    menu,
    filters,
    loading,
    error
  },
  cart: {
    items,
    restaurantId,
    pricing (subtotal, tax, delivery, discount),
    total
  },
  order: {
    orders,
    currentOrder,
    orderStatus,
    deliveryStatus,
    loading,
    error
  },
  social: {
    friends,
    diningRooms,
    challenges,
    achievements,
    feed,
    loading,
    error
  }
}
```

## API Integration

All API calls go through `/src/services/api.js` which:
- Configures Axios with base URL
- Adds JWT token to requests
- Handles 401 unauthorized responses
- Centralizes error handling

### Services Available
- `authService.js` - Authentication endpoints
- `restaurantService.js` - Restaurant endpoints
- `orderService.js` - Order endpoints
- More services coming soon

## Custom Hooks

- `useAuth()` - Authentication state and methods

## Styling

- Global styles in `src/index.css`
- Component-specific CSS in respective folders
- Ant Design theme customization in `App.js`

### Theme Colors
- Primary: #ff6b35 (Orange)
- Secondary: #e55a23 (Dark Orange)
- Background: #f5f5f5 (Light Gray)

## Responsive Design

- Mobile-first approach
- Breakpoints:
  - xs: < 576px
  - sm: 576px - 767px
  - md: 768px - 991px
  - lg: 992px - 1199px
  - xl: ≥ 1200px

## Performance Optimization

- Code splitting with React.lazy()
- Component memoization with React.memo()
- Redux selector optimization
- Image optimization
- Lazy loading

## Best Practices

1. **Component Structure**
   - Functional components with hooks
   - Separation of concerns
   - Reusable components

2. **State Management**
   - Redux for global state
   - Local state for component state
   - Redux Toolkit for reducers

3. **API Calls**
   - Centralized in services
   - Error handling
   - Loading states

4. **Styling**
   - BEM naming convention
   - Mobile-first responsive design
   - Consistent spacing and colors

## Deployment

### Docker

```bash
docker build -t mealmate-frontend .
docker run -p 3000:3000 mealmate-frontend
```

### Vercel/Netlify

```bash
npm run build
# Push build folder to deployment platform
```

## Troubleshooting

### Port 3000 Already in Use
```bash
# Kill process on port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

### Dependencies Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Contributing

See [CONTRIBUTING.md](../../docs/CONTRIBUTING.md) for guidelines.

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please open a GitHub issue or contact support@mealmate.com
