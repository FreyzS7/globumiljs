#!/bin/bash

# Deployment script for Globumil website
# Usage: ./deploy.sh [frontend|backend|both]

set -e

# Configuration
DOMAIN="https://hallobundapedia.id"
FTP_USER="hallobu1"
FTP_HOST="ftp.hallobundapedia.id"
REMOTE_PATH="/public_html"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

function deploy_frontend() {
    echo -e "${YELLOW}Deploying Frontend...${NC}"
    
    cd fe
    
    # Check if .env.production exists
    if [ ! -f .env.production ]; then
        echo -e "${RED}Error: .env.production not found!${NC}"
        echo "Please copy .env.production.example to .env.production and configure it."
        exit 1
    fi
    
    # Install dependencies and build
    echo "Installing dependencies..."
    npm install
    
    echo "Building static site..."
    npm run build:static
    
    # Check if build was successful
    if [ ! -d "out" ]; then
        echo -e "${RED}Error: Build failed! 'out' directory not found.${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}Frontend build completed!${NC}"
    echo "Please upload the contents of 'fe/out/' to your hosting."
    
    cd ..
}

function deploy_backend() {
    echo -e "${YELLOW}Deploying Backend...${NC}"
    
    # Create deployment directory
    rm -rf deploy_temp
    mkdir -p deploy_temp
    
    # Copy backend files
    echo "Copying backend files..."
    cp -r application deploy_temp/
    cp -r system deploy_temp/
    cp -r assets deploy_temp/
    cp -r uploads deploy_temp/
    cp index.php deploy_temp/
    cp .htaccess deploy_temp/
    
    # Remove development files
    find deploy_temp -name "*.log" -delete
    find deploy_temp -name ".DS_Store" -delete
    
    echo -e "${GREEN}Backend files prepared in deploy_temp/!${NC}"
    echo "Please upload the contents of 'deploy_temp/' to your hosting's public_html."
    
    echo -e "${YELLOW}Don't forget to:${NC}"
    echo "1. Update application/config/config.php with your domain"
    echo "2. Update application/config/database.php with production credentials"
    echo "3. Set proper file permissions for uploads/ directory"
    echo "4. Import your database to production"
}

function show_help() {
    echo "Usage: $0 [frontend|backend|both]"
    echo ""
    echo "Options:"
    echo "  frontend  - Build and prepare frontend for deployment"
    echo "  backend   - Prepare backend files for deployment"
    echo "  both      - Deploy both frontend and backend"
    echo ""
    echo "Before running, make sure to:"
    echo "1. Configure .env.production for frontend"
    echo "2. Have Node.js and npm installed"
    echo "3. Update domain settings in this script"
}

# Main script
case "$1" in
    frontend)
        deploy_frontend
        ;;
    backend)
        deploy_backend
        ;;
    both)
        deploy_frontend
        deploy_backend
        ;;
    *)
        show_help
        ;;
esac