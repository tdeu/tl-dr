import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import Triangle from './components/Homepage/Triangle';
import AboutSection from './components/AboutSection/AboutSection';
import UnifiedGitHubFeed from './components/UnifiedGitHubFeed/UnifiedGitHubFeed';
import Footer from './components/Footer';
import HamburgerMenu from './components/Hamburger/HamburgerMenu';
import './global.css';
import backgroundImage from './images/imagetest.jpg';

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
      
      setIsFooterVisible(windowHeight + scrollTop >= documentHeight - 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSectionClick = (sectionId) => {
    // Update this logic since we now have a unified section instead of separate 'codes' section
    setIsTriangleVisible(sectionId !== 'work' && sectionId !== 'codes');
  };

  return (
    <div className={styles.app} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <HamburgerMenu onSectionClick={handleSectionClick} />
      <div className={styles.topSection}>
        {isTriangleVisible && <Triangle />}
        <div className={styles.contentWrapper}>
          <AboutSection isMobile={isMobile} />
        </div>
      </div>
      <div className={styles.contentSection}>
        <div className={styles.flexContainer}>
          <div className={styles.unifiedSection}>
            <UnifiedGitHubFeed />
          </div>
        </div>
      </div>
      <Footer isVisible={isFooterVisible} />
    </div>
  );
}

export default App;