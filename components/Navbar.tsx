// components/Navbar.tsx
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const router = useRouter();

  const scrollToSection = (id: string) => {
    if (typeof window === 'undefined') return;

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If not on homepage, set query param and redirect to /
      router.push(`/#${id}`);
    }
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
      <ul className={styles.navLinks}>
        <li>
          <a
            href="#restaurant"
            className={styles.anchorLink}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('restaurant');
            }}
          >
            Restaurant
          </a>
        </li>
        <li>
          <a
            href="#attractions"
            className={styles.anchorLink}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('attractions');
            }}
          >
            Attractions
          </a>
        </li>
        <li>
          <a
            href="https://bookeo.com/thefort-amherstburg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Booking
          </a>
        </li>
        <li>
          <Link href="/events">Events</Link>
        </li>

        {/* ✅ NEW HARVEST HOST LINK */}
        <li>
          <a
            href="https://www.harvesthosts.com/hosts/ontario/KzCZB2Ma054ISMtjnHWL?source=map"
            target="_blank"
            rel="noopener noreferrer"
          >
            Harvest Host
          </a>
        </li>

        <li>
          <a
            href="#contact"
            className={styles.anchorLink}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}
