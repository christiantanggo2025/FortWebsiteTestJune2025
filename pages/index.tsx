// pages/index.tsx
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';
import styles from '../styles/Home.module.css';
import { useEffect, useState, useRef } from 'react';

export default function Home() {
  interface EventData {
    title: string;
    description: string;
    image_url?: string;
  }

  const [nextEvent, setNextEvent] = useState<EventData | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    fetchNextEvent();
  }, []);
  useEffect(() => {
    const scrollContainer = carouselRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    const scrollSpeed = 0.5;

    const autoScroll = () => {
      scrollContainer.scrollLeft += scrollSpeed;

      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      }

      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const fetchNextEvent = async () => {
    const today = new Date().toISOString();
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .gt('date', today)
      .order('date', { ascending: true })
      .limit(1)
      .single();

    if (!error && data) {
      setNextEvent(data);
    }
  };

  const partnerData = [
  { title: 'Cross Roads Church', link: 'https://crossroadsfellowship.ca/', image: 'crossroads.jpg' },
  { title: 'Rotary Club of Amherstburg', link: 'https://rotaryamherstburg.ca/', image: 'rotary.jpg' },
  { title: 'Nitro Pinball', link: 'https://nitropinball.com/', image: 'nitro.png' },
  { title: 'Motorcycle Spotters', link: 'https://www.facebook.com/groups/437648846705165', image: 'motorcycle.jpg' },
  { title: 'Learn2ride', alert: 'Coming Soon', image: 'learn2ride.png' },
  { title: 'Southern Auto', link: 'https://www.instagram.com/519_carspotter_/?hl=en', image: 'southernauto.png' },
  { title: 'Windsor Comedy', link: 'https://www.facebook.com/brewingforcomedy/', image: 'windsorcomedy.jpg' },
  { title: 'Sprucewood Estate Winery', link: 'https://www.sprucewoodshores.com/', image: 'sprucewood.jpg' },
  { title: 'Landshark Lager', link: 'https://www.landsharklager.com/AgeCheck.aspx?ReturnUrl=%2F', image: 'landshark.png' },
  { title: 'Slush Puppy Canada', link: 'https://slushpuppiecanada.com/', image: 'slushpuppy.png' },
  { title: 'Molson Coors', link: 'https://www.molsoncoors.com/en-CA/av?url=https://www.molsoncoors.com/', image: 'molsoncoors.jpg' },
  { title: 'Cross Roads Church', link: 'https://crossroadsfellowship.ca/', image: 'crossroads.jpg' },
  { title: 'Rotary Club of Amherstburg', link: 'https://rotaryamherstburg.ca/', image: 'rotary.jpg' },
  { title: 'Nitro Pinball', link: 'https://nitropinball.com/', image: 'nitro.png' },
  { title: 'Motorcycle Spotters', link: 'https://www.facebook.com/groups/437648846705165', image: 'motorcycle.jpg' },
  { title: 'Learn2ride', alert: 'Coming Soon', image: 'learn2ride.png' },
  { title: 'Southern Auto', link: 'https://www.instagram.com/519_carspotter_/?hl=en', image: 'southernauto.png' },
  { title: 'Windsor Comedy', link: 'https://www.facebook.com/brewingforcomedy/', image: 'windsorcomedy.jpg' },
  { title: 'Sprucewood Estate Winery', link: 'https://www.sprucewoodshores.com/', image: 'sprucewood.jpg' },
  { title: 'Landshark Lager', link: 'https://www.landsharklager.com/AgeCheck.aspx?ReturnUrl=%2F', image: 'landshark.png' },
  { title: 'Slush Puppy Canada', link: 'https://slushpuppiecanada.com/', image: 'slushpuppy.png' },
  { title: 'Molson Coors', link: 'https://www.molsoncoors.com/en-CA/av?url=https://www.molsoncoors.com/', image: 'molsoncoors.jpg' }
];

  const sections = [
    {
      id: 'restaurant',
      title: 'Food & Drink',
      image: '/food.jpg',
      content: (
        <>
          <p>
            We understand great food enhances the joy of any celebration. That’s why we pride ourselves in serving delicious food to every gathering! From <span className={styles.highlight}>pizzas to party platters</span>, we can accommodate your needs to make your event memorable.
          </p>
        </>
      ),
      buttons: [
        { label: 'View Menu', href: '/menu' },
        { label: 'Book a Table', href: 'https://bookeo.com/thefort-amherstburg' }
      ]
    },
    {
      id: 'events',
      title: 'Parties & Events',
      image: '/events.jpg',
      content: (
        <>
          <p>
            Whether it’s a birthday, bachelor party, company outing, or holiday bash — we specialize in creating unforgettable group experiences!
          </p>
        </>
      ),
      buttons: [
        { label: 'Book Now', href: 'https://bookeo.com/thefort-amherstburg' }
      ]
    }
  ];

  return (
    <>
      <Head>
        <title>The Fort Fun Center</title>
        <meta
          name="description"
          content="The Fort – Fun, food, and unforgettable experiences in Amherstburg, Ontario!"
        />
      </Head>

      <Navbar />

      <div className={styles.hero}>
        <h1>Welcome to The Fort</h1>
        <p>Where fun meets food and family!</p>
        <div className={styles.buttons}>
          <a
            href="https://bookeo.com/thefort-amherstburg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button>Book Now</button>
          </a>
          <button
            onClick={() => {
              const el = document.getElementById('attractions');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Explore Attractions
          </button>
        </div>
      </div>

      {sections.map((section, index) => (
        <section key={section.id} id={section.id} className={styles.altSection}>
          <div className={`${styles.sectionContent} ${index % 2 === 1 ? styles.reverse : ''}`}>
            <img src={section.image} alt={section.title} className={styles.sectionImage} />
            <div className={styles.sectionText}>
              <h2>{section.title}</h2>
              {section.content}
              <div className={styles.sectionButtons}>
                {section.buttons.map((btn, i) => (
                  <a
                    key={i}
                    href={btn.href}
                    target={btn.href.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                  >
                    <button>{btn.label}</button>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Attractions Grid */}
      <section id="attractions" className={styles.attractionsGrid}>
        <h2 className={styles.sectionTitle}>Attractions</h2>
        <div className={styles.cardGrid}>
          {[
            {
              title: 'Bowling',
              image: '/bowling.jpg',
              description: 'Bowl with friends or book a party!',
              href: 'https://bookeo.com/thefort-amherstburg'
            },
            {
              title: 'Arcade',
              image: '/arcade.jpg',
              description: 'Try to beat your high score in our awesome arcade!',
              href: '/arcade'
            },
            {
              title: 'Laser Tag',
              image: '/laser-tag.jpg',
              description: 'Battle it out in our laser arena!',
              href: 'https://bookeo.com/thefort-amherstburg'
            },
            {
              title: 'Beach Volleyball',
              image: '/volleyball.jpg',
              description: 'Outdoor courts, league play, and practice nights!.',
              href: '/volleyball'
            },
            {
              title: 'Comedy Nights',
              image: '/comedy.jpg',
              description: 'Live comedy hosted in partnership with Windsor Comedy.',
              href: 'https://www.phogheads.ca/about'
            }
          ].map((card, index) => (
            <div key={index} className={styles.attractionCard}>
              <img src={card.image} alt={card.title} className={styles.cardImage} />
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <a href={card.href} target="_blank" rel="noopener noreferrer">
                <button>Learn More</button>
              </a>
            </div>
          ))}

          {/* Supabase Next Event Card */}
          {nextEvent && (
            <div className={styles.attractionCard}>
              <img
                src={nextEvent.image_url || '/placeholder.jpg'}
                alt={nextEvent.title}
                className={styles.cardImage}
              />
              <h3>{nextEvent.title}</h3>
              <p>{nextEvent.description}</p>
              <a
                href="https://bookeo.com/thefort-amherstburg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button>Book Now</button>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Partners Carousel */}
      <section id="partners" className={styles.partnersSection}>
        <h2 className={styles.sectionTitle}>Our Partners</h2>
        <div className={styles.partnerScrollWrapper}>
          <div className={styles.partnerScrollTrack} ref={carouselRef}>
            {[...partnerData, ...partnerData].map((partner, index) => (
              <div key={index} className={styles.partnerCard}>
                <img
                  src={`/partners/${partner.image}`}
                  alt={partner.title}
                  className={styles.partnerImage}
                />
                <h3>{partner.title}</h3>
                {partner.link ? (
                  <a href={partner.link} target="_blank" rel="noopener noreferrer">
                    <button>Visit</button>
                  </a>
                ) : (
                  <button onClick={() => alert(partner.alert)}>Learn More</button>
                )}
              </div>
            ))}

          </div>
        </div>
      </section>

      <div id="contact">
        <Footer />
      </div>
    </>
  );
}
