import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  pages: {
    signIn: '/login'
  },
  callbacks: {
    authorized ({ auth, request: { nextUrl } }) {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
      const isOnLoginPage = nextUrl.pathname.startsWith('/login')
      if (isOnDashboard) {
        return isLoggedIn
      } else if (isOnLoginPage && isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl))
      }
      return true
    }
  },
  providers: []
} satisfies NextAuthConfig
