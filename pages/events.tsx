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
  end_date?: string;
  start_time?: string;
  end_time?: string;
  event_link?: string;
  location?: string;
  stage?: string;
}

export default function Events() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('id, title, description, image_url, date, end_date, start_time, end_time, event_link, location, stage')
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

  const formatDate = (dateStr?: string) =>
    dateStr
      ? new Date(dateStr + 'T00:00:00').toLocaleDateString('en-CA', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          timeZone: 'UTC',
        })
      : null;

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
                {formatDate(event.date) || 'Date TBD'}
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

              {/* Additional Details */}
              <div className={styles.details}>
                {formatDate(event.end_date) && (
                  <p><strong>End Date:</strong> {formatDate(event.end_date)}</p>
                )}
                {event.start_time && (
                  <p><strong>Start Time:</strong> {event.start_time}</p>
                )}
                {event.end_time && (
                  <p><strong>End Time:</strong> {event.end_time}</p>
                )}
                {event.location && (
                  <p>📍 {event.location}</p>
                )}
                {event.stage && (
                  <p>🎤 {event.stage} Stage</p>
                )}
                {event.event_link && (
                  <p>
                    <a href={event.event_link} target="_blank" rel="noopener noreferrer">
                      More Info →
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </main>
    </>
  );
}
