// components/FloatingWaiverButton.tsx
import React from 'react';
import styles from './FloatingWaiverButton.module.css';

export default function FloatingWaiverButton() {
  return (
    <a
      href="https://waivers.tanggo.ca/waiver/step2"
      className={styles.waiverButton}
      target="_blank"
      rel="noopener noreferrer"
    >
      Sign Our Waiver
    </a>
  );
}
