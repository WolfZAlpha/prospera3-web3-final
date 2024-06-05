import React, { useEffect, useState, Suspense } from 'react';
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

    if (!sessionStorage.getItem('preloaderCompleted')) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [router]);

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('preloaderCompleted', 'true');
    setLoading(false);
  };

  let SubdomainComponent = null;

  if (router.pathname.startsWith('/ico')) {
    SubdomainComponent = React.lazy(() => import('@/pages/[subdomain]/ico'));
  }

  if (router.pathname.startsWith('/desktop')) {
    SubdomainComponent = React.lazy(() => import('@/pages/[subdomain]/desktop'));
  }

  return (
    <div>
      {loading && !SubdomainComponent ? (
        <PreLoader onComplete={handlePreloaderComplete} />
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          {SubdomainComponent ? <SubdomainComponent /> : null}
        </Suspense>
      )}
    </div>
  );
};

export default Home;