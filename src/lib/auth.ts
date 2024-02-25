import NextAuth, { AuthOptions, DefaultSession, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import { prisma } from './prisma';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: { id: string } & DefaultSession['user'];
  }
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  callbacks: {
    async session({ session, user }) {
      return { ...session, user: { ...session.user, id: user.id } };
    }
  }
};

export const authHandler = NextAuth(authOptions);

export async function getAuthenticatedUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return null;
  }

  return session.user;
}
