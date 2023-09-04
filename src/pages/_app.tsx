import Head from 'next/head';
import { AppProps } from 'next/app';

import '../styles/index.css';
import AllProivders from '../AllProviders';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Threstagram: Threads to Images</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <AllProivders>
        <Component {...pageProps} />
      </AllProivders>
    </>
  );
}

export default MyApp;
