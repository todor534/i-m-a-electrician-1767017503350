import React from 'react';

type Testimonial = {
  name: string;
  location: string;
  quote: string;
  rating: number;
  avatar: string;
};

const testimonials: Testimonial[] = [
  {
    name: 'Mark Stevenson',
    location: 'Homeowner in Brookside',
    quote:
      "Fast, friendly, and professional. He diagnosed our tripping breaker in minutes and had everything working safely the same day.",
    rating: 5,
    avatar: 'https://jg7nnjuy9jonydmm.public.blob.vercel-storage.com/ai/1767016918637-img-portrait.png',
  },
  {
    name: 'Sandra Cole',
    location: 'Small Business Owner',
    quote:
      "Excellent workmanship. Upgraded our shop's lighting and the difference is night and day. On time and on budget.",
    rating: 5,
    avatar: 'https://jg7nnjuy9jonydmm.public.blob.vercel-storage.com/ai/1767016918637-img-portrait.png',
  },
  {
    name: 'Luis Ramirez',
    location: 'Property Manager',
    quote:
      "Reliable and knowledgeable. Helped rewire an old unit to code and walked us through every step. Highly recommend.",
    rating: 5,
    avatar: 'https://jg7nnjuy9jonydmm.public.blob.vercel-storage.com/ai/1767016918637-img-portrait.png',
  },
];

const styles: { [k: string]: React.CSSProperties } = {
  section: {
    backgroundColor: '#0f172a',
    color: '#e2e8f0',
    padding: '72px 16px',
    borderTop: '1px solid rgba(148,163,184,0.15)',
    borderBottom: '1px solid rgba(148,163,184,0.1)',
  },
  container: {
    maxWidth: 1100,
    margin: '0 auto',
  },
  headerWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    marginBottom: 32,
    textAlign: 'center',
  },
  eyebrow: {
    fontSize: 13,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#93c5fd',
    fontWeight: 700,
  },
  title: {
    fontSize: 28,
    lineHeight: 1.2,
    margin: 0,
    color: '#f8fafc',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 1.6,
    margin: '8px 0 0',
    color: '#cbd5e1',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 16,
  },
  card: {
    backgroundColor: '#0b1220',
    border: '1px solid rgba(148,163,184,0.18)',
    borderRadius: 12,
    padding: 20,
    flex: '1 1 320px',
    minWidth: 280,
    maxWidth: 420,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    transition: 'transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease',
    boxShadow: '0 4px 18px rgba(2,6,23,0.35)',
  },
  cardHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 28px rgba(2,6,23,0.5)',
    borderColor: 'rgba(147,197,253,0.35)',
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: '50%',
    objectFit: 'cover',
    border: '1px solid rgba(148,163,184,0.3)',
  },
  identity: {
    display: 'flex',
    flexDirection: 'column',
  },
  name: {
    fontWeight: 700,
    color: '#f8fafc',
    margin: 0,
    fontSize: 16,
  },
  location: {
    margin: 0,
    color: '#94a3b8',
    fontSize: 13,
  },
  starsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  quote: {
    margin: 0,
    color: '#e2e8f0',
    lineHeight: 1.6,
    fontSize: 15,
  },
  ctaRow: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 24,
  },
  ctaLink: {
    color: '#93c5fd',
    textDecoration: 'none',
    fontWeight: 600,
    borderBottom: '1px dashed rgba(147,197,253,0.6)',
    paddingBottom: 2,
  },
};

function StarIcon(props: { filled?: boolean }) {
  const { filled = true } = props;
  const fill = filled ? '#f59e0b' : 'none';
  const stroke = '#f59e0b';
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 17.27 6.18 20.5l1.12-6.54L2 9.24l6.59-.96L12 2l3.41 6.28 6.59.96-4.77 4.72 1.12 6.54z" />
    </svg>
  );
}

function Stars({ rating }: { rating: number }) {
  const max = 5;
  const full = Math.round(Math.max(0, Math.min(max, rating)));
  return (
    <div style={styles.starsRow} aria-label={`${full} out of ${max} stars`}>
      {Array.from({ length: max }).map((_, i) => (
        <StarIcon key={i} filled={i < full} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" aria-labelledby="testimonials-title" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.headerWrap}>
          <div style={styles.eyebrow}>Customer reviews</div>
          <h2 id="testimonials-title" style={styles.title}>
            Trusted by homeowners and local businesses
          </h2>
          <p style={styles.subtitle}>
            Friendly service, clean work, and safety-first electrical solutions. Here’s what clients say.
          </p>
        </div>

        <div style={styles.grid}>
          {testimonials.map((t, idx) => (
            <Card key={idx} testimonial={t} />
          ))}
        </div>

        <div style={styles.ctaRow}>
          <a
            href="#contact"
            style={styles.ctaLink}
            aria-label="Get a free quote"
          >
            Get a free quote
          </a>
        </div>
      </div>
    </section>
  );
}

function Card({ testimonial }: { testimonial: Testimonial }) {
  const [hover, setHover] = React.useState(false);
  const style = hover
    ? { ...styles.card, ...styles.cardHover }
    : styles.card;

  return (
    <article
      style={style}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={`Review from ${testimonial.name}`}
    >
      <div style={styles.headerRow}>
        <img
          src={testimonial.avatar}
          alt={`${testimonial.name} portrait`}
          style={styles.avatar}
          width={48}
          height={48}
          loading="lazy"
        />
        <div style={styles.identity}>
          <p style={styles.name}>{testimonial.name}</p>
          <p style={styles.location}>{testimonial.location}</p>
        </div>
      </div>

      <Stars rating={testimonial.rating} />

      <blockquote style={styles.quote}>
        “{testimonial.quote}”
      </blockquote>
    </article>
  );
}