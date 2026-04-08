'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

const CSS = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.lx-root {
  background: #F5F0E8;
  color: #0A1628;
  font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
  overflow-x: hidden;
}

/* NAV */
.lx-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  padding: 28px 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  mix-blend-mode: normal;
}

.lx-nav-logo {
  height: 32px;
  width: auto;
  filter: brightness(0);
  opacity: 0.7;
}

.lx-nav-links {
  display: flex;
  gap: 36px;
  list-style: none;
}

.lx-nav-links a {
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #0A1628;
  text-decoration: none;
  opacity: 0.6;
  transition: opacity 0.25s;
}

.lx-nav-links a:hover { opacity: 1; }

.lx-back {
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #0A1628;
  text-decoration: none;
  opacity: 0.5;
  transition: opacity 0.25s;
}

.lx-back:hover { opacity: 1; }

@media (max-width: 768px) {
  .lx-nav { padding: 20px 24px; }
  .lx-nav-links { display: none; }
}

/* HERO SCENE */
.lx-scene {
  height: 200vh;
  position: relative;
}

.lx-scene-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #F5F0E8;
}

.lx-watermark {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 0;
}

.lx-watermark img {
  width: 70vw;
  max-width: 900px;
  opacity: 0.06;
  filter: grayscale(1);
  object-fit: contain;
}

.lx-hero-text {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 0 40px;
}

.lx-eyebrow {
  font-size: 11px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #C9A84C;
  display: block;
  margin-bottom: 24px;
}

.lx-display {
  font-size: clamp(64px, 11vw, 160px);
  font-weight: 300;
  line-height: 0.88;
  letter-spacing: -0.02em;
  color: #0A1628;
}

.lx-display em {
  font-style: italic;
  color: #C9A84C;
}

.lx-hero-sub {
  font-size: clamp(16px, 2vw, 22px);
  font-weight: 300;
  color: #5a6a7a;
  margin-top: 32px;
  letter-spacing: 0.03em;
  font-style: italic;
}

.lx-hero-cta {
  margin-top: 48px;
  display: flex;
  gap: 24px;
  justify-content: center;
  flex-wrap: wrap;
}

.lx-btn {
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  padding: 14px 36px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.lx-btn--primary {
  background: #0A1628;
  color: #F5F0E8;
  border: 1px solid #0A1628;
}

.lx-btn--primary:hover {
  background: #C9A84C;
  border-color: #C9A84C;
}

.lx-btn--outline {
  background: transparent;
  color: #0A1628;
  border: 1px solid #0A1628;
  opacity: 0.5;
}

.lx-btn--outline:hover { opacity: 1; }

.lx-scroll-hint {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #0A1628;
  opacity: 0.3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

@keyframes scrollDown {
  0%, 100% { transform: translateY(0); opacity: 0.3; }
  50% { transform: translateY(6px); opacity: 0.7; }
}

.lx-scroll-line {
  width: 1px;
  height: 32px;
  background: currentColor;
  animation: scrollDown 1.8s ease-in-out infinite;
}

/* STORY SECTION */
.lx-story {
  background: #F5F0E8;
  padding: 140px 56px;
  position: relative;
}

.lx-story-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  max-width: 1200px;
  margin: 0 auto;
  align-items: center;
}

.lx-story-label {
  font-size: 10px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #C9A84C;
  display: block;
  margin-bottom: 20px;
}

.lx-story-heading {
  font-size: clamp(36px, 5vw, 64px);
  font-weight: 300;
  line-height: 1.1;
  margin-bottom: 28px;
  letter-spacing: -0.01em;
}

.lx-story-body {
  font-size: 18px;
  font-weight: 300;
  line-height: 1.8;
  color: #3a4a5a;
  font-style: italic;
  margin-bottom: 20px;
}

.lx-story-body2 {
  font-size: 15px;
  font-weight: 300;
  line-height: 1.9;
  color: #5a6a7a;
  margin-bottom: 32px;
}

.lx-line-link {
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #0A1628;
  text-decoration: none;
  border-bottom: 1px solid rgba(10,22,40,0.3);
  padding-bottom: 2px;
  transition: border-color 0.3s;
}

.lx-line-link:hover { border-color: #C9A84C; color: #C9A84C; }

.lx-story-image {
  position: relative;
  overflow: hidden;
  aspect-ratio: 3 / 4;
}

.lx-story-image img {
  width: 100%;
  height: 120%;
  object-fit: cover;
  display: block;
  transition: transform 0.1s linear;
}

@media (max-width: 768px) {
  .lx-story { padding: 80px 24px; }
  .lx-story-grid { grid-template-columns: 1fr; gap: 48px; }
  .lx-story-image { aspect-ratio: 16/9; }
  .lx-story-image img { height: 100%; }
}

/* SERVICES — NAVY */
.lx-services {
  background: #0A1628;
  padding: 120px 56px;
}

.lx-services-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  max-width: 1200px;
  margin: 0 auto 72px;
  flex-wrap: wrap;
  gap: 24px;
}

.lx-services-title {
  font-size: clamp(40px, 6vw, 80px);
  font-weight: 300;
  color: #F5F0E8;
  letter-spacing: -0.01em;
}

.lx-services-note {
  font-size: 14px;
  color: rgba(245,240,232,0.4);
  font-style: italic;
  max-width: 280px;
  line-height: 1.6;
}

.lx-services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: rgba(245,240,232,0.08);
  max-width: 1200px;
  margin: 0 auto;
}

.lx-svc-card {
  background: #0A1628;
  padding: 48px 36px;
  border-top: 1px solid rgba(201,168,76,0.2);
  transition: background 0.3s;
}

.lx-svc-card:hover { background: #0f1f38; }

.lx-svc-num {
  font-size: 11px;
  letter-spacing: 0.2em;
  color: #C9A84C;
  margin-bottom: 24px;
  display: block;
}

.lx-svc-title {
  font-size: clamp(28px, 3.5vw, 44px);
  font-weight: 300;
  color: #F5F0E8;
  margin-bottom: 20px;
  letter-spacing: -0.01em;
}

.lx-svc-body {
  font-size: 15px;
  font-weight: 300;
  color: rgba(245,240,232,0.55);
  line-height: 1.8;
  font-style: italic;
}

.lx-svc-items {
  list-style: none;
  margin-top: 20px;
}

.lx-svc-items li {
  font-size: 13px;
  color: rgba(245,240,232,0.4);
  padding: 8px 0;
  border-bottom: 1px solid rgba(245,240,232,0.06);
  letter-spacing: 0.04em;
}

.lx-svc-items li::before {
  content: '— ';
  color: #C9A84C;
  opacity: 0.6;
}

@media (max-width: 900px) {
  .lx-services { padding: 80px 24px; }
  .lx-services-grid { grid-template-columns: 1fr; }
}

/* PORTFOLIO */
.lx-portfolio {
  background: #F5F0E8;
  padding: 120px 56px;
}

.lx-portfolio-header {
  max-width: 1200px;
  margin: 0 auto 64px;
}

.lx-portfolio-label {
  font-size: 10px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #C9A84C;
  display: block;
  margin-bottom: 16px;
}

.lx-portfolio-title {
  font-size: clamp(36px, 5vw, 64px);
  font-weight: 300;
  letter-spacing: -0.01em;
}

.lx-portfolio-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  grid-template-rows: auto auto;
  gap: 16px;
  max-width: 1200px;
  margin: 0 auto;
}

.lx-port-item {
  overflow: hidden;
  position: relative;
  background: #0A1628;
}

.lx-port-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.7s ease, filter 0.5s ease;
  filter: saturate(0.85) brightness(0.92);
}

.lx-port-item:hover img {
  transform: scale(1.04);
  filter: saturate(1) brightness(1);
}

.lx-port-item--tall { aspect-ratio: 3/4; grid-row: span 2; }
.lx-port-item--wide { aspect-ratio: 16/9; }

.lx-port-caption {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: 24px;
  background: linear-gradient(transparent, rgba(10,22,40,0.7));
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.lx-port-item:hover .lx-port-caption { opacity: 1; }

.lx-port-cap-text {
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(245,240,232,0.85);
}

.lx-port-cap-loc {
  font-size: 11px;
  color: #C9A84C;
  letter-spacing: 0.12em;
}

@media (max-width: 768px) {
  .lx-portfolio { padding: 80px 24px; }
  .lx-portfolio-grid { grid-template-columns: 1fr; }
  .lx-port-item--tall { aspect-ratio: 16/10; grid-row: auto; }
}

/* CTA */
.lx-cta {
  background: #0A1628;
  padding: 160px 56px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.lx-cta-watermark {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.lx-cta-watermark img {
  width: 60vw;
  opacity: 0.04;
  filter: brightness(10);
}

.lx-cta-content { position: relative; z-index: 1; }

.lx-cta-label {
  font-size: 11px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #C9A84C;
  display: block;
  margin-bottom: 24px;
}

.lx-cta-title {
  font-size: clamp(48px, 8vw, 112px);
  font-weight: 300;
  color: #F5F0E8;
  line-height: 0.92;
  margin-bottom: 40px;
}

.lx-cta-title em { font-style: italic; color: #C9A84C; }

.lx-contact-details {
  display: flex;
  gap: 48px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 64px;
}

.lx-contact-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}

.lx-contact-label {
  font-size: 10px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(245,240,232,0.3);
}

.lx-contact-value {
  font-size: 18px;
  font-weight: 300;
  color: #F5F0E8;
  text-decoration: none;
  letter-spacing: 0.04em;
  transition: color 0.3s;
}

.lx-contact-value:hover { color: #C9A84C; }

@media (max-width: 768px) {
  .lx-cta { padding: 100px 24px; }
}

/* FOOTER */
.lx-footer {
  background: #0A1628;
  border-top: 1px solid rgba(245,240,232,0.06);
  padding: 36px 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.lx-footer-brand {
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(245,240,232,0.4);
}

.lx-footer-copy {
  font-size: 11px;
  color: rgba(245,240,232,0.25);
  letter-spacing: 0.1em;
}

@media (max-width: 640px) {
  .lx-footer { padding: 28px 24px; }
}

/* REVEAL */
.lx-reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1);
}

.lx-reveal.lx-in { opacity: 1; transform: translateY(0); }
.lx-reveal-d1 { transition-delay: 0.1s; }
.lx-reveal-d2 { transition-delay: 0.22s; }
.lx-reveal-d3 { transition-delay: 0.34s; }
`

export default function LuxePage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load fonts
    const preconn = Object.assign(document.createElement('link'), { rel: 'preconnect', href: 'https://fonts.googleapis.com' })
    const preconn2 = Object.assign(document.createElement('link'), { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' })
    const fontLink = Object.assign(document.createElement('link'), {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap',
    })
    document.head.append(preconn, preconn2, fontLink)

    // Parallax
    const handleScroll = () => {
      const imgs = document.querySelectorAll<HTMLElement>('.lx-story-image img')
      imgs.forEach((img) => {
        const rect = img.closest('.lx-story-image')!.getBoundingClientRect()
        const center = rect.top + rect.height / 2 - window.innerHeight / 2
        img.style.transform = `translateY(${center * 0.15}px)`
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Reveal on scroll
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('lx-in'); obs.unobserve(e.target) } }),
      { threshold: 0.12 }
    )
    pageRef.current?.querySelectorAll('.lx-reveal').forEach((el) => obs.observe(el))

    return () => {
      window.removeEventListener('scroll', handleScroll)
      obs.disconnect()
      try { document.head.removeChild(preconn); document.head.removeChild(preconn2); document.head.removeChild(fontLink) } catch {}
    }
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="lx-root" ref={pageRef}>

        {/* NAV */}
        <nav className="lx-nav">
          <Link href="/" className="lx-back">← Back</Link>
          <img src="/brand/images/HLSlogo-nobackground.png" alt="HLS" className="lx-nav-logo" />
          <ul className="lx-nav-links">
            <li><a href="#story">Story</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#portfolio">Work</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>

        {/* HERO SCENE */}
        <div className="lx-scene">
          <div className="lx-scene-sticky">
            <div className="lx-watermark">
              <img src="/brand/images/HLSlogo-nobackground.png" alt="" aria-hidden="true" />
            </div>
            <div className="lx-hero-text">
              <span className="lx-eyebrow">Central Florida · Est. 2017</span>
              <h1 className="lx-display">
                Hoag<br /><em>Land</em><br />Services
              </h1>
              <p className="lx-hero-sub">Site work, tree services &amp; fencing<br />for residential &amp; commercial properties.</p>
              <div className="lx-hero-cta">
                <a href="#contact" className="lx-btn lx-btn--primary">Begin a Conversation</a>
                <a href="#portfolio" className="lx-btn lx-btn--outline">View Our Work</a>
              </div>
            </div>
            <div className="lx-scroll-hint">
              <div className="lx-scroll-line" />
              <span>Scroll</span>
            </div>
          </div>
        </div>

        {/* STORY */}
        <section className="lx-story" id="story">
          <div className="lx-story-grid">
            <div>
              <span className="lx-story-label lx-reveal">Our Story</span>
              <h2 className="lx-story-heading lx-reveal lx-reveal-d1">
                Local expertise.<br />Honest work.
              </h2>
              <p className="lx-story-body lx-reveal lx-reveal-d2">
                "From a single tractor serving residential clients, we grew into a full-service land company — certified, capable, and committed to Central Florida."
              </p>
              <p className="lx-story-body2 lx-reveal lx-reveal-d2">
                Founded by CEO Tyler Hoag in DeLand, HLS brings together ISA Certified Arborists, experienced site crews, and skilled fence installers under one roof. We serve DeLand, DeLeon Springs, and the surrounding rural and residential communities of Central Florida.
              </p>
              <a href="#contact" className="lx-line-link lx-reveal lx-reveal-d3">
                Walk your property with us →
              </a>
            </div>
            <div className="lx-story-image lx-reveal lx-reveal-d2">
              <img src="/brand/images/logo_enhanced.png" alt="HLS in the field" />
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="lx-services" id="services">
          <div className="lx-services-header">
            <h2 className="lx-services-title lx-reveal">What<br /><em>We Do</em></h2>
            <p className="lx-services-note lx-reveal lx-reveal-d1">
              Three disciplines. One trusted partner for your land.
            </p>
          </div>
          <div className="lx-services-grid">
            {[
              {
                n: '01', title: 'Site Services', body: 'From an acre to hundreds — land cleared, graded, and ready.',
                items: ['Land Clearing & Forestry', 'Excavation & Earthworks', 'Building Pads & Roads', 'Ponds & Drainage', 'Erosion Control'],
              },
              {
                n: '02', title: 'Tree Services', body: 'ISA Certified Arborists on every job.',
                items: ['Tree Removal', 'Trimming & Pruning', 'Palm Pruning', 'Tree Installation', 'Storm Clean-Up'],
              },
              {
                n: '03', title: 'Fencing', body: 'Perimeter to pool enclosure — built to last.',
                items: ['Wood Privacy & Board', 'Vinyl Privacy & Picket', 'Aluminum Estate & Pool', 'Field & Horse Fence', 'Barbed Wire & Pasture'],
              },
            ].map((svc, i) => (
              <div key={svc.n} className={`lx-svc-card lx-reveal lx-reveal-d${i + 1}`}>
                <span className="lx-svc-num">{svc.n}</span>
                <h3 className="lx-svc-title">{svc.title}</h3>
                <p className="lx-svc-body">{svc.body}</p>
                <ul className="lx-svc-items">
                  {svc.items.map((it) => <li key={it}>{it}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* PORTFOLIO */}
        <section className="lx-portfolio" id="portfolio">
          <div className="lx-portfolio-header">
            <span className="lx-portfolio-label lx-reveal">Selected Work</span>
            <h2 className="lx-portfolio-title lx-reveal lx-reveal-d1">Recent Projects</h2>
          </div>
          <div className="lx-portfolio-grid">
            <div className="lx-port-item lx-port-item--tall lx-reveal">
              <img src="/brand/images/tree9.jpeg" alt="Tree services project" />
              <div className="lx-port-caption">
                <span className="lx-port-cap-text">Tree Services</span>
                <span className="lx-port-cap-loc">DeLand, FL</span>
              </div>
            </div>
            <div className="lx-port-item lx-port-item--wide lx-reveal lx-reveal-d1">
              <img src="/brand/images/fence7.jpeg" alt="Fencing project" />
              <div className="lx-port-caption">
                <span className="lx-port-cap-text">Aluminum Estate Fencing</span>
                <span className="lx-port-cap-loc">Central Florida</span>
              </div>
            </div>
            <div className="lx-port-item lx-port-item--wide lx-reveal lx-reveal-d2">
              <img src="/brand/images/site18.JPEG" alt="Site work project" />
              <div className="lx-port-caption">
                <span className="lx-port-cap-text">Land Clearing</span>
                <span className="lx-port-cap-loc">DeLeon Springs, FL</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="lx-cta" id="contact">
          <div className="lx-cta-watermark">
            <img src="/brand/images/HLSlogo-nobackground.png" alt="" aria-hidden="true" />
          </div>
          <div className="lx-cta-content">
            <span className="lx-cta-label lx-reveal">Ready to Begin</span>
            <h2 className="lx-cta-title lx-reveal lx-reveal-d1">
              Tell us about<br />your <em>property.</em>
            </h2>
            <div className="lx-hero-cta lx-reveal lx-reveal-d2">
              <a href="tel:+13865610003" className="lx-btn lx-btn--primary" style={{ background: '#C9A84C', borderColor: '#C9A84C', color: '#0A1628' }}>
                (386) 561-0003
              </a>
            </div>
            <div className="lx-contact-details lx-reveal lx-reveal-d3">
              <div className="lx-contact-item">
                <span className="lx-contact-label">Email</span>
                <a href="mailto:tyler@hlsdeland.com" className="lx-contact-value">tyler@hlsdeland.com</a>
              </div>
              <div className="lx-contact-item">
                <span className="lx-contact-label">Location</span>
                <span className="lx-contact-value">DeLand, FL</span>
              </div>
              <div className="lx-contact-item">
                <span className="lx-contact-label">Service Area</span>
                <span className="lx-contact-value">Central Florida</span>
              </div>
            </div>
          </div>
        </section>

        <footer className="lx-footer">
          <span className="lx-footer-brand">Hoag Land Services, LLC — Est. 2017</span>
          <span className="lx-footer-copy">© 2025 All Rights Reserved</span>
        </footer>
      </div>
    </>
  )
}
