# Deployment Instructions for Vercel

This Next.js Russian Roulette game is optimized and ready to deploy on Vercel.

## Quick Deploy

### Option 1: Deploy via Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your Git repository
5. Vercel will auto-detect Next.js and configure everything
6. Click "Deploy"

Your app will be live in seconds!

### Option 2: Deploy via Vercel CLI

Install Vercel CLI:
```bash
npm install -g vercel
```

Deploy:
```bash
vercel
```

For production deployment:
```bash
vercel --prod
```

## Configuration

No additional configuration is needed. Vercel automatically:
- Detects Next.js 16 framework
- Configures build settings (`npm run build`)
- Sets up environment for React 19
- Enables Turbopack for faster builds
- Configures TypeScript compilation
- Sets up Tailwind CSS processing

## Environment Variables

This project doesn't require any environment variables for basic functionality.

## Build Command

Default: `npm run build`

## Output Directory

Default: `.next`

## Install Command

Default: `npm install`

## Development Command

Local: `npm run dev`

## Performance

The app is optimized with:
- Static generation for faster load times
- Code splitting for smaller bundles
- Tailwind CSS for minimal CSS
- TypeScript for type safety
- React 19 compiler for optimized rendering

## Custom Domain

After deployment, you can add a custom domain in the Vercel dashboard:
1. Go to your project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Analytics

Enable Vercel Analytics in your project settings for:
- Real-time visitor analytics
- Performance monitoring
- Core Web Vitals tracking

Enjoy deploying your Russian Roulette game! 🎲
