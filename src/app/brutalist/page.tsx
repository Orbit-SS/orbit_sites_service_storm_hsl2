'use client'

import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!%&'

function useScramble(target: string, startDelay = 400) {
  const [display, setDisplay] = useState(() =>
    target.replace(/[^\n\s]/g, () => CHARS[Math.floor(Math.random() * CHARS.length)])
  )
  useEffect(() => {
    const nonSpace = target.replace(/[\n ]/g, '').length
    let frame = 0
    const total = nonSpace * 2 + 10
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        frame++
        let ci = 0
        setDisplay(
          target
            .split('')
            .map((ch) => {
              if (ch === '\n' || ch === ' ') return ch
              const idx = ci++
              if (frame > (idx / nonSpace) * total * 0.8 + 4) return ch
              return CHARS[Math.floor(Math.random() * CHARS.length)]
            })
            .join('')
        )
        if (frame >= total) clearInterval(iv)
      }, 45)
      return () => clearInterval(iv)
    }, startDelay)
    return () => clearTimeout(t)
  }, [target, startDelay])
  return display
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('b-in'); obs.unobserve(e.target) } }),
      { threshold: 0.15 }
    )
    el.querySelectorAll('.b-reveal').forEach((n) => obs.observe(n))
    return () => obs.disconnect()
  }, [])
  return ref
}

const CSS = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.b-root {
  background: #FFFFFF;
  color: #000000;
  font-family: 'Courier New', Courier, monospace;
  overflow-x: hidden;
  min-height: 100vh;
}

/* NAV */
.b-nav {
  border-bottom: 2px solid #000;
  padding: 14px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 50;
}

.b-nav a {
  color: #000;
  text-decoration: none;
  transition: opacity 0.2s;
}

.b-nav a:hover { opacity: 0.4; }

.b-nav-links { display: flex; gap: 28px; }

@media (max-width: 640px) { .b-nav-links { display: none; } }

/* HERO */
.b-hero {
  position: relative;
  overflow: hidden;
  border-bottom: 2px solid #000;
}

.b-gridlines {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px);
  background-size: 9.09% 100%;
  z-index: 0;
}

.b-hero-layout {
  display: grid;
  grid-template-columns: 48px 1fr;
  position: relative;
  z-index: 1;
}

.b-rail {
  border-right: 2px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 0;
}

.b-rail-text {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-size: 9px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  white-space: nowrap;
}

.b-hero-body {
  padding: 48px 40px 40px;
}

.b-display {
  font-family: 'Bebas Neue', 'Impact', 'Arial Black', sans-serif;
  font-size: clamp(80px, 19vw, 260px);
  line-height: 0.82;
  letter-spacing: -0.01em;
  color: #000;
  margin: 0;
  word-break: break-word;
  white-space: pre-line;
}

.b-hero-meta {
  margin-top: 32px;
  padding-top: 20px;
  border-top: 1px solid #000;
  display: flex;
  flex-wrap: wrap;
  gap: 0;
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.b-hero-meta span {
  padding-right: 24px;
  margin-right: 24px;
  border-right: 1px solid #ccc;
}

.b-hero-meta span:last-child { border-right: none; }

/* SECTIONS */
.b-section {
  display: grid;
  grid-template-columns: 48px 1fr;
  border-bottom: 2px solid #000;
}

.b-section-rail {
  border-right: 2px solid #000;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 0;
}

.b-section-rail-label {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-size: 9px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #fff;
  white-space: nowrap;
}

.b-section-body {
  padding: 48px 40px;
}

/* SERVICES */
.b-services { list-style: none; }

.b-service {
  display: flex;
  align-items: baseline;
  gap: 20px;
  padding: 24px 0;
  border-bottom: 1px solid #e0e0e0;
  transition: background 0.2s;
}

.b-service:first-child { border-top: 1px solid #e0e0e0; }

.b-svc-num {
  font-size: 9px;
  letter-spacing: 0.18em;
  color: #bbb;
  min-width: 22px;
  flex-shrink: 0;
}

.b-svc-name {
  font-family: 'Bebas Neue', 'Impact', sans-serif;
  font-size: clamp(44px, 8vw, 112px);
  line-height: 1;
  flex: 1;
  min-width: 0;
}

.b-svc-desc {
  font-size: 11px;
  line-height: 1.65;
  max-width: 220px;
  color: #666;
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .b-service { flex-wrap: wrap; gap: 8px; }
  .b-svc-desc { max-width: 100%; }
  .b-svc-name { font-size: clamp(44px, 14vw, 80px); }
}

/* PORTFOLIO GRID */
.b-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-left: 1px solid #000;
}

.b-grid-cell {
  aspect-ratio: 1;
  overflow: hidden;
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  position: relative;
  background: #000;
}

.b-grid-cell img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: grayscale(1) contrast(1.15);
  transition: filter 0.4s ease, transform 0.5s ease;
}

.b-grid-cell:hover img {
  filter: grayscale(0) contrast(1);
  transform: scale(1.06);
}

.b-grid-label {
  position: absolute;
  bottom: 8px;
  left: 10px;
  font-size: 9px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.7);
  pointer-events: none;
}

@media (max-width: 640px) {
  .b-grid { grid-template-columns: repeat(2, 1fr); }
}

/* CREDENTIALS */
.b-cred-block {
  border: 1px solid #000;
  padding: 20px 24px;
  margin-bottom: 16px;
  display: inline-flex;
  align-items: center;
  gap: 12px;
}

.b-cred-icon { font-size: 18px; }
.b-cred-text { font-size: 12px; letter-spacing: 0.04em; }

/* CONTACT */
.b-tel {
  font-family: 'Bebas Neue', 'Impact', sans-serif;
  font-size: clamp(52px, 10vw, 148px);
  line-height: 1;
  color: #000;
  text-decoration: none;
  display: block;
  transition: letter-spacing 0.35s ease;
}

.b-tel:hover { letter-spacing: 0.04em; }

.b-email {
  font-size: 13px;
  letter-spacing: 0.06em;
  color: #555;
  text-decoration: none;
  border-bottom: 1px solid #ccc;
  transition: color 0.2s, border-color 0.2s;
}

.b-email:hover { color: #000; border-color: #000; }

/* INVERSION */
.b-section--inv { background: #000; color: #fff; }
.b-section--inv .b-section-rail { background: #fff; border-right-color: #000; }
.b-section--inv .b-section-rail-label { color: #000; }
.b-section--inv .b-service { border-color: #333; }
.b-section--inv .b-service:first-child { border-color: #333; }
.b-section--inv .b-svc-num { color: #555; }
.b-section--inv .b-svc-desc { color: #999; }

/* REVEALS */
.b-reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.b-reveal.b-in {
  opacity: 1;
  transform: translateY(0);
}

/* FOOTER */
.b-footer {
  padding: 18px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #aaa;
  border-top: 1px solid #e0e0e0;
}

@media (max-width: 640px) {
  .b-hero-body { padding: 32px 20px 28px; }
  .b-section-body { padding: 36px 20px; }
  .b-footer { padding: 16px 20px; flex-direction: column; gap: 6px; }
  .b-hero-meta { gap: 8px; }
  .b-hero-meta span { border-right: none; padding-right: 0; margin-right: 0; }
}
`

export default function BrutalistPage() {
  const title = useScramble('HOAG\nLAND\nSERVICES', 350)
  const pageRef = useReveal()

  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap'
    document.head.appendChild(link)
    return () => { try { document.head.removeChild(link) } catch {} }
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="b-root" ref={pageRef}>

        {/* NAV */}
        <nav className="b-nav">
          <Link href="/">← Back</Link>
          <div className="b-nav-links">
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#contact">Contact</a>
          </div>
          <a href="tel:+13865610003">(386) 561-0003</a>
        </nav>

        {/* HERO */}
        <section className="b-hero">
          <div className="b-gridlines" />
          <div className="b-hero-layout">
            <div className="b-rail">
              <span className="b-rail-text">Est. 2017 — DeLand, FL</span>
            </div>
            <div className="b-hero-body">
              <h1 className="b-display" aria-label="Hoag Land Services">{title}</h1>
              <div className="b-hero-meta">
                <span>Central Florida</span>
                <span>Site · Tree · Fence</span>
                <span>Residential &amp; Commercial</span>
                <span>ISA Certified Arborist</span>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="b-section b-reveal" id="services">
          <div className="b-section-rail">
            <span className="b-section-rail-label">Services</span>
          </div>
          <div className="b-section-body">
            <ul className="b-services">
              <li className="b-service">
                <span className="b-svc-num">01</span>
                <span className="b-svc-name">Site Work</span>
                <span className="b-svc-desc">Land clearing, excavation, grading, building pads, ponds, erosion control. From one acre to hundreds.</span>
              </li>
              <li className="b-service">
                <span className="b-svc-num">02</span>
                <span className="b-svc-name">Tree Services</span>
                <span className="b-svc-desc">ISA Certified Arborist on-site. Removal, trimming, palm pruning, tree installation, storm clean-up.</span>
              </li>
              <li className="b-service">
                <span className="b-svc-num">03</span>
                <span className="b-svc-name">Fencing</span>
                <span className="b-svc-desc">Wood, vinyl, aluminum. Perimeter, pasture, privacy, pool enclosure. Residential &amp; commercial grade.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* PORTFOLIO */}
        <section className="b-section b-section--inv b-reveal" id="work">
          <div className="b-section-rail">
            <span className="b-section-rail-label">Work</span>
          </div>
          <div className="b-section-body" style={{ padding: '36px 40px' }}>
            <p style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#555', marginBottom: '20px' }}>
              Selected Projects — DeLand &amp; Surrounding Central Florida
            </p>
            <div className="b-grid">
              <div className="b-grid-cell">
                <img src="/brand/images/fence1.jpeg" alt="Privacy fencing installation" />
                <span className="b-grid-label">Fencing</span>
              </div>
              <div className="b-grid-cell">
                <img src="/brand/images/site1.JPEG" alt="Land clearing" />
                <span className="b-grid-label">Site Work</span>
              </div>
              <div className="b-grid-cell">
                <img src="/brand/images/tree1.jpeg" alt="Tree removal" />
                <span className="b-grid-label">Tree</span>
              </div>
              <div className="b-grid-cell">
                <img src="/brand/images/fence5.jpeg" alt="Board fence" />
                <span className="b-grid-label">Fencing</span>
              </div>
              <div className="b-grid-cell">
                <img src="/brand/images/site4.PNG" alt="Excavation" />
                <span className="b-grid-label">Excavation</span>
              </div>
              <div className="b-grid-cell">
                <img src="/brand/images/tree5.JPEG" alt="Tree trimming" />
                <span className="b-grid-label">Arborist</span>
              </div>
            </div>
          </div>
        </section>

        {/* CREDENTIALS */}
        <section className="b-section b-reveal">
          <div className="b-section-rail">
            <span className="b-section-rail-label">Creds</span>
          </div>
          <div className="b-section-body">
            <div className="b-cred-block">
              <span className="b-cred-icon">■</span>
              <span className="b-cred-text">ISA Certified Arborist</span>
            </div>
            <br />
            <div className="b-cred-block">
              <span className="b-cred-icon">■</span>
              <span className="b-cred-text">ISA Tree Risk Assessment Qualified</span>
            </div>
            <br />
            <div className="b-cred-block">
              <span className="b-cred-icon">■</span>
              <span className="b-cred-text">Established 2017 — Central Florida</span>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="b-section b-reveal" id="contact">
          <div className="b-section-rail">
            <span className="b-section-rail-label">Contact</span>
          </div>
          <div className="b-section-body">
            <p style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '28px', color: '#999' }}>
              Ready to talk about your project?
            </p>
            <a className="b-tel" href="tel:+13865610003">(386) 561-0003</a>
            <p style={{ marginTop: '24px', marginBottom: '10px' }}>
              <a className="b-email" href="mailto:tyler@hlsdeland.com">tyler@hlsdeland.com</a>
            </p>
            <p style={{ fontSize: '10px', color: '#aaa', marginTop: '16px', letterSpacing: '0.12em' }}>
              DeLand, FL — Serving residential &amp; commercial properties
            </p>
          </div>
        </section>

        <footer className="b-footer">
          <span>Hoag Land Services, LLC — Est. 2017</span>
          <span>© 2025 All Rights Reserved</span>
        </footer>
      </div>
    </>
  )
}
