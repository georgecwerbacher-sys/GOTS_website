# Deployment Checklist

## Production Database (Vercel + PostgreSQL)

### 1. Environment Variables (Vercel Dashboard)

Set these in your Vercel project → Settings → Environment Variables:

| Variable | Required | Notes |
|----------|----------|-------|
| `DATABASE_URL` | Yes | PostgreSQL connection string. For serverless, add `?connection_limit=1` to avoid pool exhaustion |
| `JWT_SECRET` | Yes | Strong random string for access tokens |
| `JWT_REFRESH_SECRET` | Yes | Different strong random string for refresh tokens |
| `NEXT_PUBLIC_SITE_URL` | Yes | Your production URL (e.g. `https://guardiansofthespear.com`) |
| `RESEND_API_KEY` | No | For password reset emails |
| `RESEND_FROM_EMAIL` | No | Sender email for Resend |

### 2. Database Setup

**Before first deploy**, run migrations on your **production** database:

```bash
# Using production DATABASE_URL
DATABASE_URL="your-production-url" npx prisma db push
# Or with migrations:
DATABASE_URL="your-production-url" npx prisma migrate deploy
```

This creates the `members`, `refresh_tokens`, and `password_reset_tokens` tables.

### 3. Connection Limit (Vercel Serverless)

If you see "connection limit" or "too many clients" errors, append to your DATABASE_URL:

```
?connection_limit=1
```

Example: `postgresql://user:pass@host:5432/db?schema=public&connection_limit=1`

### 4. Verify Database Connection

Before testing registration, verify the database is reachable:

```
https://your-site.com/api/health?db=1
```

This returns:
- `database: "connected"` — DB is working
- `database: "error"` — Check DATABASE_URL and that your DB allows connections from Vercel's IPs

### 5. Test Registration

1. Visit `/auth/register` and create an account
2. Check Vercel → Logs for any errors if registration fails
