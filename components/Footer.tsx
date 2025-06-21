// components/Footer.tsx
import styles from './Footer.module.css';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.columns}>
        {/* Column 1: Logo & Contact */}
        <div className={styles.column}>
          <Image
            src="/fort-logo.png"
            alt="The Fort Logo"
            width={150}
            height={60}
            className={styles.logoImage}
          />
          <p><span className={styles.label}>Phone:</span><br />519-736-4382</p>
          <p><span className={styles.label}>Email:</span><br />info@thefortfuncenter.ca</p>
          <div className={styles.social}>
            <a href="https://www.facebook.com/thefortfuncenter" target="_blank" rel="noreferrer">
              <Image src="/facebook-icon.png" alt="Facebook" width={32} height={32} />
            </a>
            <a href="https://www.instagram.com/thefortfuncenter/" target="_blank" rel="noreferrer">
              <Image src="/instagram-icon.png" alt="Instagram" width={32} height={32} />
            </a>
          </div>
        </div>

        {/* Column 2: Contact Us & Details */}
        <div className={styles.column}>
          <h4>Contact Us</h4>
          <p>
            Got questions or feedback? We’re here to help! Reach out to us anytime via phone or email.
            Our team is standing by to assist you with anything you need.
          </p>

          <div className={styles.contactBlock}>
            <p>📍 689 Texas Road, Amherstburg, ON</p>
            <p>📞 <a href="tel:5197364382">519-736-4382</a></p>
            <p>✉️ <a href="mailto:info@thefortfuncenter.ca">info@thefortfuncenter.ca</a></p>
			<p>
 			 📝 <a href="mailto:info@thefortfuncenter.ca?subject=Applying%20For%20A%20Position">
 			   Apply To Work At The Fort
 			 </a>
			</p>
          </div>
        </div>

        {/* Column 3: Map */}
        <div className={styles.column}>
          <h4>Find Us</h4>
          <Image
            src="/map-preview.png"
            alt="Map to The Fort"
            width={250}
            height={150}
            className={styles.mapImage}
          />
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© The Fort Fun Center {new Date().getFullYear()}. All rights reserved.</p>
        <p className={styles.employeeLogin}>
          <a
            href="https://admin.tavari.systems/login?redirectTo=https://thefortfuncenter.ca/admin"
            target="_blank"
            rel="noopener noreferrer"
          >
            Employee Login
          </a>
        </p>
      </div>
    </footer>
  );
}
