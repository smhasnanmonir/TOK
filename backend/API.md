# TOK Backend API Reference

## Base URL

- Development: `http://localhost:8787`
- Production: `https://your-worker.your-subdomain.workers.dev`

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Authentication

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "password123"
}
```

#### Login User

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Get Current User

```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Products

#### Get All Products

```http
GET /api/products?page=1&limit=10&search=product&category=skincare&brand=cosrx
```

#### Get Product by ID

```http
GET /api/products/{id}
```

#### Create Product (Admin)

```http
POST /api/products
Content-Type: application/json

{
  "name": "Product Name",
  "description": "Product description",
  "price": 29.99,
  "brand": "Brand Name",
  "category": "Category",
  "imageUrl": "https://example.com/image.jpg",
  "stockQuantity": 100
}
```

#### Update Product (Admin)

```http
PUT /api/products/{id}
Content-Type: application/json

{
  "name": "Updated Product Name",
  "price": 39.99
}
```

#### Delete Product (Admin)

```http
DELETE /api/products/{id}
```

#### Get Products by Category

```http
GET /api/products/category/{category}?page=1&limit=10
```

#### Get Products by Brand

```http
GET /api/products/brand/{brand}?page=1&limit=10
```

### Orders

#### Get User Orders

```http
GET /api/orders?page=1&limit=10
Authorization: Bearer <token>
```

#### Get Order by ID

```http
GET /api/orders/{id}
Authorization: Bearer <token>
```

#### Create Order

```http
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {
      "productId": "product-id-1",
      "quantity": 2
    },
    {
      "productId": "product-id-2",
      "quantity": 1
    }
  ]
}
```

#### Update Order Status (Admin)

```http
PATCH /api/orders/{id}/status
Content-Type: application/json

{
  "status": "processing"
}
```

## Response Format

### Success Response

```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error message"
}
```

### Paginated Response

```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Query Parameters

### Pagination

- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10, max: 100)

### Product Filtering

- `search` (string): Search by product name
- `category` (string): Filter by category
- `brand` (string): Filter by brand

## Data Types

### User

```typescript
{
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Product

```typescript
{
  id: string;
  name: string;
  description?: string;
  price: number;
  brand: string;
  category: string;
  imageUrl?: string;
  stockQuantity: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Order

```typescript
{
  id: string;
  userId: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Order Item

```typescript
{
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  createdAt: Date;
}
```
