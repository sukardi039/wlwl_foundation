# Dokploy Deployment Guide

This guide explains how to deploy the WLWL Foundation application using Dokploy.

## Prerequisites

- Dokploy instance running
- Docker installed on your deployment server
- Git repository access
- Environment variables configured

## Deployment Steps

### 1. Create a New Project in Dokploy

1. Log in to your Dokploy dashboard
2. Click on "New Project"
3. Select "Docker" as the deployment method
4. Connect your GitHub repository: `https://github.com/sukardi039/wlwl.git`

### 2. Configure Deployment Settings

#### Docker Configuration

- **Dockerfile**: `Dockerfile` (at project root)
- **Build Context**: `/` (project root)
- **Port**: `5000`

#### Environment Variables

Add the following environment variables:

```
NODE_ENV=production
VUE_APP_I18N_LOCALE=en
VUE_APP_I18N_FALLBACK_LOCALE=en
```

#### Domains

- Add your domain(s) to the deployment
- Enable SSL/TLS if needed

### 3. Deploy

1. Click "Deploy" to start the deployment process
2. Dokploy will:
   - Clone the repository
   - Build the Docker image
   - Run the container
   - Expose the application on port 5000

### 4. Monitor Deployment

- View logs in the Dokploy dashboard
- Check container status
- Monitor resource usage

## Docker Configuration Details

### Dockerfile Structure

**Multi-stage build for optimization:**

- **Stage 1 (Builder)**: Node.js 18 Alpine

  - Installs dependencies
  - Builds the Vue application
  - Final output in `/app/dist`

- **Stage 2 (Production)**: Node.js 18 Alpine + serve
  - Only contains built application
  - Minimal image size (~200MB)
  - Uses `serve` to run static files

### Port Mapping

- **Internal Port**: 5000
- **External Port**: Configured in Dokploy

### Health Check

```yaml
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3
```

Monitors application health every 30 seconds.

## Docker Compose (Local Development)

To test locally with Docker Compose:

```bash
docker-compose up --build
```

The application will be available at `http://localhost:5000`

## Manual Docker Commands

Build the image:

```bash
docker build -t wlwl-foundation:latest .
```

Run the container:

```bash
docker run -d -p 5000:5000 \
  -e NODE_ENV=production \
  -e VUE_APP_I18N_LOCALE=en \
  --name wlwl-foundation \
  wlwl-foundation:latest
```

Check container status:

```bash
docker ps
docker logs wlwl-foundation
```

## Troubleshooting

### Build Errors

- Check that `package.json` dependencies are installed
- Verify Node.js version compatibility (requires Node 14+)
- Check `.dockerignore` for excluded files

### Runtime Errors

- Check environment variables are set
- Review application logs: `docker logs wlwl-foundation`
- Verify port 5000 is available

### Performance Issues

- Monitor memory usage: `docker stats wlwl-foundation`
- Check disk space for image storage
- Review build logs for optimization opportunities

## Updating Deployment

Any push to the main branch will trigger a new build and deployment in Dokploy automatically (if webhooks are configured).

## Rollback

To rollback to a previous version in Dokploy:

1. Go to deployment history
2. Select the previous build
3. Click "Redeploy"

## Additional Resources

- [Dokploy Documentation](https://dokploy.io)
- [Docker Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [Vue.js Production Deployment](https://vuejs.org/v2/guide/deployment.html)
