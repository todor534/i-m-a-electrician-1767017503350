import React from 'react';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import WhyChoose from './components/WhyChoose';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

const styles: { [k: string]: React.CSSProperties } = {
  app: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    color: '#0f172a',
    backgroundColor: '#ffffff',
  },
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 0 rgba(0,0,0,0.06)',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  section: {
    padding: '56px 16px',
  },
  sectionAlt: {
    padding: '56px 16px',
    backgroundColor: '#f8fafc',
  },
  sectionInner: {
    maxWidth: 1100,
    margin: '0 auto',
  },
  footer: {
    marginTop: 'auto',
  },
};

function App(): JSX.Element {
  return (
    <div style={styles.app}>
      <header style={styles.header} aria-label="Primary">
        <NavBar />
      </header>

      <main id="main" style={styles.main}>
        <section id="home" style={styles.section} aria-label="Hero">
          <div style={styles.sectionInner}>
            <Hero />
          </div>
        </section>

        <section id="why-choose" style={styles.sectionAlt} aria-label="Why Choose">
          <div style={styles.sectionInner}>
            <WhyChoose />
          </div>
        </section>

        <section id="services" style={styles.section} aria-label="Services">
          <div style={styles.sectionInner}>
            <Services />
          </div>
        </section>

        <section id="testimonials" style={styles.sectionAlt} aria-label="Testimonials">
          <div style={styles.sectionInner}>
            <Testimonials />
          </div>
        </section>

        <section id="contact" style={styles.section} aria-label="Contact">
          <div style={styles.sectionInner}>
            <Contact />
          </div>
        </section>
      </main>

      <footer style={styles.footer} aria-label="Footer">
        <Footer />
      </footer>
    </div>
  );
}

export default App;