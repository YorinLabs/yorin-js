# Yorin Node.js SDK Server Demo

This Next.js example now includes a demonstration of the **Yorin Node.js SDK** for server-side event tracking.

## What's New

### 1. Server API Route (`/api/track/route.ts`)
- Uses `yorin-nodejs` package with secret key authentication
- Handles server-side event tracking: `track`, `identify`, `group`, `page`
- Validates server event requirements (user_id or group_id)

### 2. Server Demo Page (`/server-demo`)
- Interactive UI to test server-side events
- Shows real-time API responses
- Demonstrates different event types with proper payloads

### 3. Environment Configuration
Added to `.env.local`:
```bash
YORIN_SECRET_KEY=sk_your_secret_key_here
YORIN_API_URL=http://localhost:8000
```

## Key Differences: Client vs Server Events

| Aspect | Client Events (JS SDK) | Server Events (Node.js SDK) |
|--------|------------------------|------------------------------|
| **Authentication** | `apiKey` in JSON body (pk_*) | `Authorization: Bearer` header (sk_*) |
| **Domain Validation** | Required (Origin/Referer) | Not required |
| **User ID** | Optional (anonymous OK) | Required (user_id or group_id) |
| **Processing** | Rich (UA parsing, geo, etc.) | Minimal overhead |
| **Use Cases** | Browser interactions | Backend operations, purchases, user management |

## Usage Example

```typescript
// Server-side (API route)
import { Yorin } from 'yorin-nodejs';

const yorin = new Yorin({
  secretKey: process.env.YORIN_SECRET_KEY,
});

await yorin.track('purchase_completed', 'user_123', {
  amount: 99.99,
  currency: 'USD',
  product_id: 'prod_456'
});

await yorin.identify('user_123', {
  $email: 'john@example.com',
  $full_name: 'John Doe',
  subscription_tier: 'premium'
});
```

## Setup Instructions

1. **Install the linked Node.js SDK:**
   ```bash
   npm link yorin-nodejs
   ```

2. **Set your secret key in `.env.local`:**
   ```bash
   YORIN_SECRET_KEY=sk_your_actual_secret_key
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Visit the demo:**
   Navigate to `/server-demo` to test server-side event tracking.

## Event Requirements

Server events **must** include either:
- `user_id` - External user identifier from your database
- `group_id` in properties - For organization/group-level events

This ensures proper attribution and prevents anonymous server events that could be hard to analyze.