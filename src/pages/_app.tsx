import type { AppProps } from 'next/app'
import { Global } from '@emotion/react'
import { QueryClientProvider, QueryClient } from 'react-query'

import globalSteyls from '@styles/globalStyles'
import Layout from '@shared/Layout'
import { RecoilRoot } from 'recoil'
import { SessionProvider } from 'next-auth/react'

const client = new QueryClient({})
export default function App({
  Component,
  pageProps: { dehydratedState, session, ...pageProps },
}: AppProps) {
  return (
    <RecoilRoot>
      <Layout>
        <Global styles={globalSteyls} />
        <SessionProvider session={session}>
          <QueryClientProvider client={client}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </SessionProvider>
      </Layout>
    </RecoilRoot>
  )
}
