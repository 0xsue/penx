import { Fragment, useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { Session } from 'next-auth'
import { GoogleAnalytics } from 'nextjs-google-analytics'
import 'next-auth/react'
import type { AppProps } from 'next/app'
import { isServer } from '@penx/constants'
import { api } from '~/utils/api'
import { initFower } from '../common/initFower'
import '@penx/local-db'
import { fowerStore, Parser } from '@fower/react'
import '../styles/globals.css'
import { TrpcProvider } from '@penx/trpc-client'

initFower()

interface Props<T> extends AppProps<T> {
  Component: AppProps<T>['Component'] & {
    Layout: any
    session: Session
  }
}

if (!isServer) {
  // TODO: move this code to a separate file
}

function MyApp({ Component, pageProps }: Props<any>) {
  const Layout = Component.Layout ? Component.Layout : Fragment

  return (
    <>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />
      <GoogleAnalytics trackPageViews />

      <TrpcProvider>
        {/* <SpeedInsights /> */}
        <Layout>
          <Component {...pageProps} />
          <div id="portal" />
        </Layout>
      </TrpcProvider>
    </>
  )
}

export default api.withTRPC(MyApp)