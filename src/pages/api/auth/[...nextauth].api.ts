import { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'

const GOOGLE_LINK = 'https://www.googleapis.com/auth'

const googleScopeEmail = `${GOOGLE_LINK}/userinfo.email`
const googleScopeProfile = `${GOOGLE_LINK}/userinfo.profile`
const googleScopeCalendar = `${GOOGLE_LINK}/calendar`

const googleScopes = [googleScopeEmail, googleScopeProfile, googleScopeCalendar]
  .join(' ')
  .trim()

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          scope: googleScopes,
        },
      },
    }),
  ],

  callbacks: {
    async signIn({ account }) {
      if (!account?.scope?.includes(googleScopeCalendar)) {
        return '/register/connect-calendar/?error=permissions'
      }

      return true
    },
  },
}

export default NextAuth(authOptions)
