# Deploy to Railway

## Steps to Deploy:

1. **Go to Railway.app** and sign up/login

2. **Create a New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo" (recommended) OR "Empty Project"

3. **If using GitHub:**
   - Connect your GitHub account
   - Select your repository
   - Railway will start deploying

4. **Configure Root Directory (IMPORTANT):**
   - After the project is created, go to **Settings** tab
   - Scroll down to **Root Directory** section
   - Click "Set Root Directory"
   - Enter: `Fullstack-E-commerce/Backend`
   - Click "Save"
   - Railway will automatically redeploy with the new root directory

5. **Verify Build Settings:**
   - Railway should auto-detect:
     - **Build Command**: `npm install` (automatic)
     - **Start Command**: `npm start` (from package.json)
   - If not detected, go to Settings → Deploy and set:
     - Start Command: `npm start`

6. **Environment Variables (Optional):**
   - Railway automatically provides `PORT` - no need to set it
   - No additional env vars needed for basic setup

7. **Deploy:**
   - Railway will automatically build and deploy
   - Wait for deployment to complete

8. **Get Your Backend URL:**
   - Go to the **Settings** tab
   - Under **Domains**, you'll see your Railway URL
   - Or check the **Deployments** tab for the live URL
   - URL format: `https://your-project-name.up.railway.app`
   - Copy this URL - you'll need it for your frontend!

9. **Update Frontend:**
   - Update all `baseUrl` in your frontend services to use the Railway URL
   - Example: `private baseUrl = 'https://your-project-name.up.railway.app';`

## Visual Guide:

1. **After creating project** → Go to **Settings** tab
2. Scroll to **"Root Directory"** section
3. Click **"Set Root Directory"** button
4. Type: `Fullstack-E-commerce/Backend`
5. Click **"Save"**
6. Railway will redeploy automatically

## Admin Login Credentials:
- Email: `admin@gmail.com`
- Password: `Hassan_123`
- Role: `admin`

## API Endpoints:
Once deployed, your API will be available at:
- Products: `https://your-project-name.up.railway.app/products`
- Categories: `https://your-project-name.up.railway.app/categories`
- Users: `https://your-project-name.up.railway.app/users`
- Orders: `https://your-project-name.up.railway.app/orders`
- Carts: `https://your-project-name.up.railway.app/carts`

## Testing:
After deployment, test your API:
```bash
curl https://your-project-name.up.railway.app/products
```
