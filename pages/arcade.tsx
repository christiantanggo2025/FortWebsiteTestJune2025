// pages/arcade.tsx
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from '../styles/Home.module.css';
import { FaRegCreditCard } from 'react-icons/fa';

export default function Arcade() {
  return (
    <>
      <Head>
        <title>The Fort Fun Center – Arcade</title>
      </Head>
      <Navbar />

      <main className={styles.arcadeWrapper}>
        {/* Hero Layout */}
        <section className={styles.arcadeHeroSection}>
          <div className={styles.arcadeHeroCard}>
            <div className={styles.arcadeHeroImage}>
              <img src="/arcade.jpg" alt="Arcade" />
            </div>
            <div className={styles.arcadeHeroText}>
              <h1>Games for All Ages</h1>
              <p>
                Step into a world of flashing lights, classic games, and new-age fun! The Fort's arcade offers something for everyone — from retro machines to modern multiplayer experiences.
              </p>
              <p>
                Whether you're reliving your childhood or introducing your kids to timeless arcade magic, our game selection has it all — racing games, claw machines, basketball, air hockey, and more!
              </p>
              <p>
                Rack up those tickets and trade them in for awesome prizes at our prize center. The more you play, the more you win!
              </p>
              <p>
                Planning a birthday or special event? Add arcade access to your private room or event package for an unforgettable experience.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className={styles.arcadePricingSection}>
          <h2>Arcade Cards</h2>
          <div className={styles.pricingGrid}>
            {[
              { price: 5, credits: 20 },
              { price: 10, credits: 40 },
              { price: 20, credits: 80 },
              { price: 50, credits: 250, best: true },
              { price: 100, credits: 600, best: true }
            ].map(({ price, credits, best }) => (
              <div
                key={price}
                className={`${styles.pricingCard} ${best ? styles.bestValue : ''}`}
              >
                <FaRegCreditCard size={36} style={{ marginBottom: 10 }} />
                <div className={styles.price}>${price}</div>
                <div className={styles.credits}>{credits} Credits</div>
                {best && <div className={styles.bestLabel}>Best Value</div>}
              </div>
            ))}
          </div>
        </section>

        <section className={styles.detailSection}>
          <a
            href="https://thefortfuncenter.ca/book"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className={styles.ctaButton}>Book Your Visit</button>
          </a>
        </section>
      </main>

      <Footer />
    </>
  );
}
