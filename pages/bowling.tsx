// pages/bowling.tsx
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from '../styles/Home.module.css';
import Image from 'next/image';

export default function Bowling() {
  return (
    <>
      <Head>
        <title>The Fort Fun Center – Bowling</title>
      </Head>
      <Navbar />

      <main className={styles.arcadeWrapper}>
        <section className={styles.arcadeHeroSection}>
          <div className={styles.arcadeHeroCard}>
            <div className={styles.arcadeHeroImage}>
              <Image src="/bowling-page.jpg" alt="Bowling" width={800} height={600} />
            </div>
            <div className={styles.arcadeHeroText}>
              <h1>Bowling by the Hour</h1>
              <p>
                Whether you are planning a fun family outing, a friendly competition, or a birthday bash — our lanes are ready! Enjoy hourly bowling rates for kids and adults with affordable shoe rentals.
              </p>
              <p>
                Book online or walk in anytime. We recommend reserving for weekends and holidays!
              </p>
              <p>
                Perfect for all ages, with lightweight balls and bumpers available for kids.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.arcadePricingSection}>
          <h2>Bowling Rates</h2>
          <div style={{ textAlign: 'center' }}>
            <Image
              src="/bowling-prices.jpg"
              alt="Bowling Prices"
              width={800}
              height={600}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </section>

        <section className={styles.detailSection}>
          <a
            href="https://bookeo.com/thefort-amherstburg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className={styles.ctaButton}>Book Bowling</button>
          </a>
        </section>
      </main>

      <Footer />
    </>
  );
}
