# FitFinder Pro Frontend

React-based frontend for FitFinder Pro application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update environment variables with your configuration.

4. Run development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## Environment Variables

- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` - Your Supabase anon/public key
- `VITE_API_URL` - Backend API URL (default: http://localhost:3001/api)

## Technologies

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui Components
- React Router
- Supabase (for additional features)
- React Query

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
