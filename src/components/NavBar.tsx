import React, { useEffect, useRef, useState } from 'react';

const logoUrl = 'https://jg7nnjuy9jonydmm.public.blob.vercel-storage.com/ai/1767016946570-img-logo.png';

const NavBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(typeof window !== 'undefined' ? window.innerWidth >= 900 : true);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 900);
    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (!hash.startsWith('#')) return;
    e.preventDefault();
    setMenuOpen(false);

    if (hash === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const target = document.querySelector(hash) as HTMLElement | null;
    const headerH = headerRef.current?.offsetHeight ?? 0;
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - headerH - 8;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      window.location.hash = hash;
    }
  };

  const navItems = [
    { label: 'Home', href: '#top' },
    { label: 'Services', href: '#services' },
    { label: 'Why Choose Us', href: '#why' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      ref={headerRef}
      style={{ ...styles.header, ...(scrolled ? styles.headerScrolled : {}) }}
    >
      <div style={styles.container}>
        <a href="#top" onClick={(e) => handleNavClick(e, '#top')} style={styles.brand} aria-label="Go to top">
          <img src={logoUrl} alt="" style={styles.logo} />
          <span style={styles.brandText}>
            <strong style={styles.brandTitle}>BrightSpark Electric</strong>
            <span style={styles.subText}>Licensed • Insured • Local</span>
          </span>
        </a>

        <nav
          style={{ ...styles.navDesktop, display: isDesktop ? 'flex' : 'none' }}
          aria-label="Primary"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              style={styles.navLink}
            >
              {item.label}
            </a>
          ))}
          <a href="tel:+15551234567" style={styles.ctaBtn}>
            Call (555) 123-4567
          </a>
        </nav>

        <button
          style={{ ...styles.menuBtn, display: isDesktop ? 'none' : 'flex' }}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span style={{ ...styles.bar, ...(menuOpen ? styles.barTopActive : {}) }} />
          <span style={{ ...styles.bar, ...(menuOpen ? styles.barMidActive : {}) }} />
          <span style={{ ...styles.bar, ...(menuOpen ? styles.barBotActive : {}) }} />
        </button>
      </div>

      {!isDesktop && menuOpen && (
        <div style={styles.mobileMenuOverlay} onClick={() => setMenuOpen(false)}>
          <div style={styles.mobileMenu} onClick={(e) => e.stopPropagation()}>
            <nav style={styles.navMobile} aria-label="Mobile">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  style={styles.mobileLink}
                >
                  {item.label}
                </a>
              ))}
              <a href="tel:+15551234567" style={styles.mobileCta}>
                Call (555) 123-4567
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

const styles: { [k: string]: React.CSSProperties } = {
  header: {
    position: 'sticky',
    top: 0,
    width: '100%',
    zIndex: 1000,
    background: 'rgba(255,255,255,0.6)',
    backdropFilter: 'saturate(180%) blur(10px)',
    transition: 'box-shadow 200ms ease, background 200ms ease',
    borderBottom: '1px solid rgba(0,0,0,0.05)',
  },
  headerScrolled: {
    background: '#ffffff',
    boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '10px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textDecoration: 'none',
    color: '#0b2239',
  },
  logo: {
    width: '40px',
    height: '40px',
    objectFit: 'contain',
    borderRadius: '8px',
    background: '#0d3b66',
  },
  brandText: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: 1.1,
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: 800,
    color: '#0b2239',
  },
  subText: {
    fontWeight: 500,
    color: '#44607a',
    fontSize: 12,
  },
  navDesktop: {
    alignItems: 'center',
    gap: '18px',
  },
  navLink: {
    color: '#173a5e',
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: 600,
    padding: '8px 10px',
    borderRadius: '8px',
  },
  ctaBtn: {
    textDecoration: 'none',
    background: '#ffb703',
    color: '#14213d',
    padding: '10px 14px',
    borderRadius: '10px',
    fontWeight: 700,
    fontSize: 14,
    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
  },
  menuBtn: {
    background: 'transparent',
    border: 'none',
    padding: 8,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    cursor: 'pointer',
  },
  bar: {
    width: 24,
    height: 2,
    background: '#0b2239',
    transition: 'transform 200ms ease, opacity 200ms ease',
  },
  barTopActive: {
    transform: 'translateY(6px) rotate(45deg)',
  },
  barMidActive: {
    opacity: 0,
  },
  barBotActive: {
    transform: 'translateY(-6px) rotate(-45deg)',
  },
  mobileMenuOverlay: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: 'rgba(0,0,0,0.4)',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  mobileMenu: {
    width: '80%',
    maxWidth: 340,
    height: '100%',
    background: '#ffffff',
    boxShadow: '-8px 0 24px rgba(0,0,0,0.15)',
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
  },
  navMobile: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    marginTop: 10,
  },
  mobileLink: {
    textDecoration: 'none',
    color: '#173a5e',
    fontSize: 16,
    fontWeight: 600,
    padding: '10px 8px',
    borderRadius: '8px',
    background: 'rgba(23,58,94,0.05)',
  },
  mobileCta: {
    textDecoration: 'none',
    background: '#ffb703',
    color: '#14213d',
    padding: '12px 14px',
    borderRadius: '10px',
    fontWeight: 700,
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
  },
};

export default NavBar;