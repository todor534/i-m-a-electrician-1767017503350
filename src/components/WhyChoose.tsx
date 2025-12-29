import React from 'react';

const colors = {
  bg: '#f8fafc',
  cardBg: '#ffffff',
  border: '#e5e7eb',
  text: '#374151',
  textMuted: '#6b7280',
  heading: '#111827',
  primary: '#2563eb',
  primarySoft: '#dbeafe',
  accent: '#0ea5e9',
  star: '#f59e0b',
  success: '#16a34a',
};

const styles: Record<string, React.CSSProperties> = {
  section: {
    padding: '72px 16px',
    backgroundColor: colors.bg,
  },
  container: {
    maxWidth: 1100,
    margin: '0 auto',
  },
  kicker: {
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.primary,
    background: colors.primarySoft,
    padding: '6px 10px',
    borderRadius: 999,
    marginBottom: 12,
  },
  heading: {
    fontSize: 32,
    lineHeight: 1.2,
    color: colors.heading,
    fontWeight: 800,
    margin: '8px 0 12px',
  },
  subheading: {
    fontSize: 16,
    color: colors.textMuted,
    margin: '0 0 28px',
    maxWidth: 760,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 24,
    alignItems: 'start',
  },
  leftCol: {
    display: 'grid',
    gap: 20,
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: 16,
  },
  featureCard: {
    display: 'flex',
    gap: 12,
    padding: 16,
    backgroundColor: colors.cardBg,
    border: `1px solid ${colors.border}`,
    borderRadius: 12,
    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#e0f2fe',
    color: '#0369a1',
    fontSize: 20,
    flexShrink: 0,
  },
  featureTextWrap: {
    display: 'grid',
    gap: 4,
  },
  featureTitle: {
    margin: 0,
    fontSize: 16,
    fontWeight: 700,
    color: colors.heading,
  },
  featureText: {
    margin: 0,
    fontSize: 14,
    color: colors.textMuted,
  },
  checklist: {
    display: 'grid',
    gap: 10,
  },
  checklistItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: '#f1f5f9',
    border: `1px dashed ${colors.border}`,
    padding: 12,
    borderRadius: 10,
  },
  checkIcon: {
    color: colors.success,
    fontSize: 18,
    lineHeight: '24px',
    flexShrink: 0,
  },
  checklistText: {
    margin: 0,
    color: colors.text,
    fontSize: 15,
    lineHeight: 1.4,
  },
  ctaRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 12,
    alignItems: 'center',
    marginTop: 6,
  },
  ctaButton: {
    display: 'inline-block',
    backgroundColor: colors.primary,
    color: '#fff',
    padding: '12px 16px',
    borderRadius: 10,
    textDecoration: 'none',
    fontWeight: 700,
    fontSize: 14,
  },
  noteText: {
    fontSize: 13,
    color: colors.textMuted,
  },
  rightCol: {
    position: 'relative',
  },
  imageCard: {
    position: 'relative',
    borderRadius: 14,
    overflow: 'hidden',
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.cardBg,
    boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
  },
  image: {
    display: 'block',
    width: '100%',
    height: 'auto',
  },
  badge: {
    position: 'absolute',
    left: 12,
    bottom: 12,
    background: '#ffffff',
    border: `1px solid ${colors.border}`,
    borderRadius: 12,
    padding: '10px 12px',
    boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
    display: 'grid',
    gap: 6,
    maxWidth: 'calc(100% - 24px)',
  },
  starsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  stars: {
    color: colors.star,
    fontSize: 16,
  },
  ratingText: {
    fontSize: 13,
    color: colors.text,
    fontWeight: 600,
  },
  statRow: {
    display: 'flex',
    gap: 10,
    flexWrap: 'wrap',
  },
  statChip: {
    fontSize: 12,
    color: colors.heading,
    background: '#f1f5f9',
    borderRadius: 999,
    padding: '6px 10px',
    border: `1px solid ${colors.border}`,
  },
};

function Feature({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div style={styles.featureCard}>
      <div aria-hidden="true" style={styles.icon}>
        {icon}
      </div>
      <div style={styles.featureTextWrap}>
        <h3 style={styles.featureTitle}>{title}</h3>
        <p style={styles.featureText}>{text}</p>
      </div>
    </div>
  );
}

export default function WhyChoose() {
  return (
    <section id="why-choose" aria-label="Why choose our electrical services" style={styles.section}>
      <div style={styles.container}>
        <span style={styles.kicker}>Why choose us</span>
        <h2 style={styles.heading}>Safe, reliable electrical work — done right the first time</h2>
        <p style={styles.subheading}>
          As a licensed, insured, and detail‑oriented electrician, I deliver code‑compliant work with clear communication and fair, upfront pricing.
        </p>

        <div style={styles.grid}>
          <div style={styles.leftCol}>
            <div style={styles.featureGrid}>
              <Feature
                icon="🛡️"
                title="Licensed & insured"
                text="Fully certified and compliant with local and national codes."
              />
              <Feature
                icon="⚡"
                title="Fast response"
                text="Same‑day and 24/7 emergency service options when you need it."
              />
              <Feature
                icon="💡"
                title="Expert workmanship"
                text="Clean installs, neat panels, and attention to every detail."
              />
              <Feature
                icon="💬"
                title="Clear communication"
                text="Straightforward recommendations and status updates."
              />
              <Feature
                icon="🏷️"
                title="Upfront pricing"
                text="No surprises. You approve the work before we begin."
              />
              <Feature
                icon="🧹"
                title="Respect for your home"
                text="Protective coverings and a thorough cleanup after the job."
              />
            </div>

            <div style={styles.checklist} aria-label="Service guarantees and benefits">
              <div style={styles.checklistItem}>
                <span aria-hidden="true" style={styles.checkIcon}>✓</span>
                <p style={styles.checklistText}>All work meets or exceeds the latest electrical code</p>
              </div>
              <div style={styles.checklistItem}>
                <span aria-hidden="true" style={styles.checkIcon}>✓</span>
                <p style={styles.checklistText}>Quality parts backed by warranty</p>
              </div>
              <div style={styles.checklistItem}>
                <span aria-hidden="true" style={styles.checkIcon}>✓</span>
                <p style={styles.checklistText}>Friendly, on‑time service you can count on</p>
              </div>
            </div>

            <div style={styles.ctaRow}>
              <a href="#contact" style={styles.ctaButton} aria-label="Go to contact form">
                Get a free quote
              </a>
              <span style={styles.noteText}>Quick replies. No obligation.</span>
            </div>
          </div>

          <div style={styles.rightCol}>
            <div style={styles.imageCard}>
              <img
                src="https://jg7nnjuy9jonydmm.public.blob.vercel-storage.com/ai/1767016858806-img-services.png"
                alt="Electrical service work in progress with neatly organized wiring"
                style={styles.image}
                loading="lazy"
              />
              <div style={styles.badge} aria-label="Customer rating and quick stats">
                <div style={styles.starsRow}>
                  <span aria-hidden="true" style={styles.stars}>★★★★★</span>
                  <span style={styles.ratingText}>5.0 from local homeowners</span>
                </div>
                <div style={styles.statRow}>
                  <span style={styles.statChip}>10+ years experience</span>
                  <span style={styles.statChip}>500+ jobs completed</span>
                  <span style={styles.statChip}>Same‑day repairs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}