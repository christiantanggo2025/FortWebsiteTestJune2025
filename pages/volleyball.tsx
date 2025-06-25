import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Navbar';
import Footer from '../components/Footer';
import styles from '../styles/Home.module.css';
import { supabase } from '../supabase';
import { FaMedal } from 'react-icons/fa';

export default function VolleyballPage() {
  type Match = {
    id: string;
    match_date: string;
    court: number;
    team1: string;
    team2: string;
    round: number;
  };

  const [schedule, setSchedule] = useState<Match[]>([]);
  type Standing = {
    team_name: string;
   points: number;
  };

  const [standings, setStandings] = useState<Standing[]>([]);
  const [expandedDates, setExpandedDates] = useState<string[]>([]);
  const [expandStandings, setExpandStandings] = useState(false);
  const [bannerStatus, setBannerStatus] = useState<"games" | "practice" | "cancelled" | "pending" | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date().toISOString().split('T')[0];

      const { data: matchData } = await supabase
        .from('schedules')
        .select('*')
        .gte('match_date', today)
        .order('match_date', { ascending: true });

      const { data: standingsData } = await supabase
        .from('volleyball_scores_summary')
        .select('*')
        .order('points', { ascending: false });

      const { data: bannerData } = await supabase
        .from('volleyball_banners')
        .select('*')
        .eq('banner_date', today);

      setSchedule(matchData || []);
      setStandings(standingsData || []);
      setBannerStatus(bannerData?.[0]?.status || null);
    };

    fetchData();
  }, []);

  const groupedSchedule = schedule.reduce((acc: { [key: string]: Match[] }, match: Match) => {
    const date = match.match_date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(match);
    return acc;
  }, {});

  const toggleExpand = (date: string) => {
    setExpandedDates(prev =>
      prev.includes(date) ? prev.filter(d => d !== date) : [...prev, date]
    );
  };

  const renderBannerMessage = () => {
    switch (bannerStatus) {
      case 'games':
        return 'Games Tonight';
      case 'practice':
        return 'Practice Night';
      case 'cancelled':
        return 'Games Cancelled';
      case 'pending':
        return 'Games Pending Weather';
      default:
        return 'No Games Scheduled For Today';
    }
  };

  return (
    <>
      <Head>
        <title>Volleyball at The Fort</title>
      </Head>
      <Header />

      <main className={styles.volleyballPage}>
        {/* Hero Image */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ width: '100%', maxWidth: '1020px', margin: '0 auto' }}>
            <Image
              src="/images/volleyball-hero.png"
              alt="Volleyball Hero"
              width={700}
              height={200}
              layout="responsive"
              style={{
                borderRadius: '12px',
                border: '4px solid white',
                objectFit: 'cover'
              }}
            />
          </div>
          <div style={{ width: '100%', maxWidth: '1020px', margin: '12px auto 0 auto' }}>
            <div
              style={{
                fontWeight: 'bold',
                padding: '12px 20px',
                borderRadius: '8px',
                textAlign: 'center',
                color: '#000',
                backgroundColor:
                  bannerStatus === 'games'
                    ? '#4CAF50'
                    : bannerStatus === 'cancelled'
                    ? '#F44336'
                    : bannerStatus === 'practice'
                    ? '#2196F3'
                    : bannerStatus === 'pending'
                    ? '#FFEB3B'
                    : '#BDBDBD'
              }}
            >
              {renderBannerMessage()}
            </div>
          </div>
        </div>

        {/* Card Row */}
        <div
          style={{
            display: 'flex',
            gap: '30px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}
        >
          {/* Upcoming Schedule Card */}
          <div className={styles.attractionCard} style={{ flex: '1 1 400px', maxWidth: '500px' }}>
            <h3>Upcoming Schedule</h3>
            {Object.keys(groupedSchedule).length > 0 ? (
              <>
                {Object.entries(groupedSchedule)
                  .slice(0, 1)
                  .map(([date, matches]) => (
                    <div key={date}>
                      <h4>{new Date(date).toLocaleDateString()}</h4>
                      {matches
                        .filter(m => m.round === 1)
                        .map(match => (
                          <p key={match.id}>
                            Court {match.court}: {match.team1} vs. {match.team2}
                          </p>
                        ))}
                      <button onClick={() => toggleExpand(date)}>See Full Schedule</button>
                    </div>
                  ))}

                {Object.entries(groupedSchedule).map(([date, matches]) =>
                  expandedDates.includes(date) ? (
                    <div key={date}>
                      <h4>{new Date(date).toLocaleDateString()}</h4>
                      {matches.map(match => (
                        <p key={match.id}>
                          Round {match.round}, Court {match.court}: {match.team1} vs. {match.team2}
                        </p>
                      ))}
                    </div>
                  ) : null
                )}
              </>
            ) : (
              <>
                <p>Check back for your upcoming schedule.</p>
                <button disabled style={{ opacity: 0.5, cursor: 'not-allowed', marginTop: '12px' }}>
                  See Full Schedule
                </button>
              </>
            )}
          </div>

          {/* Team Standings Card */}
          <div className={styles.attractionCard} style={{ flex: '1 1 400px', maxWidth: '500px', color: 'white' }}>
            <h3>Team Standings</h3>
            {standings.length > 0 ? (
              <>
                {standings.slice(0, 3).map((team, index) => (
                  <div key={team.team_name} style={{ marginBottom: 6 }}>
                    <FaMedal
                      color={index === 0 ? 'gold' : index === 1 ? 'silver' : '#cd7f32'}
                      style={{ marginRight: 8 }}
                    />
                    {team.team_name} – {team.points} pts
                  </div>
                ))}
                <button onClick={() => setExpandStandings(!expandStandings)}>
                  See All Standings
                </button>
                {expandStandings &&
                  standings.slice(3).map(team => (
                    <div key={team.team_name}>{team.team_name} – {team.points} pts</div>
                  ))}
              </>
            ) : (
              <p>Check back for standings soon.</p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
