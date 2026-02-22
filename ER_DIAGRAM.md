# MealMate - Entity Relationship Diagram

## Database Schema Design

### Core Entities and Relationships

```
┌─────────────────────────────────────────────────────────────────────┐
│                        MealMate ER Diagram                           │
└─────────────────────────────────────────────────────────────────────┘

╔══════════════╗              ╔══════════════╗
║    USERS     ║              ║  ADDRESSES   ║
╠══════════════╣              ╠══════════════╣
║ _id          ║◆────────────<║ userId       ║
║ email        ║              ║ street       ║
║ phone        ║              ║ city         ║
║ passwordHash ║              ║ state        ║
║ firstName    ║              ║ zipCode      ║
║ lastName     ║              ║ coordinates  ║
║ avatar       ║              ║ type         ║
║ role         ║              ║ isDefault    ║
║ isActive     ║              ╚══════════════╝
║ createdAt    ║
║ updatedAt    ║              ╔══════════════╗
╚══════════════╝              ║ PAYMENT_     ║
       ║                      ║ METHODS      ║
       ║                      ╠══════════════╣
       ║                      ║ userId       ║
       ◆──────────────────────║ type         ║
                              ║ cardLast4    ║
                              ║ expiryDate   ║
                              ║ isDefault    ║
╔══════════════╗              ╚══════════════╝
║ RESTAURANTS  ║
╠══════════════╣              ╔══════════════╗
║ _id          ║              ║  MENUS       ║
║ name         ║◆────────────<║ restaurantId ║
║ description  ║              ║ name         ║
║ ownerId      ║──────────┐   ║ description  ║
║ cuisineTypes ║          │   ║ category     ║
║ location     ║          │   ║ price        ║
║ coordinates  ║          │   ║ images       ║
║ images       ║          │   ║ nutrition    ║
║ timing       ║          │   ║ tags         ║
║ ratings      ║          │   ║ available    ║
║ isActive     ║          │   ║ customOptions║
║ ecoFriendly  ║          │   ╚══════════════╝
║ createdAt    ║          │
╚══════════════╝          │
       ║                  │
       ║                  │   ╔══════════════╗
       ║                  │   ║   VENDORS    ║
       ║                  │   ╠══════════════╣
       ║                  └──>║ userId       ║
       ║                      ║ restaurantId ║
       ║                      ║ businessName ║
       ║                      ║ gstNumber    ║
       ║                      ║ bankDetails  ║
       ║                      ║ commission   ║
╔══════════════╗              ║ isVerified   ║
║   ORDERS     ║              ╚══════════════╝
╠══════════════╣
║ _id          ║
║ orderNumber  ║──────────┐
║ userId       ║────┐     │
║ restaurantId ║────│─────│───┐
║ items[]      ║    │     │   │
║ pricing      ║    │     │   │
║ deliveryAddr ║    │     │   │
║ paymentDetails    │     │   │
║ status       ║    │     │   │
║ type         ║    │     │   │
║ timeline[]   ║    │     │   │
║ deliveryId   ║────│─────│───│───┐
║ createdAt    ║    │     │   │   │
║ updatedAt    ║    │     │   │   │
╚══════════════╝    │     │   │   │
       ║            │     │   │   │
       ║            │     │   │   │
       ◆            │     │   │   │
       ║            ▼     │   │   │
╔══════════════╗  ╔═══════║═══║═══║══════╗
║ ORDER_ITEMS  ║  ║ USERS ║   ║   ║      ║
╠══════════════╣  ╠═══════╩═══╝   ║      ║
║ orderId      ║  ║ (Customer)    ║      ║
║ menuItemId   ║  ╚═══════════════╝      │
║ name         ║                         │
║ quantity     ║  ╔══════════════════════╝
║ price        ║  ║
║ customizations  ║
╚══════════════╝  ▼
                ╔══════════════╗
╔══════════════╗║ RESTAURANTS  ║
║  PAYMENTS    ║╠══════════════╣
╠══════════════╣║              ║
║ _id          ║╚══════════════╝
║ orderId      ║────┘
║ userId       ║
║ amount       ║
║ method       ║       ╔══════════════╗
║ status       ║       ║  DELIVERIES  ║
║ transactionId║       ╠══════════════╣
║ gateway      ║       ║ _id          ║────┐
║ refundAmount ║       ║ orderId      ║<───┘
║ createdAt    ║       ║ driverId     ║───┐
╚══════════════╝       ║ pickupLocation    │
                       ║ dropLocation ║   │
╔══════════════╗       ║ distance     ║   │
║   RATINGS    ║       ║ estimatedTime║   │
╠══════════════╣       ║ actualTime   ║   │
║ _id          ║       ║ status       ║   │
║ orderId      ║       ║ route        ║   │
║ userId       ║       ║ createdAt    ║   │
║ restaurantId ║       ╚══════════════╝   │
║ foodRating   ║                          │
║ deliveryRating        ╔══════════════╗  │
║ packagingRating       ║   DRIVERS    ║  │
║ overallRating║        ╠══════════════╣  │
║ review       ║        ║ userId       ║<─┘
║ images       ║        ║ vehicleType  ║
║ isVerified   ║        ║ vehicleNumber║
║ helpful      ║        ║ licenseNumber║
║ createdAt    ║        ║ currentLocation
╚══════════════╝        ║ isAvailable  ║
                        ║ ratings      ║
╔══════════════╗        ║ totalEarnings║
║ NOTIFICATIONS║        ║ bankDetails  ║
╠══════════════╣        ╚══════════════╝
║ _id          ║
║ userId       ║        ╔══════════════╗
║ type         ║        ║   CARTS      ║
║ title        ║        ╠══════════════╣
║ message      ║        ║ userId       ║
║ data         ║        ║ restaurantId ║
║ isRead       ║        ║ items[]      ║
║ sentAt       ║        ║ subtotal     ║
╚══════════════╝        ║ updatedAt    ║
                        ╚══════════════╝
╔══════════════╗
║ REVIEWS      ║        ╔══════════════╗
╠══════════════╣        ║ FAVORITES    ║
║ _id          ║        ╠══════════════╣
║ userId       ║        ║ userId       ║
║ restaurantId ║        ║ restaurantId ║
║ orderId      ║        ║ menuItemId   ║
║ rating       ║        ║ createdAt    ║
║ comment      ║        ╚══════════════╝
║ images       ║
║ vendorReply  ║        ╔══════════════╗
║ helpful      ║        ║SUBSCRIPTIONS ║
║ reported     ║        ╠══════════════╣
║ createdAt    ║        ║ userId       ║
╚══════════════╝        ║ restaurantId ║
                        ║ plan         ║
                        ║ frequency    ║
╔══════════════╗        ║ items[]      ║
║  COUPONS     ║        ║ deliveryDays ║
╠══════════════╣        ║ startDate    ║
║ _id          ║        ║ endDate      ║
║ code         ║        ║ status       ║
║ description  ║        ║ pricing      ║
║ discountType ║        ╚══════════════╝
║ discountValue║
║ minOrderValue║        ╔══════════════╗
║ maxDiscount  ║        ║   SOCIAL     ║
║ validFrom    ║        ║  CONNECTIONS ║
║ validTill    ║        ╠══════════════╣
║ usageLimit   ║        ║ userId       ║
║ usedCount    ║        ║ friendId     ║
║ isActive     ║        ║ status       ║
╚══════════════╝        ║ createdAt    ║
                        ╚══════════════╝
╔══════════════╗
║  WALLETS     ║        ╔══════════════╗
╠══════════════╣        ║ DINING_ROOMS ║
║ userId       ║        ╠══════════════╣
║ balance      ║        ║ _id          ║
║ transactions[]        ║ hostId       ║
║ updatedAt    ║        ║ participants[]
╚══════════════╝        ║ orderId      ║
                        ║ status       ║
╔══════════════╗        ║ createdAt    ║
║SUSTAINABILITY║        ╚══════════════╝
╠══════════════╣
║ orderId      ║        ╔══════════════╗
║ carbonFootprint       ║  CHALLENGES  ║
║ ecoPackaging ║        ╠══════════════╣
║ localSourcing║        ║ _id          ║
║ foodWaste    ║        ║ title        ║
║ greenPoints  ║        ║ description  ║
╚══════════════╝        ║ type         ║
                        ║ target       ║
╔══════════════╗        ║ reward       ║
║ ACHIEVEMENTS ║        ║ startDate    ║
╠══════════════╣        ║ endDate      ║
║ userId       ║        ║ participants[]
║ type         ║        ╚══════════════╝
║ title        ║
║ description  ║
║ badge        ║        ╔══════════════╗
║ earnedAt     ║        ║  ANALYTICS   ║
╚══════════════╝        ╠══════════════╣
                        ║ date         ║
╔══════════════╗        ║ metric       ║
║   SUPPORT    ║        ║ value        ║
║   TICKETS    ║        ║ dimension    ║
╠══════════════╣        ╚══════════════╝
║ _id          ║
║ userId       ║
║ orderId      ║
║ category     ║
║ subject      ║
║ description  ║
║ status       ║
║ priority     ║
║ assignedTo   ║
║ messages[]   ║
║ createdAt    ║
║ resolvedAt   ║
╚══════════════╝
```

---

## Relationships Summary

### One-to-Many Relationships

1. **Users → Addresses** (One user can have multiple addresses)
2. **Users → Payment Methods** (One user can have multiple payment methods)
3. **Users → Orders** (One user can place multiple orders)
4. **Restaurants → Menus** (One restaurant can have multiple menu items)
5. **Orders → Order Items** (One order can have multiple items)
6. **Users → Notifications** (One user can have multiple notifications)
7. **Users → Reviews** (One user can write multiple reviews)
8. **Restaurants → Reviews** (One restaurant can have multiple reviews)
9. **Users → Favorites** (One user can have multiple favorites)
10. **Users → Subscriptions** (One user can have multiple subscriptions)

### One-to-One Relationships

1. **Users → Vendors** (One user can be one vendor)
2. **Users → Drivers** (One user can be one driver)
3. **Users → Wallets** (One user has one wallet)
4. **Orders → Payments** (One order has one payment)
5. **Orders → Deliveries** (One order has one delivery)
6. **Orders → Ratings** (One order has one rating)
7. **Orders → Sustainability** (One order has one sustainability record)

### Many-to-Many Relationships

1. **Users ↔ Users** (Friends/Social Connections)
2. **Users ↔ Challenges** (Users can participate in multiple challenges)
3. **Users ↔ Dining Rooms** (Users can join multiple virtual dining rooms)

---

## Indexes for Performance

### Users Collection
```javascript
db.users.createIndex({ "email": 1 }, { unique: true })
db.users.createIndex({ "phone": 1 }, { unique: true })
db.users.createIndex({ "role": 1 })
```

### Restaurants Collection
```javascript
db.restaurants.createIndex({ "location.coordinates": "2dsphere" })
db.restaurants.createIndex({ "cuisineTypes": 1 })
db.restaurants.createIndex({ "ratings.overall": -1 })
db.restaurants.createIndex({ "isActive": 1 })
```

### Orders Collection
```javascript
db.orders.createIndex({ "userId": 1, "createdAt": -1 })
db.orders.createIndex({ "restaurantId": 1, "createdAt": -1 })
db.orders.createIndex({ "status": 1 })
db.orders.createIndex({ "orderNumber": 1 }, { unique: true })
```

### Menus Collection
```javascript
db.menus.createIndex({ "restaurantId": 1 })
db.menus.createIndex({ "category": 1 })
db.menus.createIndex({ "tags": 1 })
db.menus.createIndex({ "available": 1 })
```

### Deliveries Collection
```javascript
db.deliveries.createIndex({ "driverId": 1, "status": 1 })
db.deliveries.createIndex({ "orderId": 1 }, { unique: true })
db.deliveries.createIndex({ "status": 1 })
```

---

## Data Validation Rules

### Users Collection
- Email must be unique and valid format
- Phone must be unique and valid format
- Password must be hashed (BCrypt)
- Role must be: customer | vendor | driver | admin

### Orders Collection
- Status flow: placed → confirmed → preparing → out_for_delivery → delivered
- Payment status: pending → completed | failed
- Total amount must match sum of items + tax + delivery - discount

### Restaurants Collection
- Coordinates must be valid GeoJSON
- Ratings must be between 0 and 5
- Timing must cover all 7 days

### Payments Collection
- Amount must be positive
- Transaction ID must be unique
- Status: pending | success | failed | refunded

---

## Data Consistency Rules

1. **Order Placement**: Transaction across Orders, Payments, Cart, Inventory
2. **Delivery Assignment**: Update Order status and create Delivery record
3. **Rating Submission**: Update Order, Restaurant, and Driver ratings atomically
4. **Refund Processing**: Update Payment status and Wallet balance together
5. **Subscription Renewal**: Create new Order and update Subscription status

---

## Archival Strategy

### Hot Data (Recent 3 months)
- Orders
- Deliveries
- Payments
- Notifications

### Warm Data (3-12 months)
- Archived orders
- Transaction history
- Analytics data

### Cold Data (>12 months)
- Historical reports
- Audit logs
- Compliance data
