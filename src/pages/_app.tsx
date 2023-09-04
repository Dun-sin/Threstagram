import { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';

import SEO from '../../next-seo.config';

import '../styles/index.css';
import AllProivders from '../AllProviders';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <AllProivders>
        <Component {...pageProps} />
      </AllProivders>
    </>
  );
}

export default MyApp;
