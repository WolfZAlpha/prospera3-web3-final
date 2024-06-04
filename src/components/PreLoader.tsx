import React, { useEffect } from 'react';
import styles from '../styles/PreLoader.module.css';
import videoBackground from '../assets/desktop-backgrounds/video-backgrounds/Pre-Loader/prospera-main-bg-1.mp4';
import { useRouter } from 'next/router';

interface PreLoaderProps {
  onComplete: () => void;
}

const PreLoader: React.FC<PreLoaderProps> = ({ onComplete }) => {
  const router = useRouter();

  const handleButtonClick = () => {
    const userResponse = prompt("DO YOU WISH TO PROSPER HUMAN?");
    if (userResponse?.toLowerCase() === "yes") {
      onComplete();
      router.push('/login');
    } else {
      alert("User Authorization Denied. You have failed human. Try Again!");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  useEffect(() => {
    const disableContextMenu = (event: MouseEvent) => event.preventDefault();
    document.addEventListener('contextmenu', disableContextMenu);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && (
        event.key === 'u' || event.key === 's' || event.key === 'i' || 
        event.key === 'c' || event.key === 'j' || event.key === 'k' || 
        event.key === 'h' || event.key === 'a')) {
        event.preventDefault();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    if (process.env.NODE_ENV === 'production') {
      const originalConsoleLog = console.log;
      Object.defineProperty(window, 'console', {
        get() {
          throw new Error('Console is disabled');
        },
        set(val) {
          originalConsoleLog(val);
        }
      });
    }

    return () => {
      document.removeEventListener('contextmenu', disableContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={styles.preloaderContainer}>
      <div className={styles.videoBackground}>
        <video autoPlay muted loop playsInline id="background-video" className={styles.backgroundVideo}>
          <source src={videoBackground} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <img src="/images/logo.png" alt="Prospera Logo" className={styles.logo} />
      <img src="/images/h4ck3rhuman.png" alt="Background Image" className={styles.backgroundImage} />
      <button className={styles.glowingBtn} onClick={handleButtonClick}>
        <span className={styles.glowingTxt}>P<span className={styles.faultyLetter}>ROSPER</span>A</span>
      </button>
    </div>
  );
};

export default PreLoader;