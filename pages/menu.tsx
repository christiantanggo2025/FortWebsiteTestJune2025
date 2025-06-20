import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MenuTabs from '../components/MenuTabs';

export default function MenuPage() {
  return (
    <>
      <Head>
        <title>The Fort – Menu</title>
      </Head>
      <Navbar />
      <main>
        <MenuTabs />
      </main>
      <Footer />
    </>
  );
}
