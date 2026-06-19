import { betterAuth } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import { drizzleAdapter } from '@better-auth/drizzle-adapter';
import { db } from '@/db';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'sqlite',
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
});

export type User = typeof auth.$Infer.Session.user;
