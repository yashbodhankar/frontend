AI Interview Practice Platform (Frontend)

This is a Next.js (App Router) site for an AI-based interview practice platform.

## Pages

- `/` landing page
- `/login` login (mock auth)
- `/signup` signup (mock auth)
- `/app/*` protected area (requires auth cookie)
	- `/app/dashboard`
	- `/app/analytics`
	- `/app/repo`
	- `/app/interviews`
	- `/app/profile`

## Getting Started

Install dependencies (already done if you used `create-next-app`):

```bash
npm install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open http://localhost:3000.

## Auth

This project currently uses **mock auth**:

- Logging in / signing up sets a cookie (`ip_auth=1`)
- Middleware protects `/app/*` routes and redirects to `/login`

Wire this to your backend auth when you’re ready.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Deploy on Vercel

This is ready to deploy on Vercel.

- Push this folder to GitHub
- In Vercel, import the repo and set the project root to `interview-practice-platform`
- Build command: `npm run build`
- Output: Next.js default

You can also deploy anywhere that supports Next.js.
