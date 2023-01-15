import '../lib/dayjs'

import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'

globalStyles()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
