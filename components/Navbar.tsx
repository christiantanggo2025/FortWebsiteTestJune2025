// components/Navbar.tsx
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    if (typeof window === 'undefined') return;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(`/#${id}`);
    }
    setMenuOpen(false);
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.getElementById(hash.substring(1));
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <Image
            src="/fort-logo.png"
            alt="The Fort Logo"
            width={100}
            height={32}
            className={styles.logoImage}
            priority
          />
        </Link>
      </div>

      <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
      </div>

      <ul className={`${styles.navLinks} ${menuOpen ? styles.mobileOpen : ''}`}>
        <li>
          <a href="#ourNextEvent" onClick={(e) => { e.preventDefault(); scrollToSection('ourNextEvent'); }}>Events</a>
        </li>
        <li>
          <a href="#foodAndDrink" onClick={(e) => { e.preventDefault(); scrollToSection('foodAndDrink'); }}>Restaurant</a>
        </li>
        <li>
          <a href="#giftCards" onClick={(e) => { e.preventDefault(); scrollToSection('giftCards'); }}>Gift Cards</a>
        </li>
        <li>
          <a href="#attractions" onClick={(e) => { e.preventDefault(); scrollToSection('attractions'); }}>Attractions</a>
        </li>
        <li>
          <a href="https://www.harvesthosts.com/hosts/ontario/KzCZB2Ma054ISMtjnHWL?source=map" target="_blank" rel="noopener noreferrer">Harvest Host</a>
        </li>
        <li>
          <a href="#footer" onClick={(e) => { e.preventDefault(); scrollToSection('footer'); }}>Contact</a>
        </li>
        <li>
          <a href="https://bookeo.com/thefort-amherstburg" target="_blank" rel="noopener noreferrer">Booking</a>
        </li>
      </ul>
    </nav>
  );
}
