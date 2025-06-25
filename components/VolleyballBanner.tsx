import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import styles from '../styles/Home.module.css';

export default function VolleyballBanner() {
  const [bannerText, setBannerText] = useState('No Games Scheduled For Today');
  const [bannerColor, setBannerColor] = useState('#ccc');

  useEffect(() => {
    const today = new Date();
    const todayISO = today.toISOString().split('T')[0];
    const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });

    console.log('📅 Today is:', todayISO);
    console.log('🗓️ Day of week:', dayName);

    const fetchBanner = async () => {
      try {
        // Step 1: Check volleyball_banners
        const { data: bannerData, error: bannerError } = await supabase
          .from('volleyball_banners')
          .select('*')
          .eq('banner_date', todayISO)
          .single();

        if (bannerError) console.error('⚠️ Error fetching bannerData:', bannerError);
        else console.log('🧾 volleyball_banners:', bannerData);

        if (bannerData?.status === 'cancelled') {
          console.log('❌ Banner override: Cancelled');
          setBannerText('Games Cancelled Due to Weather');
          setBannerColor('red');
          return;
        } else if (bannerData?.status === 'practice') {
          console.log('🟠 Banner override: Practice only');
          setBannerText('Practice Night Only');
          setBannerColor('orange');
          return;
        } else if (bannerData?.status === 'pending') {
          console.log('🟡 Banner override: Pending weather');
          setBannerText('Games Pending Weather');
          setBannerColor('#FFEB3B');
          return;
        }

        // Step 2: Check if teams play today
        const { data: teamsToday, error: teamError } = await supabase
          .from('teams')
          .select('*')
          .ilike('day', `%${dayName}%`);

        if (teamError) {
          console.error('⚠️ Error fetching teams:', teamError);
        } else {
          console.log('✅ Teams scheduled today:', teamsToday);
        }

        if (teamsToday && teamsToday.length > 0) {
          setBannerText('Games Are On Tonight!');
          setBannerColor('green');
        } else {
          setBannerText('No Games Scheduled For Today');
          setBannerColor('#ccc');
        }
      } catch (err) {
        console.error('🚨 Unexpected error in fetchBanner():', err);
      }
    };

    fetchBanner();
  }, []);

  return (
    <div
      className={styles.banner}
      style={{
        backgroundColor: bannerColor,
        color: '#fff',
        padding: '12px 24px',
        borderRadius: '12px',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        textAlign: 'center',
      }}
    >
      {bannerText}
    </div>
  );
}
