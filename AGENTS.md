# Project: Sulifa Frontend

Tech stack:
- Next.js 14 (App Router)
- TypeScript
- next-intl (locales: en, ru, kz)
- React Query
- Tailwind CSS

Routing rules:
- Root layout: app/layout.tsx (html/body only here)
- Locale routing: app/[locale]/layout.tsx and page.tsx
- app/page.tsx must redirect to /en

Conventions:
- Use [locale], not [local]
- Client components explicitly use "use client"
- Do not render <html> or <body> outside root layout

Goal:
- Help debug routing, rendering, and data-fetching issues
- Propose minimal, safe fixes
