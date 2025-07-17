# TOK Backend

A modern backend API built with Hono, Drizzle ORM, and Cloudflare D1 for the TOK e-commerce platform.

## Features

- 🔐 JWT-based authentication
- 🛍️ Product management with categories and brands
- 📦 Order management system
- 🗄️ SQLite database with D1
- 🚀 Cloudflare Workers deployment
- 📝 TypeScript support
- 🔍 Search and filtering capabilities
- 📄 Pagination support

## Tech Stack

- **Framework**: Hono (Fast, lightweight web framework)
- **Database**: Cloudflare D1 (SQLite)
- **ORM**: Drizzle ORM
- **Authentication**: JWT
- **Deployment**: Cloudflare Workers
- **Language**: TypeScript

## Prerequisites

- Node.js 18+
- npm or yarn
- Cloudflare account
- Wrangler CLI

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Install Wrangler CLI

```bash
npm install -g wrangler
```

### 3. Login to Cloudflare

```bash
wrangler login
```

### 4. Create D1 Database

```bash
# Create development database
wrangler d1 create tok-db

# Create production database
wrangler d1 create tok-db-prod
```

### 5. Update Configuration

Update `wrangler.toml` with your database IDs:

```toml
[[d1_databases]]
binding = "DB"
database_name = "tok-db"
database_id = "your-development-database-id"

[env.production.d1_databases]
binding = "DB"
database_name = "tok-db-prod"
database_id = "your-production-database-id"
```

### 6. Set Environment Variables

```bash
# Set JWT secret
wrangler secret put JWT_SECRET
```

### 7. Run Database Migrations

```bash
# Generate migration files
npm run db:generate

# Apply migrations to development
npm run db:migrate

# Apply migrations to production
wrangler d1 migrations apply tok-db-prod --env production
```

### 8. Development

```bash
# Start development server
npm run dev
```

The API will be available at `http://localhost:8787`

### 9. Deployment

```bash
# Deploy to Cloudflare Workers
npm run deploy
```

## API Endpoints

### Authentication

#### POST `/api/auth/register`

Register a new user.

**Request Body:**

```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "password123"
}
```

#### POST `/api/auth/login`

Login user.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### GET `/api/auth/me`

Get current user info (requires Authorization header).

### Products

#### GET `/api/products`

Get all products with pagination and filtering.

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 100)
- `search` (optional): Search by product name
- `category` (optional): Filter by category
- `brand` (optional): Filter by brand

#### GET `/api/products/:id`

Get product by ID.

#### POST `/api/products`

Create new product (admin only).

**Request Body:**

```json
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

#### PUT `/api/products/:id`

Update product (admin only).

#### DELETE `/api/products/:id`

Delete product (soft delete, admin only).

#### GET `/api/products/category/:category`

Get products by category.

#### GET `/api/products/brand/:brand`

Get products by brand.

### Orders

#### GET `/api/orders`

Get user's orders (requires authentication).

#### GET `/api/orders/:id`

Get order by ID with items (requires authentication).

#### POST `/api/orders`

Create new order (requires authentication).

**Request Body:**

```json
{
  "items": [
    {
      "productId": "product-id",
      "quantity": 2
    }
  ]
}
```

#### PATCH `/api/orders/:id/status`

Update order status (admin only).

**Request Body:**

```json
{
  "status": "processing"
}
```

## Database Schema

### Users

- `id`: Primary key (UUID)
- `email`: Unique email address
- `name`: User's full name
- `password_hash`: Hashed password
- `created_at`: Timestamp
- `updated_at`: Timestamp

### Products

- `id`: Primary key (UUID)
- `name`: Product name
- `description`: Product description
- `price`: Product price
- `brand`: Brand name
- `category`: Product category
- `image_url`: Product image URL
- `stock_quantity`: Available stock
- `is_active`: Product availability
- `created_at`: Timestamp
- `updated_at`: Timestamp

### Orders

- `id`: Primary key (UUID)
- `user_id`: Foreign key to users
- `status`: Order status (pending, processing, shipped, delivered, cancelled)
- `total_amount`: Order total
- `created_at`: Timestamp
- `updated_at`: Timestamp

### Order Items

- `id`: Primary key (UUID)
- `order_id`: Foreign key to orders
- `product_id`: Foreign key to products
- `quantity`: Item quantity
- `price`: Item price at time of order
- `created_at`: Timestamp

## Environment Variables

- `JWT_SECRET`: Secret key for JWT token signing
- `DB`: D1 database binding (automatically set by Cloudflare)

## Development Commands

```bash
# Start development server
npm run dev

# Generate database migrations
npm run db:generate

# Apply migrations
npm run db:migrate

# Open Drizzle Studio
npm run db:studio

# Deploy to production
npm run deploy
```

## Error Handling

The API uses standardized error responses:

```json
{
  "success": false,
  "error": "Error message"
}
```

Common HTTP status codes:

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License
