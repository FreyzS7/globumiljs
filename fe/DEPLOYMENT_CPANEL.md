# cPanel Deployment Instructions for Next.js

## Method 1: Node.js Application (Recommended)

### Step 1: Upload Files
1. Upload all files from your `fe` folder to `/home/hallobu1/fe` (or your preferred directory)
2. Make sure `.env.production` file is uploaded and configured

### Step 2: Install Dependencies
```bash
cd /home/hallobu1/fe
npm install --production
```

### Step 3: Build the Application
```bash
npm run build
```

### Step 4: Configure Node.js App in cPanel
1. Go to cPanel → "Setup Node.js App"
2. Click "Create Application"
3. Configure:
   - Node.js version: 18.x or 20.x (avoid 22.x due to memory issues)
   - Application mode: Production
   - Application root: /home/hallobu1/fe
   - Application URL: Your domain or subdomain
   - Application startup file: server-simple.js
   - Passenger log file: Leave default

### Step 5: Environment Variables
In the Node.js app settings, add these environment variables:
- NODE_ENV=production
- PORT=(cPanel will assign this automatically)

### Step 6: Start the Application
Try these commands in order until one works:

Option 1 (Using Next.js built-in server):
```bash
npm start
```

Option 2 (Using simple custom server):
```bash
npm run start:simple
```

Option 3 (With memory limit):
```bash
node --max-old-space-size=256 server-simple.js
```

## Method 2: Static HTML Export (Alternative)

If Node.js continues to have memory issues:

### Step 1: Build Static Files Locally
```bash
# On your local machine
npm run build
npx next export
```

### Step 2: Upload Static Files
1. Upload the contents of the `out` folder to your public_html directory
2. Upload the `.htaccess` file for proper routing

### Step 3: Configure API URLs
Make sure your `.env.production` points to the correct API URLs

## Troubleshooting

### Memory Errors
- Use Node.js version 18.x or 20.x instead of 22.x
- Increase memory limit in cPanel if possible
- Use the simple server configuration

### 503 Errors
- Check Node.js app logs in cPanel
- Verify all dependencies are installed
- Ensure correct Node.js version
- Check if port is properly configured

### API Connection Issues
- Verify API URLs in .env.production
- Check CORS settings on your backend
- Ensure backend is accessible from frontend domain

## Important Notes
1. Your backend API must be running and accessible
2. CORS must be properly configured on the backend
3. All environment variables must be set correctly
4. Use HTTPS URLs in production for security