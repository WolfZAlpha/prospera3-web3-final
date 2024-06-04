import React, { useEffect, useState } from 'react';
import PreLoader from '../components/PreLoader';
import { useRouter } from 'next/router';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      router.push('/login');
    }, 20000000);
    return () => clearTimeout(timer);
  }, [router]);

  // Prevent PreLoader from showing on subdomains
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
