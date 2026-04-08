'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

function BootText({ lines }: { lines: string[] }) {
  const [shown, setShown] = useState<string[]>([])
  useEffect(() => {
    let i = 0
    const iv = setInterval(() => {
      setShown((prev) => [...prev, lines[i]])
      i++
      if (i >= lines.length) clearInterval(iv)
    }, 160)
    return () => clearInterval(iv)
  }, [])
  return (
    <div style={{ marginBottom: '32px' }}>
      {shown.map((line, i) => (
        <div key={i} style={{ color: line.startsWith('>') ? '#00FF41' : 'rgba(0,255,65,0.55)', marginBottom: '2px' }}>{line}</div>
      ))}
    </div>
  )
}

const CSS = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.r-root {
  background: #0D0D0D;
  color: #00FF41;
  font-family: 'Courier New', Courier, monospace;
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
}

/* CRT SCANLINES */
.r-root::after {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9998;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.10) 0px,
    rgba(0, 0, 0, 0.10) 1px,
    transparent 1px,
    transparent 4px
  );
}

/* CRT VIGNETTE */
.r-root::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9997;
  background: radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.55) 100%);
}

/* VT323 is monospace; Courier New fallback works */
.r-vt {
  font-family: 'VT323', 'Courier New', monospace;
}

/* NAV */
.r-nav {
  border-bottom: 1px solid rgba(0,255,65,0.25);
  padding: 14px 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: rgba(0,20,0,0.8);
  position: sticky;
  top: 0;
  z-index: 90;
}

.r-nav a {
  color: #00FF41;
  text-decoration: none;
  opacity: 0.7;
  transition: opacity 0.15s;
}

.r-nav a:hover { opacity: 1; }

.r-nav-links { display: flex; gap: 24px; }

@media (max-width: 640px) { .r-nav-links { display: none; } }

/* TERMINAL BLOCK */
.r-terminal {
  border: 1px solid rgba(0,255,65,0.3);
  border-radius: 0;
  padding: 24px 28px;
  margin: 0;
  background: rgba(0,20,0,0.4);
  position: relative;
}

.r-terminal::before {
  content: attr(data-title);
  position: absolute;
  top: -1px; left: 20px;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  background: #0D0D0D;
  padding: 0 8px;
  color: rgba(0,255,65,0.5);
}

/* HERO */
.r-hero {
  padding: 48px 28px 40px;
  border-bottom: 1px solid rgba(0,255,65,0.15);
}

.r-hero-display {
  font-family: 'VT323', 'Courier New', monospace;
  font-size: clamp(56px, 14vw, 180px);
  line-height: 0.9;
  letter-spacing: 0.02em;
  color: #00FF41;
  margin: 24px 0 16px;
  text-shadow: 0 0 20px rgba(0,255,65,0.4), 0 0 40px rgba(0,255,65,0.1);
}

.r-hero-sub {
  font-size: 14px;
  color: rgba(0,255,65,0.6);
  line-height: 1.7;
  max-width: 560px;
  margin: 16px 0 32px;
}

.r-prompt {
  font-size: 13px;
  color: rgba(0,255,65,0.55);
}

.r-prompt::before { content: '> '; color: #00FF41; }

.r-blink {
  display: inline-block;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* GLITCH on hover */
@keyframes glitch {
  0%   { transform: translate(0,0); text-shadow: 2px 0 #ff00ff, -2px 0 #00ffff; }
  20%  { transform: translate(-3px, 1px); text-shadow: -2px 0 #ff00ff, 3px 0 #00ffff; }
  40%  { transform: translate(2px, -1px); text-shadow: 3px 0 #ff00ff, -1px 0 #00ffff; }
  60%  { transform: translate(-1px, 2px); text-shadow: -3px 0 #ff00ff, 2px 0 #00ffff; }
  80%  { transform: translate(1px, 0); text-shadow: 1px 0 #ff00ff, -2px 0 #00ffff; }
  100% { transform: translate(0,0); text-shadow: 2px 0 #ff00ff, -2px 0 #00ffff; }
}

.r-glitch:hover {
  animation: glitch 0.4s linear;
}

/* BUTTON */
.r-btn {
  display: inline-block;
  border: 1px solid #00FF41;
  padding: 10px 24px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #00FF41;
  text-decoration: none;
  background: transparent;
  transition: background 0.15s, color 0.15s;
}

.r-btn:hover {
  background: #00FF41;
  color: #0D0D0D;
}

/* SERVICES */
.r-services {
  padding: 48px 28px;
  border-bottom: 1px solid rgba(0,255,65,0.15);
}

.r-section-head {
  font-family: 'VT323', 'Courier New', monospace;
  font-size: clamp(28px, 5vw, 48px);
  letter-spacing: 0.06em;
  color: #00FF41;
  margin-bottom: 28px;
  text-shadow: 0 0 12px rgba(0,255,65,0.3);
}

.r-svc-list { list-style: none; }

.r-svc-item {
  border: 1px solid rgba(0,255,65,0.18);
  margin-bottom: 12px;
  overflow: hidden;
  transition: border-color 0.2s;
}

.r-svc-item:hover { border-color: rgba(0,255,65,0.6); }

.r-svc-header {
  display: flex;
  align-items: baseline;
  gap: 16px;
  padding: 16px 20px;
  background: rgba(0,20,0,0.3);
  cursor: default;
}

.r-svc-num {
  font-size: 11px;
  color: rgba(0,255,65,0.4);
  letter-spacing: 0.12em;
  min-width: 28px;
}

.r-svc-name {
  font-family: 'VT323', 'Courier New', monospace;
  font-size: clamp(22px, 3vw, 34px);
  letter-spacing: 0.06em;
  flex: 1;
}

.r-svc-tag {
  font-size: 10px;
  letter-spacing: 0.1em;
  color: rgba(0,255,65,0.35);
  border: 1px solid rgba(0,255,65,0.2);
  padding: 3px 8px;
  text-transform: uppercase;
}

.r-svc-body {
  padding: 0 20px 16px;
  font-size: 12px;
  color: rgba(0,255,65,0.55);
  line-height: 1.75;
}

.r-svc-details {
  padding: 12px 20px 12px;
  border-top: 1px solid rgba(0,255,65,0.1);
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.r-detail-chip {
  font-size: 11px;
  letter-spacing: 0.08em;
  color: rgba(0,255,65,0.4);
  background: rgba(0,255,65,0.04);
  border: 1px solid rgba(0,255,65,0.12);
  padding: 3px 10px;
}

/* PORTFOLIO */
.r-portfolio {
  padding: 48px 28px;
  border-bottom: 1px solid rgba(0,255,65,0.15);
}

.r-port-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 24px;
}

.r-port-item {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(0,255,65,0.2);
  aspect-ratio: 1;
  background: #000;
  cursor: crosshair;
}

.r-port-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: grayscale(1) contrast(1.5) brightness(0.7) sepia(0.2) hue-rotate(80deg);
  transition: filter 0.3s ease;
  mix-blend-mode: screen;
}

.r-port-item:hover img {
  filter: grayscale(0) contrast(1.8) brightness(0.5) sepia(0.3) hue-rotate(80deg);
  animation: glitch 0.35s linear;
}

.r-port-item::after {
  content: attr(data-label);
  position: absolute;
  bottom: 6px; left: 8px;
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(0,255,65,0.7);
  pointer-events: none;
}

@media (max-width: 640px) {
  .r-port-grid { grid-template-columns: repeat(2, 1fr); }
}

/* CONTACT */
.r-contact {
  padding: 48px 28px;
  border-bottom: 1px solid rgba(0,255,65,0.15);
}

.r-contact-box {
  max-width: 600px;
}

.r-contact-line {
  font-size: 13px;
  color: rgba(0,255,65,0.55);
  margin-bottom: 6px;
  line-height: 1.6;
}

.r-contact-line a {
  color: #00FF41;
  text-decoration: none;
  border-bottom: 1px solid rgba(0,255,65,0.3);
  transition: border-color 0.2s;
}

.r-contact-line a:hover { border-color: #00FF41; }

.r-contact-large {
  font-family: 'VT323', 'Courier New', monospace;
  font-size: clamp(36px, 7vw, 80px);
  color: #00FF41;
  text-decoration: none;
  display: block;
  margin: 16px 0;
  text-shadow: 0 0 16px rgba(0,255,65,0.3);
  transition: text-shadow 0.2s;
  letter-spacing: 0.04em;
}

.r-contact-large:hover {
  text-shadow: 0 0 30px rgba(0,255,65,0.7);
  animation: glitch 0.4s linear;
}

/* STATUS BAR */
.r-statusbar {
  background: rgba(0,255,65,0.06);
  border-top: 1px solid rgba(0,255,65,0.2);
  padding: 8px 28px;
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  letter-spacing: 0.1em;
  color: rgba(0,255,65,0.4);
  flex-wrap: wrap;
  gap: 8px;
}

/* FOOTER */
.r-footer {
  padding: 28px;
  border-top: 1px solid rgba(0,255,65,0.1);
  text-align: center;
}

.r-footer-ascii {
  font-size: 11px;
  color: rgba(0,255,65,0.2);
  line-height: 1.4;
  margin-bottom: 12px;
  letter-spacing: 0.04em;
}

.r-footer-copy {
  font-size: 11px;
  letter-spacing: 0.12em;
  color: rgba(0,255,65,0.35);
  text-transform: uppercase;
}

/* REVEAL */
.r-reveal {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.r-reveal.r-in { opacity: 1; transform: translateY(0); }
`

const BOOT_LINES = [
  'HLS TERMINAL v2.017',
  '> INITIALIZING SERVICES...',
  '> LOADING SITE WORK MODULE......... OK',
  '> LOADING TREE SERVICES MODULE..... OK',
  '> LOADING FENCING MODULE........... OK',
  '> ISA CERTIFICATION VERIFIED........ ✓',
  '> CENTRAL FLORIDA COVERAGE......... ACTIVE',
  '> READY.',
]

export default function RetroPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fontLink = Object.assign(document.createElement('link'), {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=VT323&display=swap',
    })
    document.head.appendChild(fontLink)

    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('r-in'); obs.unobserve(e.target) } }),
      { threshold: 0.1 }
    )
    pageRef.current?.querySelectorAll('.r-reveal').forEach((el) => obs.observe(el))

    return () => {
      obs.disconnect()
      try { document.head.removeChild(fontLink) } catch {}
    }
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="r-root" ref={pageRef}>

        {/* NAV */}
        <nav className="r-nav r-vt">
          <Link href="/">← BACK</Link>
          <span style={{ color: 'rgba(0,255,65,0.4)', fontSize: '12px' }}>HLS.EXE — v2.017</span>
          <div className="r-nav-links">
            <a href="#services">SERVICES</a>
            <a href="#work">WORK</a>
            <a href="#contact">CONTACT</a>
          </div>
        </nav>

        {/* HERO */}
        <section className="r-hero">
          <BootText lines={BOOT_LINES} />

          <h1 className="r-hero-display r-vt r-glitch">HOAG<br />LAND<br />SVC.</h1>

          <p className="r-hero-sub">
            Site work, tree services, and fencing for residential &amp; commercial properties.<br />
            Serving DeLand, DeLeon Springs, and surrounding Central Florida areas.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href="#contact" className="r-btn r-vt r-glitch">CONNECT</a>
            <a href="#services" className="r-btn r-vt r-glitch">SERVICES →</a>
          </div>
        </section>

        {/* STATUS BAR */}
        <div className="r-statusbar">
          <span>STATUS: ACTIVE</span>
          <span>LOC: DELAND, FL 32720</span>
          <span>ISA CERT: ACTIVE</span>
          <span>COVERAGE: CENTRAL FLORIDA</span>
          <span>SYS: <span className="r-blink">█</span></span>
        </div>

        {/* SERVICES */}
        <section className="r-services r-reveal" id="services">
          <h2 className="r-section-head r-vt r-glitch">[ SERVICES.DAT ]</h2>
          <ul className="r-svc-list">
            <li className="r-svc-item">
              <div className="r-svc-header">
                <span className="r-svc-num">01</span>
                <span className="r-svc-name r-vt">SITE_SERVICES</span>
                <span className="r-svc-tag">ACTIVE</span>
              </div>
              <p className="r-svc-body">Land clearing, excavation, grading, building pads, roads, ponds, right of ways. From one acre to hundreds. Erosion control via silt fences, swales and culverts.</p>
              <div className="r-svc-details">
                {['LAND_CLEARING', 'EXCAVATION', 'GRADING', 'PONDS', 'EROSION_CTL', 'INVASIVE_SPEC'].map(t => <span key={t} className="r-detail-chip">{t}</span>)}
              </div>
            </li>
            <li className="r-svc-item">
              <div className="r-svc-header">
                <span className="r-svc-num">02</span>
                <span className="r-svc-name r-vt">TREE_SERVICES</span>
                <span className="r-svc-tag">ISA CERT</span>
              </div>
              <p className="r-svc-body">ISA Certified Arborist and Tree Risk Assessment Qualified. Tree removal, trimming of weak and dead limbs, palm pruning, and tree installation by certified specialists.</p>
              <div className="r-svc-details">
                {['REMOVAL', 'TRIMMING', 'PALM_PRUNE', 'INSTALL', 'STORM_CLEANUP', 'RISK_ASSESS'].map(t => <span key={t} className="r-detail-chip">{t}</span>)}
              </div>
            </li>
            <li className="r-svc-item">
              <div className="r-svc-header">
                <span className="r-svc-num">03</span>
                <span className="r-svc-name r-vt">FENCE_SERVICES</span>
                <span className="r-svc-tag">ACTIVE</span>
              </div>
              <p className="r-svc-body">Wood privacy, board, barbed wire, field and horse fence. Vinyl privacy, picket, ranch styles. Aluminum for estates and pool enclosures. Residential and commercial grade.</p>
              <div className="r-svc-details">
                {['WOOD_PRIV', 'VINYL', 'ALUMINUM', 'FIELD_FENCE', 'HORSE_FENCE', 'POOL_ENCL'].map(t => <span key={t} className="r-detail-chip">{t}</span>)}
              </div>
            </li>
          </ul>
        </section>

        {/* TERMINAL */}
        <div style={{ padding: '0 28px 40px' }} className="r-reveal">
          <div className="r-terminal" data-title="CREDENTIALS.SYS">
            <p className="r-prompt">ARBORIST_CERT = &quot;ISA International Society of Arboriculture&quot;</p>
            <p className="r-prompt">RISK_QUAL = &quot;ISA Tree Risk Assessment Qualified&quot;</p>
            <p className="r-prompt">ESTABLISHED = 2017</p>
            <p className="r-prompt">SERVICE_AREA = &quot;DeLand, DeLeon Springs, Central Florida&quot;</p>
            <p className="r-prompt">FOUNDER = &quot;Tyler Hoag, CEO&quot;</p>
          </div>
        </div>

        {/* PORTFOLIO */}
        <section className="r-portfolio r-reveal" id="work">
          <h2 className="r-section-head r-vt r-glitch">[ PROJECTS.DIR ]</h2>
          <div className="r-port-grid">
            {[
              { src: '/brand/images/fence1.jpeg', label: 'FENCE_01' },
              { src: '/brand/images/tree2.jpeg', label: 'TREE_02' },
              { src: '/brand/images/site1.JPEG', label: 'SITE_01' },
              { src: '/brand/images/fence6.jpeg', label: 'FENCE_06' },
              { src: '/brand/images/tree10.jpeg', label: 'TREE_10' },
              { src: '/brand/images/fence3.jpeg', label: 'FENCE_03' },
            ].map((item) => (
              <div key={item.src} className="r-port-item" data-label={item.label}>
                <img src={item.src} alt={item.label} />
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section className="r-contact r-reveal" id="contact">
          <h2 className="r-section-head r-vt r-glitch">[ CONTACT.EXE ]</h2>
          <div className="r-contact-box">
            <p className="r-contact-line">&gt; Ready to walk your property?</p>
            <p className="r-contact-line">&gt; Call or email to connect with the HLS team.</p>
            <a href="tel:+13865610003" className="r-contact-large r-vt r-glitch">(386) 561-0003</a>
            <p className="r-contact-line">&gt; EMAIL: <a href="mailto:tyler@hlsdeland.com">tyler@hlsdeland.com</a></p>
            <p className="r-contact-line">&gt; LOCATION: DeLand, FL — Central Florida</p>
            <p className="r-contact-line">&gt; Facebook: /hoaglandservices — Instagram: @hls_deland</p>
            <p className="r-prompt" style={{ marginTop: '28px' }}>
              AWAITING INPUT<span className="r-blink">_</span>
            </p>
          </div>
        </section>

        <footer className="r-footer">
          <pre className="r-footer-ascii" aria-hidden="true">{
`██╗  ██╗██╗     ███████╗
██║  ██║██║     ██╔════╝
███████║██║     ███████╗
██╔══██║██║     ╚════██║
██║  ██║███████╗███████║
╚═╝  ╚═╝╚══════╝╚══════╝`}</pre>
          <p className="r-footer-copy">HOAG LAND SERVICES, LLC — EST. 2017 — © 2025</p>
        </footer>
      </div>
    </>
  )
}
