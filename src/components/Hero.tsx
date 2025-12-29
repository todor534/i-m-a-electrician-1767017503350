import { CSSProperties } from 'react';

export default function Hero() {
  return (
    <section id="home" style={styles.section}>
      <div style={styles.wrapper}>
        <div style={styles.content}>
          <div style={styles.badgeRow}>
            <span style={styles.badge}>Licensed & Insured</span>
            <span style={{ ...styles.badge, background: '#0ea5e9' }}>24/7 Service</span>
            <span style={{ ...styles.badge, background: '#22c55e' }}>Satisfaction Guaranteed</span>
          </div>

          <h1 style={styles.title}>
            Reliable Residential & Commercial Electrical Services
          </h1>

          <p style={styles.subtitle}>
            Emergency repairs, panel upgrades, lighting, EV chargers, inspections and more.
            Fast, clean, and done right the first time.
          </p>

          <ul style={styles.points}>
            <li style={styles.pointItem}>
              <span style={styles.pointIcon} aria-hidden="true">✓</span>
              Upfront pricing with no surprises
            </li>
            <li style={styles.pointItem}>
              <span style={styles.pointIcon} aria-hidden="true">✓</span>
              Same-day and emergency availability
            </li>
            <li style={styles.pointItem}>
              <span style={styles.pointIcon} aria-hidden="true">✓</span>
              Code-compliant, clean workmanship
            </li>
          </ul>

          <div style={styles.ctaRow}>
            <a href="#contact" style={styles.primaryBtn} aria-label="Request a free quote">
              Get a Free Quote
            </a>
            <a href="tel:+15559871234" style={styles.secondaryBtn} aria-label="Call now">
              Call (555) 987-1234
            </a>
          </div>

          <div style={styles.trustRow}>
            <div style={styles.stars} aria-label="Rated 5 out of 5 stars">
              ★★★★★
            </div>
            <div style={styles.trustText}>Trusted by 300+ homeowners and businesses</div>
          </div>
        </div>

        <div style={styles.media}>
          <div style={styles.mediaWrap}>
            <img
              src="https://jg7nnjuy9jonydmm.public.blob.vercel-storage.com/ai/1767016811919-img-hero.png"
              alt="Professional electrician installing a modern electrical panel"
              style={styles.image}
              loading="eager"
              decoding="async"
            />
            <div style={styles.overlayCard} aria-hidden="true">
              <div style={styles.overlayTitle}>On-Time Guarantee</div>
              <div style={styles.overlayText}>Or we pick up the service fee</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  section: {
    background:
      'linear-gradient(180deg, rgba(2,6,23,1) 0%, rgba(2,6,23,0.9) 35%, rgba(2,6,23,0.85) 100%)',
    color: '#f8fafc',
    padding: '48px 16px',
  },
  wrapper: {
    maxWidth: 1200,
    margin: '0 auto',
    display: 'flex',
    gap: 32,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  content: {
    flex: '1 1 460px',
    minWidth: 280,
  },
  badgeRow: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  badge: {
    display: 'inline-block',
    background: '#f59e0b',
    color: '#0b1220',
    fontWeight: 700,
    fontSize: 12,
    padding: '6px 10px',
    borderRadius: 999,
    letterSpacing: 0.4,
  },
  title: {
    fontSize: 40,
    lineHeight: 1.1,
    margin: '8px 0 12px',
    fontWeight: 800,
    letterSpacing: -0.5,
  },
  subtitle: {
    color: '#cbd5e1',
    fontSize: 18,
    lineHeight: 1.6,
    margin: '0 0 16px',
    maxWidth: 680,
  },
  points: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 20px',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(200px, 1fr))',
    gap: 10,
  } as CSSProperties,
  pointItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    color: '#e2e8f0',
    fontSize: 15,
  },
  pointIcon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#16a34a',
    color: '#ffffff',
    width: 20,
    height: 20,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 900,
  },
  ctaRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
    marginBottom: 16,
  },
  primaryBtn: {
    display: 'inline-block',
    background: '#22c55e',
    color: '#031524',
    padding: '12px 18px',
    borderRadius: 10,
    fontWeight: 800,
    textDecoration: 'none',
    boxShadow: '0 8px 20px rgba(34,197,94,0.25)',
    transition: 'transform 120ms ease, box-shadow 120ms ease',
  },
  secondaryBtn: {
    display: 'inline-block',
    background: 'transparent',
    color: '#e2e8f0',
    border: '1px solid rgba(226,232,240,0.25)',
    padding: '12px 16px',
    borderRadius: 10,
    fontWeight: 700,
    textDecoration: 'none',
    backdropFilter: 'blur(2px)',
  },
  trustRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
    color: '#cbd5e1',
    fontSize: 14,
    flexWrap: 'wrap',
  },
  stars: {
    color: '#fbbf24',
    letterSpacing: 2,
    fontWeight: 700,
  },
  trustText: {
    opacity: 0.9,
  },
  media: {
    flex: '1 1 380px',
    minWidth: 260,
    display: 'flex',
    justifyContent: 'center',
  },
  mediaWrap: {
    position: 'relative',
    width: '100%',
    maxWidth: 520,
  },
  image: {
    width: '100%',
    height: 'auto',
    display: 'block',
    borderRadius: 16,
    boxShadow:
      '0 12px 40px rgba(0,0,0,0.45), 0 2px 10px rgba(0,0,0,0.25)',
    objectFit: 'cover',
  },
  overlayCard: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    background: 'rgba(2,6,23,0.75)',
    border: '1px solid rgba(148,163,184,0.25)',
    padding: '10px 12px',
    borderRadius: 12,
    color: '#e2e8f0',
    boxShadow: '0 6px 20px rgba(0,0,0,0.35)',
    backdropFilter: 'blur(6px)',
  },
  overlayTitle: {
    fontWeight: 800,
    fontSize: 13,
    color: '#f1f5f9',
    marginBottom: 2,
  },
  overlayText: {
    fontSize: 12,
    color: '#cbd5e1',
  },
};