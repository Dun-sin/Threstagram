import Head from 'next/head';
import { AppProps } from 'next/app';

import '../styles/index.css';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Threstagram: Threads to Instagram</title>
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
