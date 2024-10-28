import React, { useState } from 'react';
import styles from './HamburgerMenu.module.css';

const HamburgerMenu = ({ onSectionClick }) => {
  const [activeItem, setActiveItem] = useState(null);

  const menuItems = [
    { id: 'me', label: 'About Me' },
    { id: 'codes', label: 'Codes' },
    { id: 'words', label: 'Words' }
  ];

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      blinkSection(section);
      onSectionClick(sectionId);
    }
    setActiveItem(null); // Reset active item after clicking
  };

  const blinkSection = (section) => {
    const originalBg = window.getComputedStyle(section).backgroundColor;
    let blinkCount = 0;
    const blinkInterval = setInterval(() => {
      section.style.backgroundColor = blinkCount % 2 === 0 ? 'transparent' : originalBg;
      blinkCount++;
      if (blinkCount === 6) {
        clearInterval(blinkInterval);
        section.style.backgroundColor = originalBg;
      }
    }, 500);
  };

  const handleInteraction = (itemId) => {
    setActiveItem(itemId);
  };

  const handleInteractionEnd = () => {
    setActiveItem(null);
  };

  return (
    <div className={styles.hamburgerMenu}>
      {menuItems.map((item) => (
        <div 
          key={item.id}
          className={`${styles.hamburgerItem} ${activeItem === item.id ? styles.hovered : ''}`}
          onMouseEnter={() => handleInteraction(item.id)}
          onMouseLeave={handleInteractionEnd}
          onTouchStart={() => handleInteraction(item.id)}
          onTouchEnd={(e) => {
            e.preventDefault();
            scrollToSection(item.id);
          }}
          onClick={() => scrollToSection(item.id)}
        >
          <div className={styles.bar}>
            {activeItem === item.id && <span className={styles.label}>{item.label}</span>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HamburgerMenu;