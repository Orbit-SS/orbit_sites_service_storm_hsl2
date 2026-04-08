'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        let start = 0
        const duration = 1600
        const step = target / (duration / 16)
        const iv = setInterval(() => {
          start += step
          if (start >= target) { setCount(target); clearInterval(iv) }
          else setCount(Math.floor(start))
        }, 16)
        obs.disconnect()
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target])

  return <span ref={ref}>{count}{suffix}</span>
}

const CSS = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.m-root {
  background: #0A0A0A;
  color: #E8E8E8;
  font-family: 'DM Sans', 'Inter', 'Helvetica Neue', Arial, sans-serif;
  overflow-x: hidden;
  min-height: 100vh;
}

.m-root a { color: inherit; text-decoration: none; }

/* ACCENT */
:root { --m-accent: #5B8DEF; }

/* NAV */
.m-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  padding: 24px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.m-nav-back {
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(232,232,232,0.4);
  transition: color 0.25s;
}

.m-nav-back:hover { color: #E8E8E8; }

.m-nav-logo {
  height: 24px;
  width: auto;
  filter: brightness(0) invert(1);
  opacity: 0.3;
}

.m-nav-phone {
  font-size: 12px;
  letter-spacing: 0.1em;
  color: rgba(232,232,232,0.35);
  transition: color 0.25s;
}

.m-nav-phone:hover { color: #5B8DEF; }

@media (max-width: 640px) {
  .m-nav { padding: 20px 24px; }
  .m-nav-phone { display: none; }
}

/* HERO — content anchored to bottom-left */
.m-hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 48px 64px;
  position: relative;
}

.m-hero-bg {
  position: absolute;
  inset: 0;
  background-image: url('/brand/images/logo_enhanced.png');
  background-size: cover;
  background-position: center;
  opacity: 0.03;
  pointer-events: none;
}

.m-hero-content {
  position: relative;
  z-index: 1;
  max-width: 700px;
}

.m-eyebrow {
  font-size: 11px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #5B8DEF;
  display: block;
  margin-bottom: 20px;
  opacity: 0;
  animation: fadeUp 0.8s ease 0.2s forwards;
}

.m-hero-title {
  font-size: clamp(48px, 7vw, 108px);
  font-weight: 200;
  line-height: 1.0;
  letter-spacing: -0.04em;
  color: #E8E8E8;
  margin-bottom: 24px;
  opacity: 0;
  animation: fadeUp 0.9s ease 0.35s forwards;
}

.m-hero-sub {
  font-size: clamp(15px, 1.8vw, 20px);
  font-weight: 300;
  color: rgba(232,232,232,0.45);
  line-height: 1.65;
  max-width: 440px;
  margin-bottom: 40px;
  opacity: 0;
  animation: fadeUp 0.9s ease 0.5s forwards;
}

.m-hero-cta {
  display: flex;
  gap: 24px;
  align-items: center;
  flex-wrap: wrap;
  opacity: 0;
  animation: fadeUp 0.9s ease 0.65s forwards;
}

.m-btn {
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  padding: 14px 32px;
  border-radius: 2px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.25s ease;
}

.m-btn--primary {
  background: #5B8DEF;
  color: #0A0A0A;
  border: 1px solid #5B8DEF;
}

.m-btn--primary:hover {
  background: transparent;
  color: #5B8DEF;
}

.m-btn--ghost {
  background: transparent;
  color: rgba(232,232,232,0.5);
  border: 1px solid rgba(232,232,232,0.12);
}

.m-btn--ghost:hover {
  border-color: rgba(232,232,232,0.4);
  color: #E8E8E8;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (max-width: 640px) {
  .m-hero { padding: 0 24px 48px; }
}

/* DIVIDER */
.m-rule {
  height: 1px;
  background: rgba(232,232,232,0.06);
  margin: 0;
}

/* SERVICES */
.m-services {
  padding: 120px 48px;
  max-width: 1100px;
  margin: 0 auto;
}

.m-section-label {
  font-size: 10px;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: #5B8DEF;
  display: block;
  margin-bottom: 60px;
}

.m-svc-row {
  display: grid;
  grid-template-columns: 64px 1fr 1fr;
  gap: 40px;
  padding: 40px 0;
  border-top: 1px solid rgba(232,232,232,0.07);
  align-items: start;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.m-svc-row.m-in { opacity: 1; transform: translateY(0); }
.m-svc-row:nth-child(2) { transition-delay: 0.1s; }
.m-svc-row:nth-child(3) { transition-delay: 0.2s; }
.m-svc-row:nth-child(4) { transition-delay: 0.3s; }

.m-svc-num {
  font-size: 13px;
  font-weight: 300;
  color: rgba(232,232,232,0.18);
  letter-spacing: 0.04em;
  padding-top: 4px;
}

.m-svc-name {
  font-size: clamp(24px, 3vw, 40px);
  font-weight: 300;
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: #E8E8E8;
}

.m-svc-body {
  font-size: 14px;
  font-weight: 300;
  color: rgba(232,232,232,0.4);
  line-height: 1.75;
}

@media (max-width: 768px) {
  .m-services { padding: 80px 24px; }
  .m-svc-row { grid-template-columns: 1fr; gap: 12px; }
  .m-svc-num { display: none; }
}

/* STATS */
.m-stats {
  padding: 80px 48px 120px;
  max-width: 1100px;
  margin: 0 auto;
}

.m-stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: rgba(232,232,232,0.06);
  border: 1px solid rgba(232,232,232,0.06);
}

.m-stat {
  background: #0A0A0A;
  padding: 40px 32px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.m-stat.m-in { opacity: 1; transform: translateY(0); }
.m-stat:nth-child(2) { transition-delay: 0.1s; }
.m-stat:nth-child(3) { transition-delay: 0.2s; }
.m-stat:nth-child(4) { transition-delay: 0.3s; }

.m-stat-number {
  font-size: clamp(36px, 5vw, 64px);
  font-weight: 200;
  letter-spacing: -0.04em;
  color: #E8E8E8;
  display: block;
  margin-bottom: 8px;
  line-height: 1;
}

.m-stat-accent { color: #5B8DEF; }

.m-stat-label {
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(232,232,232,0.25);
}

@media (max-width: 768px) {
  .m-stats { padding: 60px 24px 80px; }
  .m-stats-grid { grid-template-columns: repeat(2, 1fr); }
}

/* PORTFOLIO */
.m-portfolio {
  padding: 0 48px 120px;
  max-width: 1100px;
  margin: 0 auto;
}

.m-portfolio-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
}

.m-portfolio-title {
  font-size: clamp(32px, 4vw, 56px);
  font-weight: 200;
  letter-spacing: -0.03em;
  color: #E8E8E8;
}

.m-portfolio-sub {
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(232,232,232,0.2);
}

.m-port-grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr;
  gap: 2px;
}

.m-port-item {
  overflow: hidden;
  background: #111;
  position: relative;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.m-port-item.m-in { opacity: 1; transform: translateY(0); }
.m-port-item:nth-child(2) { transition-delay: 0.1s; }
.m-port-item:nth-child(3) { transition-delay: 0.2s; }

.m-port-item--main { aspect-ratio: 4/5; }
.m-port-item--sq { aspect-ratio: 1; }

.m-port-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: brightness(0.75) saturate(0.6);
  transition: filter 0.5s ease, transform 0.6s ease;
}

.m-port-item:hover img {
  filter: brightness(0.9) saturate(0.85);
  transform: scale(1.03);
}

/* Draw-underline link */
.m-underline-link {
  position: relative;
  display: inline-block;
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(232,232,232,0.45);
  text-decoration: none;
  padding-bottom: 4px;
  transition: color 0.25s;
}

.m-underline-link::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0;
  height: 1px;
  width: 0;
  background: #5B8DEF;
  transition: width 0.5s cubic-bezier(0.4,0,0.2,1);
}

.m-underline-link:hover { color: #E8E8E8; }
.m-underline-link:hover::after,
.m-underline-link.m-link-in::after { width: 100%; }

@media (max-width: 768px) {
  .m-portfolio { padding: 0 24px 80px; }
  .m-port-grid { grid-template-columns: 1fr; }
  .m-port-item--main { aspect-ratio: 16/10; }
  .m-port-item--sq { aspect-ratio: 16/10; }
  .m-portfolio-header { flex-direction: column; gap: 12px; align-items: flex-start; }
}

/* CONTACT */
.m-contact {
  border-top: 1px solid rgba(232,232,232,0.06);
  padding: 120px 48px;
  max-width: 1100px;
  margin: 0 auto;
}

.m-contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: end;
}

.m-contact-title {
  font-size: clamp(40px, 6vw, 88px);
  font-weight: 200;
  letter-spacing: -0.04em;
  line-height: 1.0;
  color: #E8E8E8;
  margin-bottom: 32px;
}

.m-contact-title span { color: #5B8DEF; }

.m-contact-items {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.m-contact-item {}

.m-contact-label {
  font-size: 10px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(232,232,232,0.2);
  display: block;
  margin-bottom: 8px;
}

.m-contact-value {
  font-size: clamp(18px, 2.2vw, 28px);
  font-weight: 300;
  letter-spacing: -0.01em;
  color: #E8E8E8;
  transition: color 0.25s;
}

.m-contact-value:hover { color: #5B8DEF; }

@media (max-width: 768px) {
  .m-contact { padding: 80px 24px; }
  .m-contact-grid { grid-template-columns: 1fr; gap: 48px; }
}

/* FOOTER */
.m-footer {
  border-top: 1px solid rgba(232,232,232,0.05);
  padding: 28px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
  flex-wrap: wrap;
  gap: 12px;
}

.m-footer-text {
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(232,232,232,0.18);
}

@media (max-width: 640px) {
  .m-footer { padding: 24px; }
}
`

export default function MinimalPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fontLink = Object.assign(document.createElement('link'), {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@200;300;400;500&display=swap',
    })
    document.head.appendChild(fontLink)

    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('m-in', 'm-link-in'); obs.unobserve(e.target) } }),
      { threshold: 0.14 }
    )
    pageRef.current?.querySelectorAll('.m-svc-row, .m-stat, .m-port-item, .m-underline-link').forEach((el) => obs.observe(el))

    return () => {
      obs.disconnect()
      try { document.head.removeChild(fontLink) } catch {}
    }
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="m-root" ref={pageRef}>

        {/* NAV */}
        <nav className="m-nav">
          <Link href="/" className="m-nav-back">← Back</Link>
          <img src="/brand/images/HLSlogo-nobackground.png" alt="HLS" className="m-nav-logo" />
          <a href="tel:+13865610003" className="m-nav-phone">(386) 561-0003</a>
        </nav>

        {/* HERO */}
        <section className="m-hero" id="hero">
          <div className="m-hero-bg" aria-hidden="true" />
          <div className="m-hero-content">
            <span className="m-eyebrow">Central Florida · Est. 2017</span>
            <h1 className="m-hero-title">Hoag<br />Land<br />Services.</h1>
            <p className="m-hero-sub">
              Site work, tree services, and fencing for residential &amp; commercial properties. DeLand, DeLeon Springs, and surrounding areas.
            </p>
            <div className="m-hero-cta">
              <a href="#contact" className="m-btn m-btn--primary">Get a Quote</a>
              <a href="#portfolio" className="m-btn m-btn--ghost">View Our Work</a>
            </div>
          </div>
        </section>

        <div className="m-rule" />

        {/* SERVICES */}
        <section className="m-services" id="services">
          <span className="m-section-label">What We Do</span>
          <div className="m-svc-row">
            <span className="m-svc-num">01</span>
            <h3 className="m-svc-name">Site Services</h3>
            <p className="m-svc-body">Land clearing from one acre to hundreds. Excavation, grading, building pads, roads, ponds, right-of-ways, and erosion control. Invasive species mitigation.</p>
          </div>
          <div className="m-svc-row">
            <span className="m-svc-num">02</span>
            <h3 className="m-svc-name">Tree Services</h3>
            <p className="m-svc-body">ISA Certified Arborist and Tree Risk Assessment Qualified. Tree removal, trimming of weak and dead limbs, palm pruning, and new tree installation.</p>
          </div>
          <div className="m-svc-row">
            <span className="m-svc-num">03</span>
            <h3 className="m-svc-name">Fencing</h3>
            <p className="m-svc-body">Wood privacy, board, barbed wire, field and horse fence. Vinyl privacy, picket, and ranch. Aluminum for estates and pool enclosures.</p>
          </div>
        </section>

        <div className="m-rule" />

        {/* STATS */}
        <section className="m-stats">
          <div className="m-stats-grid">
            <div className="m-stat">
              <span className="m-stat-number">
                <CountUp target={2017} /><span className="m-stat-accent">.</span>
              </span>
              <span className="m-stat-label">Year Founded</span>
            </div>
            <div className="m-stat">
              <span className="m-stat-number">
                <CountUp target={3} /><span className="m-stat-accent">+</span>
              </span>
              <span className="m-stat-label">Services Offered</span>
            </div>
            <div className="m-stat">
              <span className="m-stat-number">
                <span className="m-stat-accent">ISA</span>
              </span>
              <span className="m-stat-label">Certified Arborist</span>
            </div>
            <div className="m-stat">
              <span className="m-stat-number">
                <CountUp target={100} suffix="+" />
              </span>
              <span className="m-stat-label">Acres Cleared</span>
            </div>
          </div>
        </section>

        {/* PORTFOLIO */}
        <section className="m-portfolio" id="portfolio">
          <div className="m-portfolio-header">
            <h2 className="m-portfolio-title">Selected Work</h2>
            <span className="m-portfolio-sub">DeLand &amp; Central FL</span>
          </div>
          <div className="m-port-grid">
            <div className="m-port-item m-port-item--main">
              <img src="/brand/images/tree9.jpeg" alt="Tree services" />
            </div>
            <div className="m-port-item m-port-item--sq">
              <img src="/brand/images/fence9.jpeg" alt="Privacy fencing" />
            </div>
            <div className="m-port-item m-port-item--sq">
              <img src="/brand/images/site4.PNG" alt="Site work" />
            </div>
          </div>
          <div style={{ marginTop: '32px', display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
            <a href="#" className="m-underline-link">All Fencing Projects →</a>
            <a href="#" className="m-underline-link">Site Work Gallery →</a>
            <a href="#" className="m-underline-link">Tree Services →</a>
          </div>
        </section>

        {/* CONTACT */}
        <section className="m-contact" id="contact">
          <div className="m-contact-grid">
            <div>
              <h2 className="m-contact-title">
                Start a<br /><span>conversation.</span>
              </h2>
              <p style={{ fontSize: '14px', fontWeight: 300, color: 'rgba(232,232,232,0.35)', lineHeight: '1.7', maxWidth: '320px' }}>
                Tell us about your property and what you're hoping to accomplish.
              </p>
            </div>
            <div className="m-contact-items">
              <div className="m-contact-item">
                <span className="m-contact-label">Phone</span>
                <a href="tel:+13865610003" className="m-contact-value">(386) 561-0003</a>
              </div>
              <div className="m-contact-item">
                <span className="m-contact-label">Email</span>
                <a href="mailto:tyler@hlsdeland.com" className="m-contact-value" style={{ fontSize: 'clamp(14px, 1.6vw, 20px)' }}>tyler@hlsdeland.com</a>
              </div>
              <div className="m-contact-item">
                <span className="m-contact-label">Location</span>
                <span className="m-contact-value" style={{ fontSize: 'clamp(14px, 1.6vw, 20px)' }}>DeLand, FL · Central Florida</span>
              </div>
            </div>
          </div>
        </section>

        <footer className="m-footer">
          <span className="m-footer-text">Hoag Land Services, LLC — Est. 2017</span>
          <span className="m-footer-text">© 2025 All Rights Reserved</span>
        </footer>
      </div>
    </>
  )
}
