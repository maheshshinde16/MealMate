# MealMate - System Architecture Document

## 1. High-Level Architecture

### Architecture Pattern: **Microservices with API Gateway**

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Layer                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Web App    │  │  Mobile App  │  │  Vendor App  │          │
│  │  (React.js)  │  │ (React Native│  │  (React.js)  │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      CDN & Load Balancer                         │
│                    (CloudFlare / AWS CloudFront)                 │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                        API Gateway                               │
│              (Spring Cloud Gateway / Kong)                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  - Request Routing                                       │   │
│  │  - Authentication & Authorization                        │   │
│  │  - Rate Limiting                                         │   │
│  │  - API Versioning                                        │   │
│  │  - Request/Response Transformation                       │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                            │
            ┌───────────────┼───────────────┐
            │               │               │
            ▼               ▼               ▼
┌──────────────────────────────────────────────────────────────────┐
│                    Microservices Layer                            │
│                                                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Auth      │  │    User     │  │  Restaurant │             │
│  │  Service    │  │  Service    │  │   Service   │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Order     │  │  Payment    │  │  Delivery   │             │
│  │  Service    │  │  Service    │  │   Service   │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │ Notification│  │   Rating    │  │    AI/ML    │             │
│  │  Service    │  │  Service    │  │   Service   │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Social    │  │Sustainability│ │   Search    │             │
│  │  Service    │  │   Service   │  │   Service   │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└──────────────────────────────────────────────────────────────────┘
                            │
            ┌───────────────┼───────────────┐
            │               │               │
            ▼               ▼               ▼
┌─────────────────────────────────────────────────────────────────┐
│                       Data Layer                                 │
│                                                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │  MongoDB    │  │   Redis     │  │ Elasticsearch│            │
│  │  (Primary)  │  │  (Cache)    │  │   (Search)  │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   AWS S3    │  │  PostgreSQL │  │   InfluxDB  │             │
│  │  (Storage)  │  │ (Analytics) │  │ (Time Series│             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Message Queue Layer                           │
│                                                                   │
│  ┌─────────────┐  ┌─────────────┐                               │
│  │  RabbitMQ   │  │   Apache    │                               │
│  │  / Kafka    │  │   Kafka     │                               │
│  └─────────────┘  └─────────────┘                               │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                 Infrastructure & DevOps Layer                    │
│                                                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Docker    │  │ Kubernetes  │  │   Jenkins   │             │
│  │             │  │    (K8s)    │  │   (CI/CD)   │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   ELK       │  │ Prometheus  │  │   Grafana   │             │
│  │   Stack     │  │             │  │             │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Microservices Breakdown

### 2.1 Authentication Service
**Technology**: Spring Boot + Spring Security + JWT

**Responsibilities**:
- User registration and login
- Token generation and validation
- OAuth 2.0 integration
- Multi-factor authentication
- Session management
- Password reset

**Database**: MongoDB (users collection)

**APIs**:
- POST /auth/register
- POST /auth/login
- POST /auth/refresh-token
- POST /auth/forgot-password
- POST /auth/verify-otp
- GET /auth/logout

---

### 2.2 User Service
**Technology**: Spring Boot

**Responsibilities**:
- User profile management
- Address management
- Payment method management
- Preferences and settings
- Order history
- Favorites and saved items

**Database**: MongoDB (profiles, addresses, payment_methods)

**APIs**:
- GET /users/{userId}
- PUT /users/{userId}
- POST /users/{userId}/addresses
- GET /users/{userId}/order-history
- POST /users/{userId}/favorites

---

### 2.3 Restaurant Service
**Technology**: Spring Boot

**Responsibilities**:
- Restaurant CRUD operations
- Menu management
- Availability management
- Restaurant search and filtering
- Ratings aggregation
- Live kitchen streaming metadata

**Database**: MongoDB (restaurants, menus, cuisines)

**APIs**:
- GET /restaurants
- GET /restaurants/{id}
- GET /restaurants/{id}/menu
- POST /restaurants/{id}/menu/items
- PUT /restaurants/{id}/availability

---

### 2.4 Order Service
**Technology**: Spring Boot

**Responsibilities**:
- Order creation and management
- Cart management
- Group orders
- Order scheduling
- Order status tracking
- Subscription management

**Database**: MongoDB (orders, carts, subscriptions)

**Message Queue**: Kafka (order events)

**APIs**:
- POST /orders
- GET /orders/{orderId}
- PUT /orders/{orderId}/status
- POST /orders/group
- GET /orders/{orderId}/track

---

### 2.5 Payment Service
**Technology**: Spring Boot

**Responsibilities**:
- Payment processing
- Refund processing
- Wallet management
- Split payment
- Invoice generation
- Transaction history

**Database**: MongoDB (transactions, wallets)

**Third-Party**: Razorpay, Stripe

**APIs**:
- POST /payments/initiate
- POST /payments/verify
- POST /payments/refund
- GET /payments/{userId}/wallet
- POST /payments/split

---

### 2.6 Delivery Service
**Technology**: Spring Boot

**Responsibilities**:
- Delivery partner management
- Driver assignment (algorithm-based)
- Route optimization
- Real-time tracking
- Delivery status updates
- Multi-order batching

**Database**: MongoDB (deliveries, drivers, routes)

**Real-time**: WebSocket

**APIs**:
- POST /delivery/assign
- GET /delivery/{deliveryId}/track
- PUT /delivery/{deliveryId}/status
- GET /delivery/drivers/available

---

### 2.7 Notification Service
**Technology**: Spring Boot

**Responsibilities**:
- Push notifications (FCM)
- SMS notifications (Twilio)
- Email notifications (SendGrid)
- In-app notifications
- Notification preferences

**Database**: MongoDB (notifications, preferences)

**Message Queue**: Kafka (notification events)

**APIs**:
- POST /notifications/send
- GET /notifications/{userId}
- PUT /notifications/{notificationId}/read

---

### 2.8 Rating & Review Service
**Technology**: Spring Boot

**Responsibilities**:
- Rating submission
- Review management
- Rating aggregation
- Review moderation
- Vendor responses

**Database**: MongoDB (ratings, reviews)

**APIs**:
- POST /ratings
- GET /ratings/restaurant/{restaurantId}
- POST /reviews/{reviewId}/helpful
- POST /reviews/{reviewId}/response

---

### 2.9 AI/ML Service
**Technology**: Python (Flask/FastAPI) + TensorFlow/PyTorch

**Responsibilities**:
- Personalized recommendations
- Meal planning
- Demand forecasting
- Dynamic pricing
- Fraud detection
- Health-based suggestions

**Database**: PostgreSQL (ML models metadata)

**APIs**:
- GET /ai/recommendations/{userId}
- POST /ai/meal-plan
- GET /ai/trending

---

### 2.10 Social Service
**Technology**: Spring Boot

**Responsibilities**:
- Friend connections
- Virtual dining rooms
- Social feed
- Challenges and achievements
- Recipe sharing
- Activity tracking

**Database**: MongoDB (connections, posts, challenges)

**Real-time**: WebSocket

**APIs**:
- POST /social/friends
- POST /social/dining-room
- GET /social/feed
- POST /social/challenges

---

### 2.11 Sustainability Service
**Technology**: Spring Boot

**Responsibilities**:
- Carbon footprint calculation
- Eco-friendly tracking
- Green rewards
- Food waste monitoring
- Sustainability reports

**Database**: MongoDB (sustainability_metrics)

**APIs**:
- GET /sustainability/{orderId}/footprint
- GET /sustainability/{userId}/impact
- POST /sustainability/rewards

---

### 2.12 Search Service
**Technology**: Spring Boot + Elasticsearch

**Responsibilities**:
- Full-text search
- Faceted search
- Auto-suggestions
- Search analytics

**Database**: Elasticsearch

**APIs**:
- GET /search/restaurants
- GET /search/dishes
- GET /search/suggestions

---

## 3. Database Design Strategy

### 3.1 MongoDB Collections

#### Users Collection
```json
{
  "_id": "ObjectId",
  "email": "string",
  "phone": "string",
  "passwordHash": "string",
  "profile": {
    "firstName": "string",
    "lastName": "string",
    "avatar": "string",
    "dateOfBirth": "date"
  },
  "addresses": [
    {
      "id": "string",
      "type": "home|work|other",
      "street": "string",
      "city": "string",
      "state": "string",
      "zipCode": "string",
      "coordinates": {
        "lat": "number",
        "lng": "number"
      },
      "isDefault": "boolean"
    }
  ],
  "paymentMethods": [],
  "preferences": {
    "dietary": ["vegetarian", "vegan"],
    "allergens": [],
    "cuisines": []
  },
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

#### Restaurants Collection
```json
{
  "_id": "ObjectId",
  "name": "string",
  "description": "string",
  "cuisineTypes": ["Italian", "Continental"],
  "images": [],
  "location": {
    "address": "string",
    "coordinates": {
      "type": "Point",
      "coordinates": [lng, lat]
    }
  },
  "contact": {
    "phone": "string",
    "email": "string"
  },
  "timing": {
    "monday": { "open": "09:00", "close": "22:00" },
    "tuesday": { "open": "09:00", "close": "22:00" }
  },
  "ratings": {
    "overall": 4.5,
    "food": 4.6,
    "delivery": 4.4,
    "count": 1250
  },
  "menu": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "category": "string",
      "price": "number",
      "images": [],
      "nutrition": {
        "calories": "number",
        "protein": "number",
        "carbs": "number"
      },
      "tags": ["veg", "spicy"],
      "available": "boolean",
      "customizations": []
    }
  ],
  "sustainability": {
    "ecoFriendly": "boolean",
    "localSourcing": "boolean",
    "carbonScore": "number"
  },
  "isActive": "boolean",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

#### Orders Collection
```json
{
  "_id": "ObjectId",
  "orderNumber": "string",
  "userId": "ObjectId",
  "restaurantId": "ObjectId",
  "items": [
    {
      "menuItemId": "string",
      "name": "string",
      "quantity": "number",
      "price": "number",
      "customizations": []
    }
  ],
  "pricing": {
    "subtotal": "number",
    "tax": "number",
    "deliveryFee": "number",
    "discount": "number",
    "total": "number"
  },
  "deliveryAddress": {},
  "paymentDetails": {
    "method": "string",
    "status": "pending|completed|failed",
    "transactionId": "string"
  },
  "status": "placed|confirmed|preparing|out_for_delivery|delivered|cancelled",
  "timeline": [
    {
      "status": "string",
      "timestamp": "timestamp"
    }
  ],
  "deliveryDetails": {
    "driverId": "ObjectId",
    "estimatedTime": "timestamp",
    "actualTime": "timestamp"
  },
  "type": "single|group|subscription",
  "groupOrderId": "ObjectId",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

---

## 4. Communication Patterns

### 4.1 Synchronous (REST APIs)
- Client to API Gateway
- Service-to-service for immediate responses
- Admin operations

### 4.2 Asynchronous (Message Queue)
- Order placed → Notification Service
- Payment completed → Order Service
- Order status → Delivery Service
- Review posted → Rating aggregation

### 4.3 Real-time (WebSocket)
- Order tracking
- Live location updates
- Social features (virtual dining)
- Live kitchen streaming
- Chat support

---

## 5. Security Architecture

### 5.1 Authentication Flow
```
User → Login → Auth Service → JWT Token → Client stores token
Client → Request + JWT → API Gateway → Validates token → Routes to service
```

### 5.2 Authorization
- Role-based access control (RBAC)
- Resource-level permissions
- API rate limiting per user role

### 5.3 Data Security
- Encryption at rest (AES-256)
- Encryption in transit (TLS 1.3)
- PCI DSS compliance for payment data
- Password hashing (BCrypt)
- SQL injection protection (prepared statements)
- XSS protection (input sanitization)

---

## 6. Scalability Strategy

### 6.1 Horizontal Scaling
- Kubernetes for container orchestration
- Auto-scaling based on CPU/memory metrics
- Load balancing across multiple instances

### 6.2 Database Scaling
- MongoDB sharding for large collections
- Read replicas for read-heavy operations
- Redis caching for frequently accessed data
- Elasticsearch for search operations

### 6.3 Caching Strategy
- CDN for static assets
- Redis for:
  - Session data
  - Restaurant listings
  - Menu items
  - User preferences
- Cache invalidation on updates

---

## 7. Monitoring & Observability

### 7.1 Logging
- ELK Stack (Elasticsearch, Logstash, Kibana)
- Structured logging with correlation IDs
- Log levels: DEBUG, INFO, WARN, ERROR

### 7.2 Metrics
- Prometheus for metrics collection
- Grafana for visualization
- Custom business metrics:
  - Orders per minute
  - Active users
  - Revenue tracking

### 7.3 Tracing
- Distributed tracing with Jaeger/Zipkin
- Request flow across microservices

### 7.4 Health Checks
- Liveness probes
- Readiness probes
- Dependency health monitoring

---

## 8. Deployment Strategy

### 8.1 CI/CD Pipeline
```
Code Commit → GitHub → Jenkins → Build → Test → Docker Image → 
Push to Registry → Deploy to K8s → Health Check → Production
```

### 8.2 Environment Strategy
- Development
- Staging
- Production
- Disaster Recovery

### 8.3 Release Strategy
- Blue-Green deployment
- Canary releases for gradual rollout
- Feature flags for A/B testing

---

## 9. Disaster Recovery

### 9.1 Backup Strategy
- Automated MongoDB backups every 6 hours
- Point-in-time recovery capability
- Cross-region replication

### 9.2 High Availability
- Multi-AZ deployment
- Database replicas
- Circuit breaker pattern
- Graceful degradation

---

## 10. Technology Stack Summary

### Frontend
- **Framework**: React.js 18+
- **State Management**: Redux Toolkit
- **UI Library**: Material-UI / Ant Design
- **Maps**: Google Maps React
- **Real-time**: Socket.io-client
- **Build**: Webpack / Vite
- **Testing**: Jest, React Testing Library

### Backend
- **Framework**: Spring Boot 3.x
- **Language**: Java 17+
- **API Gateway**: Spring Cloud Gateway
- **Security**: Spring Security + JWT
- **Documentation**: Swagger/OpenAPI
- **Testing**: JUnit 5, Mockito

### Database
- **Primary**: MongoDB 6+
- **Cache**: Redis 7+
- **Search**: Elasticsearch 8+
- **Analytics**: PostgreSQL 15+
- **Time-series**: InfluxDB

### DevOps
- **Containerization**: Docker
- **Orchestration**: Kubernetes
- **CI/CD**: Jenkins / GitHub Actions
- **Monitoring**: Prometheus + Grafana
- **Logging**: ELK Stack
- **Cloud**: AWS / Azure / GCP

### Third-Party Services
- **Payment**: Razorpay, Stripe
- **SMS**: Twilio
- **Email**: SendGrid
- **Storage**: AWS S3
- **CDN**: CloudFlare
- **Maps**: Google Maps API
- **Push Notifications**: Firebase Cloud Messaging
