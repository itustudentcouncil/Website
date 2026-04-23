This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Authentication Environment Variables

The site can read an existing shared session cookie and switch between logged in vs logged out UI

Optional environment variables:

```bash
COOKIE_SESSION_NAME=<>
SESSION_SECRET=<>

AUTH_DEV_FAKE_USER_ENABLED=false
AUTH_DEV_FAKE_USER_ID=dev-student
AUTH_DEV_FAKE_USER_NAME=Dev Student
AUTH_DEV_FAKE_USER_EMAIL=dev@studentcouncil.dk
AUTH_DEV_FAKE_USER_AVATAR_URL=
```

Notes:.
- `AUTH_LOGOUT_URI` is optional. If omitted, it is derived from `AUTH_LOGIN_URI`.
- `SESSION_SECRET` is only needed if you want the app to verify the shared JWT and extract real profile fields like name, email, or avatar.
- If a session cookie exists but `SESSION_SECRET` is missing, the app still treats the user as signed in, but shows placeholder profile details.
- `AUTH_DEV_FAKE_USER_ENABLED=true` only works in development and only when `SESSION_SECRET` is set. It generates and verifies a local fake JWT so the UI can be tested without a real login.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
