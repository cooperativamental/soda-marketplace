import Layout from '@/components/Layout'
import { IDLProvider } from '@/context/IDL'
import { TemplatesProvider } from '@/context/templates'
import WalletContextProvider from '@/context/wallet'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Soda</title>
        <meta name="description" content="Generate Solana projects from an UI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <WalletContextProvider>
          <IDLProvider>
            <TemplatesProvider>
              <Component {...pageProps} />
            </TemplatesProvider>
          </IDLProvider>
        </WalletContextProvider>
      </Layout>
    </>
  )
}
