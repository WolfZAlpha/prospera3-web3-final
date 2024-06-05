import React, { useEffect, useState } from 'react';
import PreLoader from '../components/PreLoader';
import { useRouter } from 'next/router';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (router.pathname.startsWith('/ico') || router.pathname.startsWith('/desktop')) {
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(false);
      router.push('/login');
    }, 20000000);
    return () => clearTimeout(timer);
  }, [router]);

  if (router.pathname.startsWith('/ico') || router.pathname.startsWith('/desktop')) {
    return null;
  }

  return (
    <div>
      {loading && <PreLoader onComplete={() => setLoading(false)} />}
    </div>
  );
};

export default Home;
