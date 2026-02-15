# Docker Setup Guide - GOTS Website
## Containerization for Local Development & Production

**Created:** January 18, 2025  
**Project:** Guardians of the Spear (GOTS)  
**Location:** `/Users/werby/GOTS_website/GOTS_website/Review/docker-setup.md`
**Base Image:** Node.js 22 Alpine

---

## TABLE OF CONTENTS

1. Docker Installation & Setup
2. Dockerfile Configuration
3. Development with Docker
4. Production Build
5. Docker Compose (Optional)
6. Deployment to Vercel
7. Troubleshooting

---

## 1. DOCKER INSTALLATION & SETUP

### Install Docker Desktop
- **macOS:** Download from [docker.com](https://www.docker.com/products/docker-desktop)
- **Windows:** Download Docker Desktop for Windows
- **Linux:** Install via package manager

### Verify Installation
```bash
docker --version
# Docker version 24.0.0+

docker run hello-world
# Should output: Hello from Docker!
```

### Docker Commands Quick Reference
```bash
docker build -t image_name .           # Build image
docker run -p 3000:3000 image_name     # Run container
docker ps                               # List running containers
docker logs container_id                # View logs
docker stop container_id                # Stop container
docker rm container_id                  # Remove container
docker exec -it container_id bash       # Access container shell
```

---

## 2. DOCKERFILE CONFIGURATION

### Development Dockerfile
**File:** `Dockerfile`

```dockerfile
# ============================================
# Stage 1: Dependencies
# ============================================
FROM node:22-alpine AS dependencies

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# ============================================
# Stage 2: Builder
# ============================================
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependencies from stage 1
COPY --from=dependencies /app/node_modules ./node_modules

# Copy source code
COPY . .

# Build Next.js app
RUN npm run build

# ============================================
# Stage 3: Runtime (Production)
# ============================================
FROM node:22-alpine AS runtime

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copy built app from builder
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package*.json ./
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Run app with dumb-init
ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "start"]
```

---

### .dockerignore File
**File:** `.dockerignore`

```
# Dependencies
node_modules
npm-debug.log

# Build
.next
dist
build
out

# Development
.env.local
.env.*.local
.git
.gitignore
.gitattributes

# IDE
.vscode
.idea
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Testing
.jest
coverage

# Documentation
README.md
CHANGELOG.md
LICENSE

# Git
.git
.github

# CI/CD
.github/workflows
.gitlab-ci.yml
.circleci

# Other
.eslintcache
.prettierignore
tsconfig.tsbuildinfo
```

---

## 3. DEVELOPMENT WITH DOCKER

### Build Docker Image
```bash
# Build image with tag
docker build -t gots_website:latest .

# Build with progress
docker build -t gots_website:1.0 --progress=plain .

# Build without cache
docker build --no-cache -t gots_website:latest .
```

### Run Docker Container (Development)
```bash
# Basic run
docker run -p 3000:3000 gots_website:latest

# Run with environment variables
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://..." \
  -e NEXT_PUBLIC_SITE_URL="http://localhost:3000" \
  gots_website:latest

# Run in background (detached)
docker run -d -p 3000:3000 --name gots_container gots_website:latest

# Run with volume mount (live reload)
docker run -p 3000:3000 \
  -v $(pwd)/src:/app/src \
  gots_website:latest

# Run with environment file
docker run -p 3000:3000 \
  --env-file .env.local \
  gots_website:latest
```

### Access Container
```bash
# Get container ID
docker ps

# Access shell
docker exec -it container_id bash

# View logs
docker logs container_id

# Follow logs
docker logs -f container_id

# View logs last 100 lines
docker logs --tail 100 container_id
```

### Stop & Remove Container
```bash
# Stop running container
docker stop container_id

# Remove container
docker rm container_id

# Stop and remove
docker stop container_id && docker rm container_id

# Stop all containers
docker stop $(docker ps -q)

# Remove all containers
docker rm $(docker ps -aq)
```

---

## 4. PRODUCTION BUILD

### Build for Production
```bash
# Build optimized image
docker build -t gots_website:v1.0 .

# Tag for registry
docker tag gots_website:v1.0 your-registry/gots_website:v1.0

# Push to registry
docker push your-registry/gots_website:v1.0
```

### Run Production Container
```bash
docker run -d \
  -p 3000:3000 \
  --name gots_prod \
  --restart always \
  -e NODE_ENV=production \
  -e DATABASE_URL="postgresql://..." \
  gots_website:v1.0
```

### Monitor Production Container
```bash
# Check container status
docker ps --filter "name=gots_prod"

# View logs
docker logs gots_prod -f

# Check health
docker inspect gots_prod | grep -A 5 "Health"

# Resource usage
docker stats gots_prod
```

---

## 5. DOCKER COMPOSE (Optional)

### Docker Compose File
**File:** `docker-compose.yml`

```yaml
version: '3.8'

services:
  # Next.js Application
  app:
    build: .
    container_name: gots_app
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: development
      DATABASE_URL: postgresql://user:password@postgres:5432/gots
      NEXT_PUBLIC_SITE_URL: http://localhost:3000
    depends_on:
      - postgres
    volumes:
      - ./src:/app/src
      - ./public:/app/public
    restart: unless-stopped

  # PostgreSQL Database (Optional)
  postgres:
    image: postgres:16-alpine
    container_name: gots_postgres
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: gots
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
    driver: local
```

### Docker Compose Commands
```bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild images
docker-compose up --build

# Run command in service
docker-compose exec app npm run build

# Scale service
docker-compose up --scale app=3
```

---

## 6. DEPLOYMENT TO VERCEL

### Deploy from Docker Image

Vercel supports deploying Docker images directly:

1. **Build and push image to registry**
```bash
# Build image
docker build -t your-registry/gots_website:latest .

# Push to Docker Hub or other registry
docker push your-registry/gots_website:latest
```

2. **Deploy on Vercel**
- Go to [vercel.com](https://vercel.com)
- Create new project
- Connect GitHub repository
- Vercel will automatically build and deploy

3. **Alternative: Use Vercel CLI**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Environment Variables on Vercel
1. Go to Project Settings
2. Click "Environment Variables"
3. Add variables:
   - `DATABASE_URL`
   - `NEXT_PUBLIC_SITE_URL`
   - `NODE_ENV=production`

---

## 7. TROUBLESHOOTING

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 PID

# Or use different port
docker run -p 3001:3000 gots_website:latest
```

### Build Failures
```bash
# Clear build cache
docker builder prune

# Rebuild without cache
docker build --no-cache -t gots_website:latest .

# Check Dockerfile syntax
docker run --rm -i hadolint/hadolint < Dockerfile
```

### Container Won't Start
```bash
# View error logs
docker logs container_id

# Run with interactive terminal
docker run -it gots_website:latest bash

# Check image layers
docker history gots_website:latest
```

### Permission Issues
```bash
# Check container user
docker exec container_id whoami

# Run as root (not recommended)
docker run --user root gots_website:latest

# Fix file permissions
docker exec container_id chown -R nextjs:nodejs /app
```

### Memory/Performance Issues
```bash
# Limit memory
docker run -m 512m gots_website:latest

# Check resource usage
docker stats

# Increase Docker memory allocation
# In Docker Desktop: Settings > Resources > Memory
```

---

## BEST PRACTICES

1. **Use multi-stage builds** - Keep final image small
2. **Use non-root user** - Run as nextjs user for security
3. **Minimize layers** - Combine RUN commands where possible
4. **Cache dependencies** - Copy package.json first
5. **Use .dockerignore** - Exclude unnecessary files
6. **Add health checks** - Monitor container health
7. **Use specific base image version** - Not just `latest`
8. **Sign images** - Use Docker Content Trust in production
9. **Scan for vulnerabilities** - `docker scan image_name`
10. **Keep images small** - Alpine base image, no dev dependencies

---

## USEFUL DOCKER COMMANDS

```bash
# Build
docker build -t name:tag .

# Run
docker run -p 3000:3000 name:tag

# Container Management
docker ps                    # List running
docker ps -a                 # List all
docker logs container_id     # View logs
docker exec -it container_id bash

# Image Management
docker images                # List images
docker rmi image_id          # Remove image
docker tag image_id new_tag  # Tag image
docker push image_id         # Push to registry

# Cleanup
docker system prune          # Remove unused
docker builder prune         # Clear build cache
```

---

## VERCEL DEPLOYMENT CHECKLIST

- [ ] Dockerfile created and tested locally
- [ ] .dockerignore configured
- [ ] Docker image builds successfully
- [ ] Container runs on port 3000
- [ ] Environment variables set in Vercel dashboard
- [ ] Health check works
- [ ] Image size optimized
- [ ] No security vulnerabilities
- [ ] Production build verified locally
- [ ] Deployment to Vercel successful

---

**Version:** 1.0  
**Created:** January 18, 2025  
**Project:** Guardians of the Spear (GOTS)  
**Location:** `/Users/werby/GOTS_website/GOTS_website/Review/docker-setup.md`
