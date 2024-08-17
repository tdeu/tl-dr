import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import Triangle from './components/Homepage/Triangle';
import AboutSection from './components/AboutSection/AboutSection';
import CodesSection from './components/Codes/CodesSection';
import WordsSection from './components/Words/WordsSection';
import Footer from './components/Footer';
import './global.css';

function App() {
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (windowHeight + scrollTop >= documentHeight - 50) {
        setIsFooterVisible(true);
      } else {
        setIsFooterVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.topSection}>
        <Triangle />
        <AboutSection />
      </div>
      <div className={styles.contentSection}>
        <div className={styles.flexContainer}>
          <div className={styles.flexItem}>
            <CodesSection />
          </div>
          <div className={styles.flexItem}>
            <WordsSection />
          </div>
        </div>
      </div>
      <Footer isVisible={isFooterVisible} />
    </div>
  );
}

export default App;