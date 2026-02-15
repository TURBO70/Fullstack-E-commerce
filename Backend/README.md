# E-commerce Backend (JSON Server)

This is a simple JSON Server backend that serves the `db.json` file.

## Setup

1. Install dependencies:
```bash
npm install
```

## Running the Server

Start the JSON server:
```bash
npm start
```

The server will run on `http://localhost:3000`

## API Endpoints

Once running, you can access:
- Products: `http://localhost:3000/products`
- Categories: `http://localhost:3000/categories`
- Users: `http://localhost:3000/users`
- Orders: `http://localhost:3000/orders`
- Carts: `http://localhost:3000/carts`

## Admin Login Credentials

From `db.json`:
- Email: `admin@gmail.com`
- Password: `Hassan_123`
- Role: `admin`

## For Production Deployment

You'll need to deploy this backend separately. Options:
1. **Railway** - Easy deployment
2. **Render** - Free tier available
3. **Heroku** - Paid plans
4. **Vercel** - Can use serverless functions

After deploying, update the `baseUrl` in your frontend services to point to the deployed backend URL.

