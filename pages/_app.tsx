import Layout from '@/components/Layout'
import { IDLProvider } from '@/context/IDL'
import { TemplatesProvider } from '@/context/templates'
import WalletContextProvider from '@/context/wallet'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from "next/script"
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Soda</title>
        <meta name="description" content="Solana Fast Code Generator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://machine.usesoda.dev/favicon.ico" />
      </Head>
         <Script async src="https://www.googletagmanager.com/gtag/js?id=G-EJB99T5E0X"></Script>
        <Script>
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-EJB99T5E0X');`}
        </Script>
      <WalletContextProvider>
        <IDLProvider>
          <TemplatesProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </TemplatesProvider>
        </IDLProvider>
      </WalletContextProvider>
      <Analytics />
    </>
  )
}
