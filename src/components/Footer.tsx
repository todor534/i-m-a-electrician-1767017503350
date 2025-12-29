import React from 'react';

const styles: { [k: string]: React.CSSProperties } = {
  footer: {
    backgroundColor: '#0b1220',
    color: '#e2e8f0',
    borderTop: '1px solid rgba(148,163,184,0.15)',
  },
  inner: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '48px 20px 20px',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 32,
    alignItems: 'flex-start',
  },
  col: {
    flex: '1 1 240px',
    minWidth: 220,
  },
  brand: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  brandName: {
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: 0.2,
    color: '#ffffff',
  },
  tagline: {
    color: '#cbd5e1',
    lineHeight: 1.5,
    fontSize: 14,
  },
  badgeRow: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
    marginTop: 8,
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '6px 10px',
    borderRadius: 999,
    backgroundColor: 'rgba(251,191,36,0.12)',
    color: '#fbbf24',
    fontWeight: 600,
    fontSize: 12,
    letterSpacing: 0.3,
  },
  heading: {
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: '#94a3b8',
    marginBottom: 12,
    fontWeight: 700,
  },
  list: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'grid',
    gap: 8,
  },
  link: {
    color: '#e2e8f0',
    textDecoration: 'none',
    fontSize: 14,
  },
  muted: {
    color: '#94a3b8',
    fontSize: 14,
    lineHeight: 1.6,
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    color: '#e2e8f0',
    textDecoration: 'none',
    fontSize: 14,
  },
  iconDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: '#fbbf24',
    display: 'inline-block',
  },
  callButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 14,
    padding: '10px 14px',
    backgroundColor: '#fbbf24',
    color: '#0b1220',
    borderRadius: 8,
    fontWeight: 700,
    textDecoration: 'none',
    fontSize: 14,
    boxShadow: '0 4px 10px rgba(251,191,36,0.25)',
  },
  smallNote: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 6,
  },
  hr: {
    border: 'none',
    borderTop: '1px solid rgba(148,163,184,0.15)',
    margin: '28px 0 0',
  },
  bottomBar: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 0 0',
    color: '#94a3b8',
    fontSize: 13,
  },
  backToTop: {
    color: '#cbd5e1',
    textDecoration: 'none',
    fontSize: 13,
  },
};

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer style={styles.footer} role="contentinfo">
      <div style={styles.inner}>
        <div style={styles.grid} aria-label="Footer">
          <section style={styles.col} aria-labelledby="footer-brand">
            <div style={styles.brand}>
              <div style={styles.brandName} id="footer-brand">
                BrightVolt Electric
              </div>
              <p style={styles.tagline}>
                Licensed & insured electrical services for homes and businesses. From panel upgrades to EV chargers, lighting,
                and emergency repairs—you’re in safe hands.
              </p>
              <div style={styles.badgeRow}>
                <span style={styles.badge} aria-label="24/7 Emergency Service">
                  24/7 Emergency
                </span>
                <span style={styles.badge} aria-label="Licensed and Insured">
                  Licensed • Insured
                </span>
              </div>
              <a
                href="tel:+15550123456"
                style={styles.callButton}
                aria-label="Call BrightVolt Electric at 555-012-3456"
              >
                Call (555) 012-3456
              </a>
              <div style={styles.smallNote}>License #EL-123456</div>
            </div>
          </section>

          <nav style={styles.col} aria-labelledby="footer-links">
            <div style={styles.heading} id="footer-links">Quick Links</div>
            <ul style={styles.list}>
              <li>
                <a style={styles.link} href="#home">Home</a>
              </li>
              <li>
                <a style={styles.link} href="#services">Services</a>
              </li>
              <li>
                <a style={styles.link} href="#why-choose-us">Why Choose Us</a>
              </li>
              <li>
                <a style={styles.link} href="#testimonials">Testimonials</a>
              </li>
              <li>
                <a style={styles.link} href="#contact">Contact</a>
              </li>
            </ul>
          </nav>

          <section style={styles.col} aria-labelledby="footer-areas">
            <div style={styles.heading} id="footer-areas">Service Areas</div>
            <ul style={styles.list}>
              <li style={styles.muted}>Springfield</li>
              <li style={styles.muted}>Rivertown</li>
              <li style={styles.muted}>Oak Valley</li>
              <li style={styles.muted}>Lakeside</li>
              <li style={styles.muted}>Brookfield</li>
            </ul>
          </section>

          <section style={styles.col} aria-labelledby="footer-contact">
            <div style={styles.heading} id="footer-contact">Contact</div>
            <ul style={styles.list}>
              <li>
                <a style={styles.contactItem} href="tel:+15550123456">
                  <span style={styles.iconDot} aria-hidden="true" />
                  (555) 012-3456
                </a>
              </li>
              <li>
                <a style={styles.contactItem} href="mailto:hello@brightvoltelectric.com">
                  <span style={styles.iconDot} aria-hidden="true" />
                  hello@brightvoltelectric.com
                </a>
              </li>
              <li>
                <div style={styles.contactItem}>
                  <span style={styles.iconDot} aria-hidden="true" />
                  Mon–Fri: 7:00a–6:00p
                </div>
              </li>
              <li>
                <div style={styles.contactItem}>
                  <span style={styles.iconDot} aria-hidden="true" />
                  Sat: 8:00a–2:00p • Sun: On call
                </div>
              </li>
              <li>
                <div style={styles.contactItem}>
                  <span style={styles.iconDot} aria-hidden="true" />
                  Emergency: 24/7
                </div>
              </li>
            </ul>
          </section>
        </div>

        <hr style={styles.hr} />

        <div style={styles.bottomBar}>
          <div>© {year} BrightVolt Electric. All rights reserved.</div>
          <a href="#home" style={styles.backToTop} aria-label="Back to top">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;