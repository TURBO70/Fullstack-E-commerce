# Deploy to Render

## Steps to Deploy:

1. **Go to Render.com** and sign up/login (use GitHub for easy setup)

2. **Create a New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub account if not already connected
   - Select your repository

3. **Configure the Service:**
   - **Name**: `e-commerce-backend` (or any name you prefer)
   - **Environment**: `Node`
   - **Region**: Choose closest to you
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `Fullstack-E-commerce/Backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or choose paid if needed)

4. **Environment Variables (Optional):**
   - Render automatically sets `PORT` - no need to add it manually
   - You can add `NODE_ENV=production` if needed

5. **Deploy:**
   - Click "Create Web Service"
   - Render will automatically build and deploy
   - Wait for deployment to complete (usually 2-5 minutes)

6. **Get Your Backend URL:**
   - Once deployed, Render will provide a URL like: `https://e-commerce-backend.onrender.com`
   - Copy this URL - you'll need it for your frontend!

7. **Update Frontend:**
   - Update all `baseUrl` in your frontend services to use the Render URL
   - Example: `private baseUrl = 'https://e-commerce-backend.onrender.com';`

## Important Notes:

- **Free Tier**: Render's free tier spins down after 15 minutes of inactivity. First request after spin-down may take 30-60 seconds.
- **Upgrade**: For production, consider upgrading to avoid spin-down delays.

## Admin Login Credentials:
- Email: `admin@gmail.com`
- Password: `Hassan_123`
- Role: `admin`

## API Endpoints:
Once deployed, your API will be available at:
- Products: `https://e-commerce-backend.onrender.com/products`
- Categories: `https://e-commerce-backend.onrender.com/categories`
- Users: `https://e-commerce-backend.onrender.com/users`
- Orders: `https://e-commerce-backend.onrender.com/orders`
- Carts: `https://e-commerce-backend.onrender.com/carts`

## Testing:
After deployment, test your API:
```bash
curl https://e-commerce-backend.onrender.com/products
```

