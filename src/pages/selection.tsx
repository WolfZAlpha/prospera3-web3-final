import React from 'react';
import styles from '../styles/SelectionPage.module.css';
import { useRouter } from 'next/router';

const SelectionPage: React.FC = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className={styles.selectionPage}>
      <button
        className={`${styles.button} ${styles.buttonIco}`}
        onClick={() => handleNavigation('http://ico.localhost:3000')}
      >
        ICO
        <p>Initial Coin Offering</p>
      </button>
      <button
        className={`${styles.button} ${styles.buttonDesktop}`}
        onClick={() => handleNavigation('http://desktop.localhost:3000')}
      >
        Desktop
        <p>Desktop Web Environment</p>
      </button>
    </div>
  );
};

export default SelectionPage;
