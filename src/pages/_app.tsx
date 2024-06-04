import React, { useState, useEffect } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../store';
import axios from 'axios';
import { useRouter } from 'next/router';
import PreLoader from '../components/PreLoader';

axios.defaults.baseURL = 'http://localhost:3000';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem('preloaderCompleted')) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [router.pathname]);

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('preloaderCompleted', 'true');
    setLoading(false);
  };

  return (
    <Provider store={store}>
      {loading ? (
        <PreLoader onComplete={handlePreloaderComplete} />
      ) : (
        <Component {...pageProps} />
      )}
    </Provider>
  );
};

export default MyApp;
