import React, { CSSProperties, memo } from 'react';

type IconProps = { size?: number; color?: string };

// Simple, inline SVG icons
const BoltIcon: React.FC<IconProps> = ({ size = 28, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
    <path d="M13 2L3 14h6l-2 8 10-12h-6l2-8z" />
  </svg>
);

const LightIcon: React.FC<IconProps> = ({ size = 28, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 3a7 7 0 0 0-4 12.9V18a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.1A7 7 0 0 0 12 3z" stroke={color} strokeWidth="2" />
    <path d="M9 22h6" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const OutletIcon: React.FC<IconProps> = ({ size = 28, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="3" stroke={color} strokeWidth="2" />
    <circle cx="9" cy="10" r="1.5" fill={color} />
    <circle cx="15" cy="10" r="1.5" fill={color} />
    <path d="M9 15h6" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const PanelIcon: React.FC<IconProps> = ({ size = 28, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="5" y="3" width="14" height="18" rx="2" stroke={color} strokeWidth="2" />
    <path d="M8 7h8M8 11h8M8 15h5" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const WireIcon: React.FC<IconProps> = ({ size = 28, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M3 7c4 0 4 10 8 10s4-10 8-10" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M7 5v4M17 5v4" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const EVIcon: React.FC<IconProps> = ({ size = 28, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 16V9a4 4 0 0 1 4-4h3a4 4 0 0 1 4 4v7" stroke={color} strokeWidth="2" />
    <path d="M7 16h10" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <circle cx="9" cy="18.5" r="1.5" fill={color} />
    <circle cx="15" cy="18.5" r="1.5" fill={color} />
    <path d="M18 7v3a2 2 0 0 0 2 2h1V6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M20 6l2-2" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

type Service = {
  title: string;
  points: string[];
  price?: string;
  Icon: React.FC<IconProps>;
};

const services: Service[] = [
  {
    title: 'Emergency Electrical Repairs',
    points: ['24/7 call-out available', 'Fault finding & diagnostics', 'Power restoration'],
    price: 'From $120 call-out',
    Icon: BoltIcon,
  },
  {
    title: 'Lighting & Fixtures',
    points: ['LED upgrades', 'Recessed/feature lighting', 'Outdoor & security lights'],
    price: 'From $90',
    Icon: LightIcon,
  },
  {
    title: 'Outlets & Switches',
    points: ['GFCI/AFCI protection', 'USB & smart outlets', 'Dimmer & 3-way switches'],
    price: 'From $85',
    Icon: OutletIcon,
  },
  {
    title: 'Panel & Service Upgrades',
    points: ['100A–200A upgrades', 'Breaker replacements', 'Load calculations & permits'],
    price: 'Free estimates',
    Icon: PanelIcon,
  },
  {
    title: 'Rewiring & Renovations',
    points: ['Kitchen/bath remodels', 'Aluminum to copper pigtailing', 'Old/home knob & tube solutions'],
    price: 'Project-based',
    Icon: WireIcon,
  },
  {
    title: 'EV Chargers & New Circuits',
    points: ['Level 2 installs', 'Dedicated circuits', 'Code-compliant installs'],
    price: 'From $450 installed',
    Icon: EVIcon,
  },
];

const colors = {
  bg: '#ffffff',
  soft: '#f6f8fb',
  border: '#e6e9ef',
  text: '#1f2a37',
  subtext: '#4b5563',
  primary: '#0e7afe',
  primaryDark: '#0860c4',
  accentBg: '#e8f1ff',
  shadow: '0 6px 24px rgba(16, 24, 40, 0.06)',
};

const styles: Record<string, CSSProperties> = {
  section: {
    background: colors.bg,
    padding: '64px 16px',
  },
  container: {
    maxWidth: 1120,
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: 28,
  },
  eyebrow: {
    display: 'inline-block',
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.primaryDark,
    background: colors.accentBg,
    borderRadius: 999,
    padding: '6px 10px',
    marginBottom: 10,
    fontWeight: 600,
  },
  title: {
    fontSize: 32,
    lineHeight: 1.2,
    margin: '8px 0',
    color: colors.text,
    fontWeight: 800,
  },
  subtitle: {
    fontSize: 16,
    color: colors.subtext,
    maxWidth: 720,
    margin: '0 auto',
  },
  contentRow: {
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',
    gap: 24,
    flexWrap: 'wrap',
    marginTop: 24,
  },
  grid: {
    flex: '1 1 560px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: 16,
  },
  card: {
    border: `1px solid ${colors.border}`,
    borderRadius: 14,
    background: colors.soft,
    padding: 18,
    boxShadow: colors.shadow,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 180,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 10,
    background: colors.accentBg,
    color: colors.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: colors.text,
    margin: '2px 0 8px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    color: colors.subtext,
    fontSize: 14,
    lineHeight: 1.6,
    flexGrow: 1,
  },
  listItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 6,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 999,
    marginTop: 7,
    background: colors.primary,
    flexShrink: 0,
  },
  priceRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 10,
    borderTop: `1px dashed ${colors.border}`,
    gap: 8,
  },
  price: {
    fontWeight: 700,
    color: colors.text,
    fontSize: 14,
  },
  smallCta: {
    textDecoration: 'none',
    color: '#fff',
    background: colors.primary,
    borderRadius: 8,
    padding: '8px 10px',
    fontSize: 13,
    fontWeight: 600,
    boxShadow: '0 2px 8px rgba(14,122,254,0.25)',
  },
  sideImageWrap: {
    flex: '1 1 320px',
    minWidth: 280,
    maxWidth: 420,
    alignSelf: 'stretch',
    display: 'flex',
  },
  sideImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 14,
    border: `1px solid ${colors.border}`,
    boxShadow: colors.shadow,
  },
  ctaBar: {
    marginTop: 28,
    border: `1px solid ${colors.border}`,
    background: colors.soft,
    padding: 16,
    borderRadius: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    flexWrap: 'wrap',
  },
  ctaText: {
    color: colors.text,
    fontWeight: 600,
    fontSize: 16,
  },
  ctaButton: {
    textDecoration: 'none',
    background: colors.primary,
    color: '#ffffff',
    fontWeight: 700,
    fontSize: 14,
    padding: '12px 16px',
    borderRadius: 10,
    boxShadow: '0 6px 16px rgba(14,122,254,0.28)',
  },
};

const Services = memo(function Services() {
  return (
    <section id="services" aria-labelledby="services-title" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <span style={styles.eyebrow}>What I do</span>
          <h2 id="services-title" style={styles.title}>Electrical Services</h2>
          <p style={styles.subtitle}>
            Licensed, insured, and committed to safe, code-compliant work. From small fixes to full upgrades—clear
            pricing and friendly service.
          </p>
        </div>

        <div style={styles.contentRow}>
          <div style={styles.grid}>
            {services.map(({ title, points, price, Icon }) => (
              <article key={title} style={styles.card} aria-label={title}>
                <div style={styles.iconWrap}>
                  <Icon size={22} />
                </div>
                <h3 style={styles.cardTitle}>{title}</h3>
                <ul style={styles.list}>
                  {points.map((p) => (
                    <li key={p} style={styles.listItem}>
                      <span style={styles.bullet} />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <div style={styles.priceRow}>
                  <span style={styles.price}>{price ?? 'Contact for pricing'}</span>
                  <a href="#contact" style={styles.smallCta} aria-label={`Get a quote for ${title}`}>
                    Get a quote
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div style={styles.sideImageWrap} aria-hidden="true">
            <img
              src="https://jg7nnjuy9jonydmm.public.blob.vercel-storage.com/ai/1767016858806-img-services.png"
              alt="Electrician installing a light fixture"
              style={styles.sideImage}
              loading="lazy"
            />
          </div>
        </div>

        <div style={styles.ctaBar}>
          <p style={styles.ctaText}>Not sure where to start? I’m happy to advise and provide a free quote.</p>
          <a href="#contact" style={styles.ctaButton}>Request free quote</a>
        </div>
      </div>
    </section>
  );
});

export default Services;