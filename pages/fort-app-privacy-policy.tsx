// pages/fort-app-privacy-policy.tsx
import Head from 'next/head';

export default function FortAppPrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Fort App Privacy Policy</title>
      </Head>
      <main style={{
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto',
        color: 'white',
        lineHeight: '1.8',
        fontSize: '1rem'
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Privacy Policy – Fort App</h1>
        <p><em>Effective Date: June 26, 2025</em></p>

        <p>
          This Privacy Policy describes how The Fort Fun Center ("we", "our", "us") collects, uses, and protects personal information through The Fort App, available to players, captains, employees, managers, and owners of our recreational volleyball league.
        </p>

        <p>
          By using The Fort App, you agree to the terms outlined below.
        </p>

        <h2 style={{ marginTop: '2rem' }}>1. Information We Collect</h2>
        <h3 style={{ marginTop: '1rem' }}>a. Personal Information</h3>
        <ul>
          <li>Full name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Team registration info</li>
          <li>Profile photo (if uploaded)</li>
          <li>Role designation (Player, Captain, Employee, Manager, Owner)</li>
        </ul>

        <h3 style={{ marginTop: '1rem' }}>b. Volleyball Data</h3>
        <ul>
          <li>Team names, assignments, and rosters</li>
          <li>Game schedules and participation</li>
          <li>Attendance and check-in history</li>
          <li>Scores and standings</li>
        </ul>

        <h3 style={{ marginTop: '1rem' }}>c. Device and Usage Data</h3>
        <ul>
          <li>IP address and device type</li>
          <li>Date and time of access</li>
          <li>In-app actions (e.g., check-out, schedule views)</li>
          <li>Notification preferences</li>
        </ul>

        <h3 style={{ marginTop: '1rem' }}>d. Location Data</h3>
        <p>
          Used only when a user checks in from the facility. Location services are optional and temporary.
        </p>

        <h2 style={{ marginTop: '2rem' }}>2. How We Use This Information</h2>
        <ul>
          <li>Operate and improve The Fort App</li>
          <li>Assign players to teams and manage scheduling</li>
          <li>Enable staff to check players in and monitor attendance</li>
          <li>Notify users about schedule changes, promotions, and updates</li>
          <li>Display live standings and team stats</li>
          <li>Comply with legal obligations when required</li>
        </ul>

        <h2 style={{ marginTop: '2rem' }}>3. Notifications</h2>
        <p>
          You can opt in or out of notifications such as:
        </p>
        <ul>
          <li>Schedule updates</li>
          <li>Weather-related cancellations</li>
          <li>Promotions and special offers</li>
          <li>League standings and tournament announcements</li>
        </ul>

        <h2 style={{ marginTop: '2rem' }}>4. Data Security</h2>
        <p>
          We use secure connections (HTTPS), role-based access controls, data backups, and encrypted databases to safeguard your information.
        </p>

        <h2 style={{ marginTop: '2rem' }}>5. Data Sharing</h2>
        <p>
          We do <strong>not</strong> sell or share personal data with third parties. Data access is limited to:
        </p>
        <ul>
          <li>App administrators (managers and owners)</li>
          <li>Staff for operational purposes</li>
          <li>Captains (limited to their own team data)</li>
        </ul>

        <h2 style={{ marginTop: '2rem' }}>6. Data Retention</h2>
        <p>
          Your data is stored during your participation in the league. Inactive accounts may be archived or deleted after 12 months.
        </p>

        <h2 style={{ marginTop: '2rem' }}>7. Location Permissions</h2>
        <p>
          The app may request permission to use your device’s location only during check-in. We do not track location continuously.
        </p>

        <h2 style={{ marginTop: '2rem' }}>8. Children’s Privacy</h2>
        <p>
          This app is not intended for children under 13. Players under 13 must have a parent or guardian on file.
        </p>

        <h2 style={{ marginTop: '2rem' }}>9. Your Rights & Contact</h2>
        <p>
          You may request access to your data, corrections, or full deletion at any time by contacting:
        </p>
        <p>
          📧 <a href="mailto:info@thefortfuncenter.ca" style={{ color: 'lightblue' }}>info@thefortfuncenter.ca</a>
        </p>

        <h2 style={{ marginTop: '2rem' }}>10. Policy Updates</h2>
        <p>
          This policy may change. Any updates will be posted at:
        </p>
        <p>
          🔗 <a href="/fort-app-privacy-policy" style={{ color: 'lightblue' }}>https://thefortfuncenter.ca/fort-app-privacy-policy</a>
        </p>
      </main>
    </>
  );
}
