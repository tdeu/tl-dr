  import React, { useState, useEffect } from 'react';
  import styles from './App.module.css';
  import Triangle from './components/Homepage/Triangle';
  import AboutSection from './components/AboutSection/AboutSection';
  import CodesSection from './components/Codes/CodesSection';
  import WordsSection from './components/Words/WordsSection';
  import Footer from './components/Footer';
  import HamburgerMenu from './components/Hamburger/HamburgerMenu';
  import './global.css';

  function App() {
    const [isFooterVisible, setIsFooterVisible] = useState(false);
    const [isTriangleVisible, setIsTriangleVisible] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

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

    const handleSectionClick = (sectionId) => {
      if (sectionId === 'codes') {
        setIsTriangleVisible(false);
      } else {
        setIsTriangleVisible(true);
      }
    };

    return (
      <div className={styles.app}>
        <HamburgerMenu onSectionClick={handleSectionClick} />
        <div className={styles.topSection} style={{ minHeight: isMobile ? '100vh' : 'auto', position: 'relative', overflow: 'hidden' }}>
          {isTriangleVisible && <Triangle />}
          <AboutSection isMobile={isMobile} />
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