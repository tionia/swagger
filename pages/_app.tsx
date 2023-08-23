/* global layout */
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

/* import Font Awesome CSS */
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

/* tell fontawesome to skip adding css automatically */
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>IDN SwaggerHub</title>
        <link rel="icon" type="svg" href="/assets/images/favicon.svg" sizes="32x32" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
