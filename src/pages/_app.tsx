import React, { useEffect } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../store';
import axios from 'axios';
import { useRouter } from 'next/router';

axios.defaults.baseURL = 'http://localhost:3000';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    const pathname = router.pathname;
    console.log(`Current pathname: ${pathname}`);
    if (pathname.startsWith('/ico') || pathname.startsWith('/desktop')) {
      console.log('Skipping PreLoader for subdomain');
    }
  }, [router.pathname]);

  let SubdomainComponent = null;

  if (router.pathname.startsWith('/ico')) {
    SubdomainComponent = require('@/pages/[subdomain]/ico').default;
  }

  if (router.pathname.startsWith('/desktop')) {
    SubdomainComponent = require('@/pages/[subdomain]/desktop').default;
  }

  return (
    <Provider store={store}>
      {SubdomainComponent ? <SubdomainComponent {...pageProps} /> : <Component {...pageProps} />}
    </Provider>
  );
};

export default MyApp;
