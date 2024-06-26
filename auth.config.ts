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
      const isUploading = nextUrl.pathname.startsWith('/upload')
      const isOnCreatePostPage = nextUrl.pathname.startsWith('/dashboard/create')
      const isFetchingAnalytics = nextUrl.pathname.startsWith('/api/analytics')
      if (isOnDashboard) {
        return isLoggedIn
      } else if (isOnLoginPage && isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl))
      } else if (isFetchingAnalytics && !isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl))
      } else if (isUploading && !isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl))
      } else if (isOnCreatePostPage && !isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl))
      }
      return true
    }
  },
  providers: []
} satisfies NextAuthConfig
