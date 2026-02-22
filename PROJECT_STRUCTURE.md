# MealMate - Project Structure

## Complete Folder Structure

```
MealMate/
│
├── backend/                          # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/
│   │   │   │       └── mealmate/
│   │   │   │           ├── MealMateApplication.java
│   │   │   │           │
│   │   │   │           ├── config/              # Configuration Classes
│   │   │   │           │   ├── SecurityConfig.java
│   │   │   │           │   ├── MongoConfig.java
│   │   │   │           │   ├── RedisConfig.java
│   │   │   │           │   ├── SwaggerConfig.java
│   │   │   │           │   ├── WebSocketConfig.java
│   │   │   │           │   └── CorsConfig.java
│   │   │   │           │
│   │   │   │           ├── controller/          # REST Controllers
│   │   │   │           │   ├── AuthController.java
│   │   │   │           │   ├── UserController.java
│   │   │   │           │   ├── RestaurantController.java
│   │   │   │           │   ├── OrderController.java
│   │   │   │           │   ├── PaymentController.java
│   │   │   │           │   ├── DeliveryController.java
│   │   │   │           │   ├── RatingController.java
│   │   │   │           │   ├── SocialController.java
│   │   │   │           │   └── NotificationController.java
│   │   │   │           │
│   │   │   │           ├── service/             # Business Logic
│   │   │   │           │   ├── AuthService.java
│   │   │   │           │   ├── UserService.java
│   │   │   │           │   ├── RestaurantService.java
│   │   │   │           │   ├── OrderService.java
│   │   │   │           │   ├── PaymentService.java
│   │   │   │           │   ├── DeliveryService.java
│   │   │   │           │   ├── RatingService.java
│   │   │   │           │   ├── SocialService.java
│   │   │   │           │   ├── NotificationService.java
│   │   │   │           │   ├── RecommendationService.java
│   │   │   │           │   └── SustainabilityService.java
│   │   │   │           │
│   │   │   │           ├── repository/          # Data Access Layer
│   │   │   │           │   ├── UserRepository.java
│   │   │   │           │   ├── RestaurantRepository.java
│   │   │   │           │   ├── OrderRepository.java
│   │   │   │           │   ├── PaymentRepository.java
│   │   │   │           │   ├── DeliveryRepository.java
│   │   │   │           │   ├── RatingRepository.java
│   │   │   │           │   ├── SocialRepository.java
│   │   │   │           │   └── NotificationRepository.java
│   │   │   │           │
│   │   │   │           ├── model/               # Domain Models
│   │   │   │           │   ├── User.java
│   │   │   │           │   ├── Address.java
│   │   │   │           │   ├── Restaurant.java
│   │   │   │           │   ├── Menu.java
│   │   │   │           │   ├── Order.java
│   │   │   │           │   ├── OrderItem.java
│   │   │   │           │   ├── Payment.java
│   │   │   │           │   ├── Delivery.java
│   │   │   │           │   ├── Driver.java
│   │   │   │           │   ├── Rating.java
│   │   │   │           │   ├── Review.java
│   │   │   │           │   ├── Notification.java
│   │   │   │           │   └── SocialConnection.java
│   │   │   │           │
│   │   │   │           ├── dto/                 # Data Transfer Objects
│   │   │   │           │   ├── request/
│   │   │   │           │   │   ├── LoginRequest.java
│   │   │   │           │   │   ├── RegisterRequest.java
│   │   │   │           │   │   ├── OrderRequest.java
│   │   │   │           │   │   └── PaymentRequest.java
│   │   │   │           │   │
│   │   │   │           │   └── response/
│   │   │   │           │       ├── AuthResponse.java
│   │   │   │           │       ├── UserResponse.java
│   │   │   │           │       ├── OrderResponse.java
│   │   │   │           │       └── ApiResponse.java
│   │   │   │           │
│   │   │   │           ├── security/            # Security Components
│   │   │   │           │   ├── JwtTokenProvider.java
│   │   │   │           │   ├── JwtAuthenticationFilter.java
│   │   │   │           │   ├── CustomUserDetailsService.java
│   │   │   │           │   └── UserPrincipal.java
│   │   │   │           │
│   │   │   │           ├── exception/           # Exception Handling
│   │   │   │           │   ├── GlobalExceptionHandler.java
│   │   │   │           │   ├── ResourceNotFoundException.java
│   │   │   │           │   ├── BadRequestException.java
│   │   │   │           │   └── UnauthorizedException.java
│   │   │   │           │
│   │   │   │           ├── util/                # Utility Classes
│   │   │   │           │   ├── DateUtils.java
│   │   │   │           │   ├── ValidationUtils.java
│   │   │   │           │   ├── DistanceCalculator.java
│   │   │   │           │   └── CarbonFootprintCalculator.java
│   │   │   │           │
│   │   │   │           └── websocket/           # WebSocket Handlers
│   │   │   │               ├── OrderTrackingHandler.java
│   │   │   │               └── LiveKitchenHandler.java
│   │   │   │
│   │   │   └── resources/
│   │   │       ├── application.yml              # Main Configuration
│   │   │       ├── application-dev.yml          # Development Config
│   │   │       ├── application-prod.yml         # Production Config
│   │   │       └── static/
│   │   │
│   │   └── test/
│   │       └── java/
│   │           └── com/
│   │               └── mealmate/
│   │                   ├── controller/          # Controller Tests
│   │                   ├── service/             # Service Tests
│   │                   └── integration/         # Integration Tests
│   │
│   ├── pom.xml                                  # Maven Dependencies
│   ├── Dockerfile                               # Docker Configuration
│   └── README.md
│
├── frontend/                         # React Frontend
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   ├── favicon.ico
│   │   ├── robots.txt
│   │   └── images/
│   │
│   ├── src/
│   │   ├── App.js                              # Root Component
│   │   ├── App.css
│   │   ├── index.js                            # Entry Point
│   │   ├── index.css
│   │   │
│   │   ├── components/                         # Reusable Components
│   │   │   ├── common/
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   └── Loader.jsx
│   │   │   │
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   ├── ForgotPassword.jsx
│   │   │   │   └── OTPVerification.jsx
│   │   │   │
│   │   │   ├── restaurant/
│   │   │   │   ├── RestaurantCard.jsx
│   │   │   │   ├── RestaurantList.jsx
│   │   │   │   ├── RestaurantDetail.jsx
│   │   │   │   ├── MenuList.jsx
│   │   │   │   ├── MenuItem.jsx
│   │   │   │   └── LiveKitchen.jsx
│   │   │   │
│   │   │   ├── order/
│   │   │   │   ├── Cart.jsx
│   │   │   │   ├── Checkout.jsx
│   │   │   │   ├── OrderSummary.jsx
│   │   │   │   ├── OrderTracking.jsx
│   │   │   │   └── OrderHistory.jsx
│   │   │   │
│   │   │   ├── payment/
│   │   │   │   ├── PaymentOptions.jsx
│   │   │   │   ├── PaymentGateway.jsx
│   │   │   │   └── PaymentSuccess.jsx
│   │   │   │
│   │   │   ├── social/
│   │   │   │   ├── DiningRoom.jsx
│   │   │   │   ├── FriendsList.jsx
│   │   │   │   ├── SocialFeed.jsx
│   │   │   │   ├── Challenges.jsx
│   │   │   │   └── Achievements.jsx
│   │   │   │
│   │   │   ├── profile/
│   │   │   │   ├── UserProfile.jsx
│   │   │   │   ├── AddressManager.jsx
│   │   │   │   ├── PaymentMethods.jsx
│   │   │   │   ├── Preferences.jsx
│   │   │   │   └── Wallet.jsx
│   │   │   │
│   │   │   └── admin/
│   │   │       ├── Dashboard.jsx
│   │   │       ├── UserManagement.jsx
│   │   │       ├── RestaurantManagement.jsx
│   │   │       ├── OrderManagement.jsx
│   │   │       └── Analytics.jsx
│   │   │
│   │   ├── pages/                              # Page Components
│   │   │   ├── HomePage.jsx
│   │   │   ├── RestaurantsPage.jsx
│   │   │   ├── SearchPage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── CheckoutPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── OrdersPage.jsx
│   │   │   ├── SocialPage.jsx
│   │   │   ├── NotFoundPage.jsx
│   │   │   └── AdminPage.jsx
│   │   │
│   │   ├── redux/                              # State Management
│   │   │   ├── store.js
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.js
│   │   │   │   ├── userSlice.js
│   │   │   │   ├── restaurantSlice.js
│   │   │   │   ├── cartSlice.js
│   │   │   │   ├── orderSlice.js
│   │   │   │   └── socialSlice.js
│   │   │   │
│   │   │   └── actions/
│   │   │       ├── authActions.js
│   │   │       ├── restaurantActions.js
│   │   │       └── orderActions.js
│   │   │
│   │   ├── services/                           # API Services
│   │   │   ├── api.js                          # Axios Configuration
│   │   │   ├── authService.js
│   │   │   ├── userService.js
│   │   │   ├── restaurantService.js
│   │   │   ├── orderService.js
│   │   │   ├── paymentService.js
│   │   │   ├── socialService.js
│   │   │   └── websocketService.js
│   │   │
│   │   ├── hooks/                              # Custom Hooks
│   │   │   ├── useAuth.js
│   │   │   ├── useCart.js
│   │   │   ├── useWebSocket.js
│   │   │   ├── useGeolocation.js
│   │   │   └── useDebounce.js
│   │   │
│   │   ├── utils/                              # Utility Functions
│   │   │   ├── constants.js
│   │   │   ├── helpers.js
│   │   │   ├── validators.js
│   │   │   ├── formatters.js
│   │   │   └── localStorage.js
│   │   │
│   │   ├── styles/                             # Styling
│   │   │   ├── variables.css
│   │   │   ├── global.css
│   │   │   └── theme.js
│   │   │
│   │   └── assets/                             # Static Assets
│   │       ├── images/
│   │       ├── icons/
│   │       └── fonts/
│   │
│   ├── .env.development                        # Development Environment
│   ├── .env.production                         # Production Environment
│   ├── package.json                            # NPM Dependencies
│   ├── Dockerfile                              # Docker Configuration
│   └── README.md
│
├── mobile/                           # React Native (Future)
│   └── (To be implemented)
│
├── docs/                             # Documentation
│   ├── API_DOCUMENTATION.md
│   ├── DEPLOYMENT_GUIDE.md
│   ├── CONTRIBUTING.md
│   └── USER_GUIDE.md
│
├── scripts/                          # Automation Scripts
│   ├── setup.sh                                # Initial Setup
│   ├── deploy.sh                               # Deployment Script
│   ├── seed-data.js                            # Database Seeding
│   └── backup.sh                               # Backup Script
│
├── docker/                           # Docker Configuration
│   ├── docker-compose.yml                      # Multi-container Setup
│   ├── docker-compose.dev.yml                  # Development Setup
│   └── docker-compose.prod.yml                 # Production Setup
│
├── kubernetes/                       # K8s Deployment (Future)
│   ├── deployments/
│   ├── services/
│   └── ingress/
│
├── .github/                          # GitHub Configuration
│   ├── workflows/
│   │   ├── ci.yml                              # Continuous Integration
│   │   ├── cd.yml                              # Continuous Deployment
│   │   └── tests.yml                           # Automated Testing
│   │
│   └── ISSUE_TEMPLATE.md
│
├── .gitignore
├── .dockerignore
├── README.md                         # Main Project README
├── REQUIREMENTS.md                   # Detailed Requirements
├── ARCHITECTURE.md                   # System Architecture
├── ER_DIAGRAM.md                     # Database Design
├── UNIQUE_FEATURES.md                # Differentiators
└── LICENSE
```

---

## Key Directories Explained

### Backend (`/backend`)
- **Config**: All Spring Boot configurations (Security, Database, WebSocket)
- **Controller**: REST API endpoints
- **Service**: Business logic layer
- **Repository**: MongoDB data access
- **Model**: Domain entities
- **DTO**: Request/Response objects for API
- **Security**: JWT authentication and authorization
- **Exception**: Centralized error handling
- **Util**: Helper functions
- **WebSocket**: Real-time communication handlers

### Frontend (`/frontend`)
- **Components**: Reusable UI components organized by feature
- **Pages**: Full page components
- **Redux**: Centralized state management
- **Services**: API integration layer
- **Hooks**: Custom React hooks
- **Utils**: Helper functions and constants
- **Styles**: Global styles and theming

### Documentation (`/docs`)
- API documentation
- Deployment guides
- Contributing guidelines
- User manuals

### Scripts (`/scripts`)
- Automation for setup, deployment, backups
- Database seeding scripts

### Docker (`/docker`)
- Multi-container orchestration
- Separate configs for dev and prod

---

## Environment Configuration

### Backend (`application.yml`)
```yaml
server:
  port: 8080

spring:
  application:
    name: mealmate-backend
  
  data:
    mongodb:
      uri: ${MONGODB_URI}
      database: mealmate
  
  redis:
    host: ${REDIS_HOST}
    port: ${REDIS_PORT}
  
  security:
    jwt:
      secret: ${JWT_SECRET}
      expiration: 86400000

razorpay:
  key: ${RAZORPAY_KEY}
  secret: ${RAZORPAY_SECRET}

google:
  maps:
    api-key: ${GOOGLE_MAPS_KEY}

aws:
  s3:
    bucket: ${S3_BUCKET}
    region: ${AWS_REGION}
```

### Frontend (`.env`)
```env
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_WEBSOCKET_URL=ws://localhost:8080/ws
REACT_APP_GOOGLE_MAPS_KEY=your_google_maps_key
REACT_APP_RAZORPAY_KEY=your_razorpay_key
REACT_APP_FIREBASE_API_KEY=your_firebase_key
```

---

## Git Branching Strategy

```
main                    # Production-ready code
  │
  ├── develop           # Integration branch
  │     │
  │     ├── feature/social-dining
  │     ├── feature/live-kitchen
  │     ├── feature/ai-recommendations
  │     ├── feature/sustainability
  │     │
  │     └── bugfix/order-tracking
  │
  └── hotfix/payment-gateway
```

---

## Module Development Priority

### Phase 1 (MVP - Weeks 1-4)
1. User Authentication & Authorization
2. Restaurant & Menu Management
3. Order Management
4. Basic Payment Integration
5. Order Tracking

### Phase 2 (Weeks 5-8)
6. Delivery Management
7. Rating & Review System
8. Notifications
9. User Profiles & Preferences

### Phase 3 (Weeks 9-12)
10. Social Features
11. Live Kitchen Streaming
12. AI Recommendations
13. Sustainability Tracking

### Phase 4 (Weeks 13-16)
14. Subscription Plans
15. Gamification
16. Advanced Analytics
17. Admin Dashboard

---

## Testing Strategy

### Backend Testing
- **Unit Tests**: JUnit 5 + Mockito (80%+ coverage)
- **Integration Tests**: Spring Boot Test
- **API Tests**: RestAssured
- **Load Tests**: JMeter

### Frontend Testing
- **Unit Tests**: Jest + React Testing Library
- **Integration Tests**: Cypress
- **E2E Tests**: Playwright
- **Visual Regression**: Percy

---

## Deployment Strategy

### Development
- Local Docker containers
- MongoDB local instance
- Redis local instance

### Staging
- AWS EC2 / Azure VMs
- MongoDB Atlas
- Redis Cloud
- CloudFlare CDN

### Production
- Kubernetes cluster
- MongoDB Atlas (production tier)
- Redis Cluster
- AWS S3 for media
- CloudFlare for CDN
- Jenkins for CI/CD

---

## Next Steps

1. ✅ Create project structure
2. ⏳ Initialize Git repository
3. ⏳ Set up backend with Spring Boot
4. ⏳ Set up frontend with React
5. ⏳ Configure MongoDB
6. ⏳ Implement authentication
7. ⏳ Build first API endpoints
8. ⏳ Create basic UI components
9. ⏳ Integrate frontend with backend
10. ⏳ Deploy to staging environment
