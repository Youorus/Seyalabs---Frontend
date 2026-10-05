# syntax=docker/dockerfile:1
FROM node:22-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS dependencies
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
# Public configuration used by prerendered pages; no application secrets here.
ARG NEXT_PUBLIC_SITE_URL=https://seyalabs.com
ARG NEXT_PUBLIC_CONTACT_EMAIL=contact@seyalabs.com
ARG SITE_INDEXABLE=false
ARG NEXT_PUBLIC_ANALYTICS_ENABLED=true
ARG NEXT_PUBLIC_GA_MEASUREMENT_ID=G-K3MFCQHF4R
ARG NEXT_PUBLIC_LINKEDIN_URL=
ARG NEXT_PUBLIC_GITHUB_URL=
ARG GOOGLE_SITE_VERIFICATION=
ARG LEGAL_COMPANY_NAME=
ARG LEGAL_COMPANY_FORM=
ARG LEGAL_CAPITAL=
ARG LEGAL_ADDRESS=
ARG LEGAL_REGISTRATION=
ARG LEGAL_VAT=
ARG LEGAL_DIRECTOR=
ARG LEGAL_HOST_NAME=
ARG LEGAL_HOST_ADDRESS=
ARG LEGAL_HOST_PHONE=
ARG PRIVACY_RETENTION_MONTHS=12
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
USER nextjs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 CMD node -e "fetch('http://127.0.0.1:3000/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "server.js"]
