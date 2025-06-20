// pages/events.tsx
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabase';
import styles from '../styles/Events.module.css';
import Navbar from '../components/Navbar';

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });

    if (!error) setEvents(data || []);
  };

  const filteredEvents = events.filter(event => {
    const matchTitle = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    const eventMonth = new Date(event.date).getMonth();
    return matchTitle && eventMonth === selectedMonth;
  });

  return (
    <>
      <Head>
        <title>Events Calendar | The Fort</title>
      </Head>
      <Navbar />
      <div className={styles.page}>
        <h1 className={styles.heading}>Events Calendar</h1>

        <div className={styles.controls}>
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />

          <select
            value={selectedMonth}
            onChange={e => setSelectedMonth(Number(e.target.value))}
            className={styles.monthSelect}
          >
            {months.map((month, i) => (
              <option key={i} value={i}>{month}</option>
            ))}
          </select>
        </div>

        <div className={styles.eventList}>
          {filteredEvents.map((event, index) => {
            const date = new Date(event.date);
            const isCancelled = event.is_cancelled;

            return (
              <div key={index} className={`${styles.eventCard} ${isCancelled ? styles.cancelled : ''}`}>
                <div className={styles.dateBox}>
                  <div className={styles.month}>{months[date.getMonth()].substring(0, 3)}</div>
                  <div className={styles.day}>{date.getDate()}</div>
                </div>

                <div className={styles.eventContent}>
                  <img
                    src={event.image_url || '/placeholder.jpg'}
                    alt={event.title}
                    className={styles.thumbnail}
                  />
                  <div className={styles.eventDetails}>
                    <h3>{event.title} {isCancelled ? '(Cancelled)' : ''}</h3>
                    <p>{event.description}</p>
                    {event.location && <p>📍 {event.location}</p>}
                    {event.stage && <p>🎤 Live on {event.stage} Stage</p>}
                    {event.event_link && (
                      <a href={event.event_link} target="_blank" rel="noopener noreferrer">
                        Additional Details →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
