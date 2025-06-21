import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from '../styles/Home.module.css';
import MenuTabs from '../components/MenuTabs';

export default function MenuPage() {
  return (
    <div className={styles.pageWrapper}>
      <Head>
        <title>The Fort – Menu</title>
        <meta name="description" content="Explore our full menu at The Fort Fun Center" />
      </Head>

      <Navbar />
      <main className={styles.menuPageMain}>
        <MenuTabs />
      </main>
      <Footer />
    </div>
  );
}
