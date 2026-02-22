# MealMate - Spring Boot Backend

## Overview
Spring Boot backend for MealMate food ordering and delivery platform using Java 17, Spring Boot 3.2, MySQL, and MongoDB.

## Technology Stack

### Core Framework
- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Data JPA**
- **Spring Security**

### Databases
- **MySQL** (Primary relational database)
- **MongoDB** (Optional for specific collections)
- **Redis** (Caching layer)

### Authentication & Security
- **JWT (JSON Web Tokens)** for stateless authentication
- **Bcrypt** for password encryption
- **Spring Security** for authorization

### Additional Libraries
- **Lombok** for reducing boilerplate code
- **Springdoc OpenAPI** for API documentation (Swagger)
- **Twilio** for SMS notifications
- **JavaMail** for email notifications

## Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/thynktech/mealmate/
│   │   │   ├── entity/           # JPA Entities
│   │   │   │   ├── User.java
│   │   │   │   ├── Restaurant.java
│   │   │   │   ├── Order.java
│   │   │   │   ├── MenuItem.java
│   │   │   │   ├── Review.java
│   │   │   │   ├── Payment.java
│   │   │   │   ├── Address.java
│   │   │   │   └── FavoriteRestaurant.java
│   │   │   │
│   │   │   ├── repository/       # Spring Data JPA Repositories
│   │   │   │   ├── UserRepository
│   │   │   │   ├── RestaurantRepository
│   │   │   │   ├── OrderRepository
│   │   │   │   └── ...
│   │   │   │
│   │   │   ├── service/          # Business Logic Services
│   │   │   │   ├── AuthenticationService
│   │   │   │   ├── EmailService
│   │   │   │   └── RestaurantService
│   │   │   │
│   │   │   ├── controller/       # REST Controllers
│   │   │   │   ├── AuthController
│   │   │   │   ├── RestaurantController
│   │   │   │   └── OrderController
│   │   │   │
│   │   │   ├── dto/              # Data Transfer Objects
│   │   │   │   ├── AuthDto
│   │   │   │   └── ...
│   │   │   │
│   │   │   ├── security/         # Security Configuration
│   │   │   │   ├── JwtTokenProvider
│   │   │   │   ├── JwtAuthenticationFilter
│   │   │   │   └── JwtAuthenticationEntryPoint
│   │   │   │
│   │   │   ├── config/           # Application Configuration
│   │   │   │   └── SecurityConfig
│   │   │   │
│   │   │   └── MealMateApplication.java
│   │   │
│   │   └── resources/
│   │       ├── application.yml   # Application configuration
│   │       └── ...
│   │
│   └── test/
│       └── java/...
│
├── pom.xml                       # Maven dependencies
└── README.md
```

## Setup Instructions

### Prerequisites
- Java 17 or higher
- Maven 3.8+
- MySQL 8.0+
- Redis (optional but recommended)

### Installation

1. **Clone the repository**
```bash
cd backend
```

2. **Install dependencies**
```bash
mvn clean install
```

3. **Configure Database**

Create MySQL database:
```sql
CREATE DATABASE mealmate;
```

Update `application.yml`:
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mealmate
    username: root
    password: your_password
```

4. **Configure JWT Secret**
```yaml
jwt:
  secret: your-secret-key-change-in-production
  expiration: 86400000
```

5. **Run the application**
```bash
mvn spring-boot:run
```

The server will start at `http://localhost:8080`

## API Documentation

### Swagger UI
Access Swagger documentation at: `http://localhost:8080/api/swagger-ui.html`

### Base URL
```
http://localhost:8080/api
```

## Available Endpoints

### Authentication
- `POST /auth/send-otp` - Send OTP to email/mobile
- `POST /auth/verify-otp` - Verify OTP and login
- `POST /auth/register` - Register new user
- `GET /auth/health` - Health check

### Restaurants (Coming Soon)
- `GET /restaurants` - Get all restaurants
- `GET /restaurants/{id}` - Get restaurant details
- `GET /restaurants/search` - Search restaurants
- `GET /restaurants/{id}/menu` - Get restaurant menu

### Orders (Coming Soon)
- `POST /orders` - Create new order
- `GET /orders` - Get user orders
- `GET /orders/{id}` - Get order details
- `PUT /orders/{id}/status` - Update order status

### Users (Coming Soon)
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update profile
- `GET /users/addresses` - Get delivery addresses
- `POST /users/addresses` - Add new address

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  mobile VARCHAR(20) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('CUSTOMER', 'VENDOR', 'DRIVER', 'ADMIN', 'SUPPORT'),
  status ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED', 'DELETED'),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  is_email_verified BOOLEAN DEFAULT FALSE,
  is_mobile_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Restaurants Table
```sql
CREATE TABLE restaurants (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  logo_url VARCHAR(255),
  cuisine_types VARCHAR(255),
  city VARCHAR(100) NOT NULL,
  state VARCHAR(50) NOT NULL,
  average_rating DECIMAL(3,2),
  delivery_charge DECIMAL(10,2),
  status ENUM('OPEN', 'CLOSED', 'OFFLINE', 'SUSPENDED'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Orders Table
```sql
CREATE TABLE orders (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  restaurant_id VARCHAR(36) NOT NULL,
  status ENUM('PLACED', 'CONFIRMED', 'PREPARING', 'READY', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'),
  payment_status ENUM('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'),
  total_amount DECIMAL(10,2) NOT NULL,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);
```

## Authentication Flow

1. **Send OTP**
   ```bash
   POST /api/auth/send-otp
   {
     "email": "user@example.com",
     "type": "email"
   }
   ```

2. **Verify OTP and Get Token**
   ```bash
   POST /api/auth/verify-otp
   {
     "email": "user@example.com",
     "otp": "123456"
   }
   ```

3. **Use Token in Requests**
   ```
   Authorization: Bearer <access_token>
   ```

## Environment Variables

Create `.env` file:
```
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
JWT_SECRET=your-secret-key
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=+1234567890
```

## Development Guidelines

### Code Style
- Follow Google Java Style Guide
- Use Lombok annotations for cleaner code
- Add meaningful comments and documentation

### Testing
```bash
mvn test
```

### Building JAR
```bash
mvn clean package
```

## Deployment

### Docker
```bash
docker build -t mealmate-backend:1.0 .
docker run -p 8080:8080 mealmate-backend:1.0
```

### Production Configuration
- Change JWT secret
- Enable HTTPS
- Configure proper database credentials
- Setup email service properly
- Configure payment gateway
- Enable logging

## Common Issues

### Port 8080 already in use
```bash
lsof -i :8080
kill -9 <PID>
```

### MySQL connection error
Ensure MySQL is running and credentials are correct in `application.yml`

### JWT token expired
Refresh token or login again

## Contributing
Follow the established code structure and naming conventions.

## License
MIT License - See LICENSE file for details

## Support
For issues and questions, please create a GitHub issue.

## Roadmap

### Phase 1 (Current)
- [x] Authentication with OTP
- [x] User entity and management
- [x] Restaurant entity
- [x] Order entity
- [ ] Complete CRUD operations

### Phase 2
- [ ] Restaurant management endpoints
- [ ] Order management endpoints
- [ ] Payment processing
- [ ] Real-time order tracking

### Phase 3
- [ ] Delivery partner endpoints
- [ ] Admin dashboard APIs
- [ ] Analytics endpoints
- [ ] WebSocket for real-time updates

### Phase 4
- [ ] Push notifications
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Advanced search and filters

## Version History
- **v1.0.0** (17-Feb-2026) - Initial release with authentication and core entities
