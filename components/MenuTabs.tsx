import { useState } from 'react';
import styles from '../styles/Home.module.css';

const categories = [
  'Bike Night',
  'Special Events',
  'Pizzeria',
  'Entrées',
  'Bowls',
  'Apps',
  'Burgers',
  'Wraps',
  'Salads',
  'Sides',
  'Dessert',
  'Drinks'
];

export default function MenuTabs() {
  const [activeTab, setActiveTab] = useState('Bike Night');

  return (
    <div className={styles.menuWrapper}>
      <div className={styles.menuTabs}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`${styles.menuTab} ${activeTab === cat ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className={styles.menuContent}>
        {activeTab === 'Bike Night' && (
          <div>
            <h2>Bike Night Menu</h2>
            <p>Available Fridays 6–9 PM</p>
            {/* I will populate this section based on the uploaded image next */}
          </div>
        )}
        {activeTab === 'Special Events' && (
          <div>
            <h2>Special Events Menu</h2>
            <p>Used for concerts, comedy, tournaments, and more.</p>
            {/* Will add full items from second image here */}
          </div>
        )}
        {/* I’ll add Pizzeria and others after we test the tab system */}
      </div>
    </div>
  );
}
