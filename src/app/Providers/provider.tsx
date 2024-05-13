// app/providers.tsx
'use client'

import { grapqlClient } from '@/src/graphql/gql.setup'
import { ApolloProvider } from '@apollo/client'
import { NextUIProvider } from '@nextui-org/react'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
export function Providers({ children }: { children: React.ReactNode }) {
  return (

    <ApolloProvider client={grapqlClient}>
      <SessionProvider>
        <NextUIProvider >
          <NextThemesProvider attribute='class' defaultTheme='dark'>
            {children}
          </NextThemesProvider>


        </NextUIProvider>
      </SessionProvider>

    </ApolloProvider>

  )
}