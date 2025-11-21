# Bookstore Backend API Documentation

Base URL: `http://localhost:3000`

## Table of Contents
- [Health Check](#health-check)
- [Authentication](#authentication)
- [Books](#books)
- [Categories](#categories)
- [Authors](#authors)
- [Publishers](#publishers)
- [Cart](#cart)
- [Orders](#orders)
- [Ratings](#ratings)
- [Payment Methods](#payment-methods)
- [Payments](#payments)

---

## Health Check

### Check Service Health
**GET** `/health`

**Response:**
```json
{
  "success": true,
  "message": "Service is healthy",
  "data": {
    "status": "ok"
  }
}
```

---

## Authentication

### Register
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe",
  "phone": "1234567890",
  "address": "123 Main St",
  "position": "Customer"
}
```

**Field Requirements:**
- `username` (required): 3-50 characters
- `email` (required): Valid email format
- `password` (required): Minimum 6 characters
- `fullName` (required): 2-100 characters
- `phone` (optional): Phone number
- `address` (optional): Address string
- `position` (optional): Position/title

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user-id",
      "username": "johndoe",
      "email": "user@example.com",
      "fullName": "John Doe",
      "phone": "1234567890",
      "address": "123 Main St",
      "position": "Customer",
      "role": "USER"
    },
    "token": "jwt-token"
  }
}
```

### Login
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user-id",
      "username": "johndoe",
      "email": "user@example.com",
      "fullName": "John Doe",
      "phone": "1234567890",
      "address": "123 Main St",
      "position": "Customer",
      "role": "USER"
    },
    "token": "jwt-token"
  }
}
```

### Get Profile
**GET** `/api/auth/profile`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user-id",
    "username": "johndoe",
    "email": "user@example.com",
    "fullName": "John Doe",
    "phone": "1234567890",
    "address": "123 Main St",
    "position": "Customer",
    "role": "USER",
    "createdAt": "2025-11-20T..."
  }
}
```

### Update Profile
**PUT** `/api/auth/profile`

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "fullName": "John Updated",
  "phone": "0987654321",
  "address": "456 New St",
  "position": "VIP Customer"
}
```

**Notes:**
- All fields are optional
- Only ADMIN users can update their own `position` field
- Regular users cannot modify `position`

---

## Books

### Get All Books
**GET** `/api/books`

**Query Parameters:**
- `search` (optional): Search by title
- `categoryId` (optional): Filter by category
- `authorId` (optional): Filter by author
- `publisherId` (optional): Filter by publisher

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "book-id",
      "title": "Book Title",
      "price": 29.99,
      "stock": 50,
      "description": "Book description",
      "imageUrl": "https://...",
      "category": {
        "id": "cat-id",
        "name": "Category Name"
      },
      "publisher": {
        "id": "pub-id",
        "name": "Publisher Name"
      },
      "authors": [
        {
          "id": "author-id",
          "name": "Author Name"
        }
      ]
    }
  ]
}
```

### Get Book by ID
**GET** `/api/books/:id`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "book-id",
    "title": "Book Title",
    "price": 29.99,
    "stock": 50,
    "description": "Book description",
    "imageUrl": "https://...",
    "category": { ... },
    "publisher": { ... },
    "authors": [ ... ],
    "ratings": [ ... ]
  }
}
```

### Create Book (Admin Only)
**POST** `/api/books`

**Headers:**
```
Authorization: Bearer {admin-token}
```

**Request Body:**
```json
{
  "title": "New Book",
  "price": 29.99,
  "stock": 100,
  "description": "Book description",
  "imageUrl": "https://...",
  "publisherId": "publisher-id",
  "categoryId": "category-id",
  "authorIds": ["author-id-1", "author-id-2"]
}
```

### Update Book (Admin Only)
**PATCH** `/api/books/:id`

**Headers:**
```
Authorization: Bearer {admin-token}
```

**Request Body:**
```json
{
  "title": "Updated Title",
  "price": 34.99,
  "stock": 75,
  "description": "Updated description"
}
```

### Delete Book (Admin Only)
**DELETE** `/api/books/:id`

**Headers:**
```
Authorization: Bearer {admin-token}
```

---

## Categories

### Get All Categories
**GET** `/api/categories`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "category-id",
      "name": "Fiction",
      "description": "Fiction books",
      "_count": {
        "books": 150
      }
    }
  ]
}
```

### Get Category by ID
**GET** `/api/categories/:id`

### Create Category (Admin Only)
**POST** `/api/categories`

**Headers:**
```
Authorization: Bearer {admin-token}
```

**Request Body:**
```json
{
  "name": "Science Fiction",
  "description": "Science fiction books"
}
```

### Update Category (Admin Only)
**PATCH** `/api/categories/:id`

**Headers:**
```
Authorization: Bearer {admin-token}
```

**Request Body:**
```json
{
  "name": "Updated Name",
  "description": "Updated description"
}
```

### Delete Category (Admin Only)
**DELETE** `/api/categories/:id`

**Headers:**
```
Authorization: Bearer {admin-token}
```

---

## Authors

### Get All Authors
**GET** `/api/authors`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "author-id",
      "name": "Author Name",
      "bio": "Author biography",
      "_count": {
        "books": 25
      }
    }
  ]
}
```

### Get Author by ID
**GET** `/api/authors/:id`

### Create Author (Admin Only)
**POST** `/api/authors`

**Headers:**
```
Authorization: Bearer {admin-token}
```

**Request Body:**
```json
{
  "name": "New Author",
  "bio": "Author biography"
}
```

### Update Author (Admin Only)
**PATCH** `/api/authors/:id`

### Delete Author (Admin Only)
**DELETE** `/api/authors/:id`

---

## Publishers

### Get All Publishers
**GET** `/api/publishers`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "publisher-id",
      "name": "Publisher Name",
      "address": "Publisher Address",
      "phone": "1234567890",
      "email": "publisher@example.com",
      "_count": {
        "books": 200
      }
    }
  ]
}
```

### Get Publisher by ID
**GET** `/api/publishers/:id`

### Create Publisher (Admin Only)
**POST** `/api/publishers`

**Headers:**
```
Authorization: Bearer {admin-token}
```

**Request Body:**
```json
{
  "name": "New Publisher",
  "address": "123 Publisher St",
  "phone": "1234567890",
  "email": "publisher@example.com"
}
```

### Update Publisher (Admin Only)
**PATCH** `/api/publishers/:id`

### Delete Publisher (Admin Only)
**DELETE** `/api/publishers/:id`

---

## Cart

All cart endpoints require authentication.

### Get Cart
**GET** `/api/cart`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "cart-id",
    "userId": "user-id",
    "items": [
      {
        "id": "item-id",
        "quantity": 2,
        "book": {
          "id": "book-id",
          "title": "Book Title",
          "price": 29.99,
          "imageUrl": "https://..."
        }
      }
    ],
    "total": 59.98
  }
}
```

### Add to Cart
**POST** `/api/cart`

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "bookId": "book-id",
  "quantity": 2
}
```

### Update Cart Item
**PATCH** `/api/cart/items/:itemId`

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "quantity": 3
}
```

### Remove from Cart
**DELETE** `/api/cart/items/:itemId`

**Headers:**
```
Authorization: Bearer {token}
```

### Clear Cart
**DELETE** `/api/cart`

**Headers:**
```
Authorization: Bearer {token}
```

---

## Orders

All order endpoints require authentication.

### Create Order
**POST** `/api/orders`

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "paymentMethodId": "payment-method-id",
  "shippingAddress": "123 Shipping Address"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "id": "order-id",
    "userId": "user-id",
    "totalAmount": 59.98,
    "status": "PENDING",
    "isPaid": false,
    "shippingAddress": "123 Shipping Address",
    "items": [ ... ]
  }
}
```

### Get My Orders
**GET** `/api/orders`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "order-id",
      "totalAmount": 59.98,
      "status": "PENDING",
      "isPaid": false,
      "createdAt": "2025-11-20T...",
      "items": [ ... ]
    }
  ]
}
```

### Get All Orders (Admin Only)
**GET** `/api/orders/all`

**Headers:**
```
Authorization: Bearer {admin-token}
```

### Get Order by ID
**GET** `/api/orders/:id`

**Headers:**
```
Authorization: Bearer {token}
```

### Update Order Status (Admin Only)
**PATCH** `/api/orders/:id/status`

**Headers:**
```
Authorization: Bearer {admin-token}
```

**Request Body:**
```json
{
  "status": "PROCESSING"
}
```

**Valid Statuses:**
- `PENDING`
- `PROCESSING`
- `SHIPPED`
- `DELIVERED`
- `CANCELLED`

### Confirm Order (Admin Only)
**PATCH** `/api/orders/:id/confirm`

**Headers:**
```
Authorization: Bearer {admin-token}
```

**Request Body:**
```json
{
  "isPaid": true
}
```

---

## Ratings

### Get Ratings by Book
**GET** `/api/ratings/book/:bookId`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "rating-id",
      "rating": 5,
      "comment": "Great book!",
      "user": {
        "id": "user-id",
        "name": "John Doe"
      },
      "createdAt": "2025-11-20T..."
    }
  ]
}
```

### Get Book Average Rating
**GET** `/api/ratings/book/:bookId/average`

**Response:**
```json
{
  "success": true,
  "data": {
    "averageRating": 4.5,
    "totalRatings": 120
  }
}
```

### Get My Ratings
**GET** `/api/ratings/my-ratings`

**Headers:**
```
Authorization: Bearer {token}
```

### Get My Rating for Book
**GET** `/api/ratings/my-rating/:bookId`

**Headers:**
```
Authorization: Bearer {token}
```

### Create Rating
**POST** `/api/ratings`

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "bookId": "book-id",
  "rating": 5,
  "comment": "Excellent book!"
}
```

**Note:** Rating must be between 1 and 5.

### Update Rating
**PATCH** `/api/ratings/:id`

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "rating": 4,
  "comment": "Updated review"
}
```

### Delete Rating
**DELETE** `/api/ratings/:id`

**Headers:**
```
Authorization: Bearer {token}
```

### Get All Ratings (Admin Only)
**GET** `/api/ratings/all`

**Headers:**
```
Authorization: Bearer {admin-token}
```

### Delete Rating (Admin Only)
**DELETE** `/api/ratings/admin/:id`

**Headers:**
```
Authorization: Bearer {admin-token}
```

---

## Payment Methods

### Get All Payment Methods
**GET** `/api/payment-methods`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "payment-method-id",
      "name": "Credit Card",
      "description": "Pay with credit card",
      "isActive": true
    }
  ]
}
```

### Get Payment Method by ID
**GET** `/api/payment-methods/:id`

### Create Payment Method (Admin Only)
**POST** `/api/payment-methods`

**Headers:**
```
Authorization: Bearer {admin-token}
```

**Request Body:**
```json
{
  "name": "PayPal",
  "description": "Pay with PayPal",
  "isActive": true
}
```

### Update Payment Method (Admin Only)
**PATCH** `/api/payment-methods/:id`

**Headers:**
```
Authorization: Bearer {admin-token}
```

**Request Body:**
```json
{
  "name": "Updated Name",
  "description": "Updated description",
  "isActive": false
}
```

### Delete Payment Method (Admin Only)
**DELETE** `/api/payment-methods/:id`

**Headers:**
```
Authorization: Bearer {admin-token}
```

---

## Payments

### Process Payment
**POST** `/api/payments/:id/process`

**Description:** Process a payment for an order. The payment ID is provided in the URL.

**Headers:**
```
Authorization: Bearer {token}
```

**URL Parameters:**
- `:id` - The payment ID to process

**Request Body:**
```json
{
  "status": "COMPLETED"
}
```

**Valid Status Values:**
- `COMPLETED` - Payment successful
- `FAILED` - Payment failed

**Security:**
- ✅ User can only process their own payments
- ✅ Automatically verifies payment ownership
- ❌ Returns 401 if attempting to process another user's payment

**Response:**
```json
{
  "success": true,
  "message": "Payment completed successfully",
  "data": {
    "id": "payment-id",
    "orderId": "order-id",
    "paymentMethodId": "payment-method-id",
    "total": 59.98,
    "status": "COMPLETED",
    "paymentDate": "2025-11-20T...",
    "createdAt": "2025-11-20T...",
    "updatedAt": "2025-11-20T..."
  }
}
```

**Notes:**
- Payment status will be updated to the provided status
- If status is "COMPLETED", the associated order status will be automatically updated to "PROCESSING"
- Cannot process a payment that is already completed

---

## Error Responses

All endpoints may return error responses in the following format:

```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error information"
}
```

### Common HTTP Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required or failed
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource conflict (e.g., duplicate email)
- `422 Unprocessable Entity` - Validation error
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Server error

---

## Rate Limiting

API requests are rate-limited to prevent abuse:
- **Development**: 1000 requests per 15 minutes per IP
- **Production**: 100 requests per 15 minutes per IP

---

## Notes on API Design

- **No Pagination**: This API does not implement pagination. All list endpoints return complete results.
- If you need pagination in the future, consider adding `page` and `limit` query parameters with `skip` and `take` in Prisma queries.

---

## Testing the API

### Using the HTML Tester
Open `api-tester.html` in your browser to use the interactive API testing interface.

### Using cURL

**Example: Get all books**
```bash
curl http://localhost:3000/api/books
```

**Example: Login**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

**Example: Get profile (authenticated)**
```bash
curl http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman or Thunder Client

Import the endpoints from this documentation or use the HTML tester for a quick start.

---

## Notes

- All timestamps are in ISO 8601 format
- All monetary values are in decimal format (e.g., 29.99)
- IDs are UUIDs (strings)
- Passwords are hashed using bcrypt
- JWT tokens expire after a configured period

---

**Last Updated:** 2025-11-20
