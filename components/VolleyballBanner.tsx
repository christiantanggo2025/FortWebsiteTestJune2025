import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import styles from '../styles/Home.module.css';

export default function VolleyballBanner() {
  const [bannerText, setBannerText] = useState('No Games Scheduled For Today');
  const [bannerColor, setBannerColor] = useState('#ccc');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    const fetchBanner = async () => {
      const { data, error } = await supabase
        .from('volleyball_banners')
        .select('*')
        .eq('banner_date', today)
        .single();

      if (error || !data) {
        setBannerText('No Games Scheduled For Today');
        setBannerColor('#ccc');
        return;
      }

      const status = data.status || '';
      if (status === 'games') {
        setBannerText('Games Are On Tonight!');
        setBannerColor('green');
      } else if (status === 'practice') {
        setBannerText('Practice Night Only');
        setBannerColor('orange');
      } else if (status === 'cancelled') {
        setBannerText('Games Cancelled Due to Weather');
        setBannerColor('red');
      } else {
        setBannerText('No Games Scheduled For Today');
        setBannerColor('#ccc');
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
