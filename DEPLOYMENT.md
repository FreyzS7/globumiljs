# Deployment Guide for Channamix Website

## Prerequisites
- Cloud hosting with Node.js support
- MySQL database
- FTP/SSH access to your hosting
- Domain name configured

## Frontend Deployment (Next.js SSG)

### 1. Configure Environment
```bash
cd fe
cp .env.production.example .env.production
# Edit .env.production with your actual domain
```

### 2. Build Static Site
```bash
npm install
npm run build:static
```

The build will create an `out` directory with all static files.

### 3. Upload to Hosting
- Upload the contents of `fe/out/` to your hosting's public_html or designated frontend directory
- If deploying to a subdirectory, update the basePath in next.config.js

## Backend Deployment (CodeIgniter)

### 1. Prepare Files
- Copy all files EXCEPT the `/fe` directory to your hosting's public_html
- Important directories:
  - `/application` - Core application files
  - `/assets` - Static assets
  - `/uploads` - User uploaded files
  - `/system` - CodeIgniter framework

### 2. Configure CodeIgniter

#### Update application/config/config.php:
```php
$config['base_url'] = 'https://yourdomain.com/';
```

#### Update application/config/database.php:
```php
$db['default'] = array(
    'hostname' => 'localhost',
    'username' => 'your_db_user',
    'password' => 'your_db_password',
    'database' => 'your_db_name',
    // ... other settings
);
```

### 3. Set File Permissions
```bash
chmod 755 uploads/
chmod 755 uploads/comments/
chmod 755 uploads/comments/attachments/
chmod 755 application/cache/
chmod 755 application/logs/
```

### 4. Database Setup
1. Export your local database:
   ```bash
   mysqldump -u root -p channamix > channamix_backup.sql
   ```

2. Import to production database:
   ```bash
   mysql -u your_db_user -p your_db_name < channamix_backup.sql
   ```

## Post-Deployment Checklist

### Frontend
- [ ] Verify all pages load correctly
- [ ] Check API connectivity
- [ ] Test image loading from uploads
- [ ] Verify SEO meta tags
- [ ] Check sitemap.xml generation

### Backend
- [ ] Test all API endpoints
- [ ] Verify file upload functionality
- [ ] Check CORS headers for your domain
- [ ] Test admin panel access
- [ ] Verify email functionality (if any)

### Security
- [ ] Enable HTTPS/SSL certificate
- [ ] Update CORS configuration to allow only your frontend domain
- [ ] Remove any debug information
- [ ] Secure admin routes
- [ ] Update .htaccess for production

## Troubleshooting

### Common Issues

1. **500 Internal Server Error**
   - Check .htaccess file
   - Verify PHP version compatibility
   - Check file permissions

2. **API Connection Failed**
   - Verify CORS headers in MY_Controller.php
   - Check API base URL in frontend .env
   - Ensure mod_rewrite is enabled

3. **Images Not Loading**
   - Check uploads directory permissions
   - Verify image paths in database
   - Update next.config.js image domains

## Maintenance

### Regular Tasks
- Backup database weekly
- Monitor error logs
- Update dependencies monthly
- Clean up old uploads

### Update Process
1. Test updates locally first
2. Backup production database
3. Deploy during low traffic hours
4. Keep rollback plan ready