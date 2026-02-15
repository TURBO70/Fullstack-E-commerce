# Deploy to Railway

## Steps to Deploy:

1. **Go to Railway.app** and sign up/login

2. **Create a New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo" (recommended) OR "Empty Project"

3. **If using GitHub:**
   - Connect your GitHub account
   - Select your repository
   - Set the **Root Directory** to: `Fullstack-E-commerce/Backend`
   - Railway will auto-detect Node.js and run `npm start`

4. **If using Empty Project:**
   - Click "Empty Project"
   - Go to Settings → Source
   - Connect your GitHub repo
   - Set **Root Directory** to: `Fullstack-E-commerce/Backend`

5. **Environment Variables (Optional):**
   - Railway will automatically use PORT from environment
   - No additional env vars needed for basic setup

6. **Deploy:**
   - Railway will automatically build and deploy
   - Wait for deployment to complete

7. **Get Your Backend URL:**
   - Railway will provide a URL like: `https://your-project.up.railway.app`
   - Copy this URL - you'll need it for your frontend!

8. **Update Frontend:**
   - Update all `baseUrl` in your frontend services to use the Railway URL
   - Example: `private baseUrl = 'https://your-project.up.railway.app';`

## Admin Login Credentials:
- Email: `admin@gmail.com`
- Password: `Hassan_123`
- Role: `admin`

## API Endpoints:
Once deployed, your API will be available at:
- Products: `https://your-project.up.railway.app/products`
- Categories: `https://your-project.up.railway.app/categories`
- Users: `https://your-project.up.railway.app/users`
- Orders: `https://your-project.up.railway.app/orders`
- Carts: `https://your-project.up.railway.app/carts`

