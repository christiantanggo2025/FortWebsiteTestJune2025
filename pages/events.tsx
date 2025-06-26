// pages/events.tsx
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from '../styles/Events.module.css';
import { supabase } from '../supabase';

interface EventItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  date: string;
}

export default function Events() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('id, title, description, image_url, date')
        .order('date', { ascending: true });

      if (!error && data) {
        setEvents(data);
      } else {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = selectedMonth
    ? events.filter((event) =>
        event.date && event.date.startsWith(selectedMonth)
      )
    : events;

  return (
    <>
      <Head>
        <title>Events Calendar | The Fort</title>
      </Head>
      <main className={styles.page}>
        <h1 className={styles.title}>Our Events</h1>

        <div className={styles.dropdown}>
          <label>
            Filter by month:{' '}
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            />
          </label>
        </div>

        {filteredEvents.map((event) => (
          <div className={styles.eventCard} key={event.id}>
            <div className={styles.dateBox}>
              <p>
                {event.date
                  ? new Date(event.date + 'T00:00:00').toLocaleDateString('en-CA', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      timeZone: 'UTC',
                    })
                  : 'Date TBD'}
              </p>
            </div>

            <div className={styles.imageBox}>
              <Image
                src={event.image_url || '/placeholder.jpg'}
                alt={event.title}
                width={400}
                height={300}
                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                className={styles.image}
              />
            </div>

            <div className={styles.textBox}>
              <h2>{event.title}</h2>
              <p>{event.description}</p>
            </div>
          </div>
        ))}
      </main>
    </>
  );
}
