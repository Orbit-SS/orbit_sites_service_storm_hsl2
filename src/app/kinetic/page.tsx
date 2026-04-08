'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const CSS = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.k-root {
  background: #F0EDE6;
  color: #111;
  overflow-x: hidden;
  cursor: none;
}

/* CUSTOM CURSOR */
.k-cursor {
  position: fixed;
  width: 14px;
  height: 14px;
  background: #FF2D2D;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: width 0.2s, height 0.2s, background 0.2s;
  mix-blend-mode: multiply;
}

.k-trail {
  position: fixed;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%, -50%);
  mix-blend-mode: multiply;
}

/* MARQUEE */
.k-marquee-wrap {
  background: #111;
  overflow: hidden;
  white-space: nowrap;
  padding: 14px 0;
  border-bottom: 3px solid #FF2D2D;
}

.k-marquee-track {
  display: inline-flex;
  animation: marquee 22s linear infinite;
}

.k-marquee-text {
  font-family: 'Impact', 'Arial Black', sans-serif;
  font-size: 13px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #F0EDE6;
  padding: 0 28px;
}

.k-marquee-dot {
  color: #FF2D2D;
  font-size: 16px;
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* TOP NAV */
.k-nav {
  padding: 20px 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #F0EDE6;
  border-bottom: 3px solid #111;
  position: sticky;
  top: 0;
  z-index: 80;
}

.k-nav-back {
  font-family: 'Impact', 'Arial Black', sans-serif;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  color: #111;
  transition: color 0.15s;
}

.k-nav-back:hover { color: #FF2D2D; }

.k-nav-logo {
  font-family: 'Impact', 'Arial Black', sans-serif;
  font-size: 16px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #111;
}

.k-nav-phone {
  font-family: 'Space Grotesk', 'Arial', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #111;
  text-decoration: none;
  border-bottom: 2px solid #FF2D2D;
  padding-bottom: 1px;
}

/* HERO BLOCK */
.k-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 90vh;
  border-bottom: 3px solid #111;
}

.k-hero-left {
  background: #FF2D2D;
  padding: 64px 48px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 3px solid #111;
  position: relative;
  overflow: hidden;
}

.k-hero-right {
  background: #FFD700;
  padding: 64px 48px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  overflow: hidden;
}

.k-hero-right img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  mix-blend-mode: multiply;
  opacity: 0.55;
  filter: contrast(1.1);
}

.k-hero-eyebrow {
  font-family: 'Space Grotesk', 'Arial', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.65);
}

.k-hero-display {
  font-family: 'Impact', 'Arial Black', sans-serif;
  font-size: clamp(72px, 12vw, 168px);
  line-height: 0.85;
  letter-spacing: -0.02em;
  color: #fff;
  text-transform: uppercase;
}

.k-hero-sub {
  font-family: 'Space Grotesk', 'Arial', sans-serif;
  font-size: 15px;
  font-weight: 400;
  color: rgba(255,255,255,0.8);
  line-height: 1.5;
  margin-top: 24px;
}

.k-hero-right-text {
  position: relative;
  z-index: 1;
}

.k-hero-right-label {
  font-family: 'Impact', 'Arial Black', sans-serif;
  font-size: clamp(36px, 6vw, 80px);
  color: #111;
  text-transform: uppercase;
  line-height: 0.9;
}

.k-hero-right-detail {
  font-family: 'Space Grotesk', 'Arial', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: rgba(17,17,17,0.7);
  margin-top: 16px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

@media (max-width: 768px) {
  .k-hero { grid-template-columns: 1fr; min-height: auto; }
  .k-hero-right { min-height: 280px; }
  .k-hero-left { padding: 40px 24px; }
  .k-hero-right { padding: 40px 24px; }
}

/* ROTATING BADGE */
.k-badge-wrap {
  position: fixed;
  bottom: 36px;
  right: 36px;
  z-index: 60;
  width: 100px;
  height: 100px;
}

.k-badge-ring {
  width: 100%;
  height: 100%;
  animation: spin 8s linear infinite;
}

.k-badge-inner {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Impact', sans-serif;
  font-size: 24px;
  color: #111;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* SERVICES */
.k-services {
  background: #111;
  padding: 80px 36px;
  border-bottom: 3px solid #FF2D2D;
}

.k-services-header {
  display: flex;
  align-items: baseline;
  gap: 20px;
  margin-bottom: 56px;
  flex-wrap: wrap;
}

.k-services-title {
  font-family: 'Impact', 'Arial Black', sans-serif;
  font-size: clamp(48px, 8vw, 112px);
  color: #F0EDE6;
  text-transform: uppercase;
  line-height: 0.9;
}

.k-services-sub {
  font-family: 'Space Grotesk', 'Arial', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #FF2D2D;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.k-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3px;
}

/* FLIP CARD */
.k-flip {
  perspective: 1000px;
  aspect-ratio: 3/4;
  cursor: none;
}

.k-flip-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.k-flip:hover .k-flip-inner { transform: rotateY(180deg); }

.k-flip-front, .k-flip-back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 32px;
  overflow: hidden;
}

.k-flip-front {
  background: #222;
}

.k-flip-front img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.6) contrast(1.15) saturate(0.7);
  transition: transform 0.55s ease;
}

.k-flip:hover .k-flip-front img { transform: scale(1.06); }

.k-flip-front-label {
  position: relative;
  z-index: 1;
  font-family: 'Impact', 'Arial Black', sans-serif;
  font-size: clamp(32px, 4vw, 52px);
  color: #fff;
  text-transform: uppercase;
  line-height: 0.9;
}

.k-flip-front-num {
  position: relative;
  z-index: 1;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 10px;
  letter-spacing: 0.2em;
  color: rgba(255,255,255,0.5);
  margin-bottom: 10px;
  text-transform: uppercase;
}

.k-flip-back {
  background: var(--back-color, #FF2D2D);
  transform: rotateY(180deg);
  justify-content: center;
}

.k-flip-back-title {
  font-family: 'Impact', 'Arial Black', sans-serif;
  font-size: clamp(28px, 3vw, 40px);
  color: #fff;
  text-transform: uppercase;
  margin-bottom: 20px;
  line-height: 0.9;
}

.k-flip-back-list {
  list-style: none;
}

.k-flip-back-list li {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: rgba(255,255,255,0.85);
  padding: 7px 0;
  border-bottom: 1px solid rgba(255,255,255,0.15);
}

.k-flip-back-list li::before { content: '↳ '; opacity: 0.6; }

@media (max-width: 768px) {
  .k-cards { grid-template-columns: 1fr; }
  .k-flip { aspect-ratio: 5/3; }
}

/* PORTFOLIO — DISTORT ZONE */
.k-portfolio {
  background: #F0EDE6;
  padding: 80px 36px;
  border-bottom: 3px solid #111;
}

.k-portfolio-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 16px;
}

.k-portfolio-title {
  font-family: 'Impact', 'Arial Black', sans-serif;
  font-size: clamp(40px, 7vw, 96px);
  text-transform: uppercase;
  line-height: 0.9;
}

.k-portfolio-note {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #888;
}

.k-port-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3px;
}

.k-port-item {
  aspect-ratio: 1;
  overflow: hidden;
  position: relative;
  background: #111;
  cursor: none;
}

.k-port-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease, filter 0.4s ease;
}

.k-port-item:hover img {
  transform: scale(1.08) skewX(-2deg);
  filter: saturate(1.8) contrast(1.2) hue-rotate(10deg);
}

.k-port-item-label {
  position: absolute;
  top: 10px; left: 10px;
  font-family: 'Impact', sans-serif;
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #fff;
  background: #FF2D2D;
  padding: 3px 8px;
  opacity: 0;
  transition: opacity 0.3s;
}

.k-port-item:hover .k-port-item-label { opacity: 1; }

@media (max-width: 768px) {
  .k-port-grid { grid-template-columns: repeat(2, 1fr); }
}

/* COLOR BLOCKS — animated in on scroll */
.k-blocks {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  height: 80px;
  overflow: hidden;
}

.k-block {
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.k-block.k-block-in { transform: scaleY(1); }
.k-block:nth-child(1) { background: #FF2D2D; transition-delay: 0s; }
.k-block:nth-child(2) { background: #FFD700; transition-delay: 0.08s; }
.k-block:nth-child(3) { background: #003EFF; transition-delay: 0.16s; }
.k-block:nth-child(4) { background: #111;    transition-delay: 0.24s; }

/* CONTACT */
.k-contact {
  background: #003EFF;
  padding: 100px 36px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
  border-bottom: 3px solid #111;
}

.k-contact-title {
  font-family: 'Impact', 'Arial Black', sans-serif;
  font-size: clamp(56px, 9vw, 128px);
  color: #FFD700;
  text-transform: uppercase;
  line-height: 0.85;
}

.k-contact-right { display: flex; flex-direction: column; gap: 28px; }

.k-contact-item {}

.k-contact-label {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.45);
  display: block;
  margin-bottom: 6px;
}

.k-contact-value {
  font-family: 'Impact', 'Arial Black', sans-serif;
  font-size: clamp(22px, 3vw, 36px);
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  transition: color 0.2s;
}

.k-contact-value:hover { color: #FFD700; }

.k-contact-svc {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.k-svc-tag {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: rgba(255,255,255,0.12);
  color: #fff;
  padding: 6px 14px;
  border: 1px solid rgba(255,255,255,0.2);
}

@media (max-width: 768px) {
  .k-contact { grid-template-columns: 1fr; padding: 64px 24px; gap: 40px; }
}

/* FOOTER */
.k-footer {
  background: #111;
  padding: 24px 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.k-footer-text {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #555;
}

/* SCROLL REVEAL */
@keyframes kRevealIn {
  from { opacity: 0; transform: translateY(36px); }
  to   { opacity: 1; transform: translateY(0); }
}
.k-reveal.k-in { animation: kRevealIn 0.7s ease both; }
.k-reveal.k-in.k-d1 { animation-delay: 0.1s; }
.k-reveal.k-in.k-d2 { animation-delay: 0.2s; }
`

export default function KineticPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailsRef = useRef<HTMLDivElement[]>([])
  const mousePos = useRef({ x: -100, y: -100 })
  const trailPos = useRef<Array<{ x: number; y: number }>>([])

  useEffect(() => {
    // Load fonts
    const fontLink = Object.assign(document.createElement('link'), {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap',
    })
    document.head.appendChild(fontLink)

    // Cursor trail setup
    const TRAIL = 8
    trailPos.current = Array.from({ length: TRAIL }, () => ({ x: -100, y: -100 }))
    const trails: HTMLDivElement[] = []
    for (let i = 0; i < TRAIL; i++) {
      const d = document.createElement('div')
      d.className = 'k-trail'
      const size = 10 - i * 0.8
      d.style.cssText = `width:${size}px;height:${size}px;background:${i % 2 === 0 ? '#FFD700' : '#003EFF'};opacity:${0.7 - i * 0.06};`
      document.body.appendChild(d)
      trails.push(d)
    }
    trailsRef.current = trails

    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`
      }
    }
    document.addEventListener('mousemove', onMove)

    let raf: number
    const animate = () => {
      for (let i = 0; i < trails.length; i++) {
        const prev = i === 0 ? mousePos.current : trailPos.current[i - 1]
        const curr = trailPos.current[i]
        curr.x += (prev.x - curr.x) * 0.45
        curr.y += (prev.y - curr.y) * 0.45
        trails[i].style.left = `${curr.x}px`
        trails[i].style.top = `${curr.y}px`
      }
      raf = requestAnimationFrame(animate)
    }
    animate()

    // Scroll reveals + color blocks
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('k-in', 'k-block-in')
          obs.unobserve(e.target)
        }
      }),
      { threshold: 0.12 }
    )
    pageRef.current?.querySelectorAll('.k-reveal, .k-block').forEach((el) => obs.observe(el))

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      trails.forEach((d) => { try { document.body.removeChild(d) } catch {} })
      obs.disconnect()
      try { document.head.removeChild(fontLink) } catch {}
    }
  }, [])

  const marqueeContent = '&nbsp;HOAG LAND SERVICES&nbsp;<span class="k-marquee-dot">●</span>&nbsp;EST. 2017&nbsp;<span class="k-marquee-dot">●</span>&nbsp;DELAND, FL&nbsp;<span class="k-marquee-dot">●</span>&nbsp;SITE WORK&nbsp;<span class="k-marquee-dot">●</span>&nbsp;TREE SERVICES&nbsp;<span class="k-marquee-dot">●</span>&nbsp;FENCING&nbsp;<span class="k-marquee-dot">●</span>&nbsp;ISA CERTIFIED ARBORIST&nbsp;<span class="k-marquee-dot">●</span>&nbsp;CENTRAL FLORIDA&nbsp;<span class="k-marquee-dot">●</span>&nbsp;RESIDENTIAL &amp; COMMERCIAL&nbsp;<span class="k-marquee-dot">●</span>&nbsp;'

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* CUSTOM CURSOR */}
      <div className="k-cursor" ref={cursorRef} />

      <div className="k-root" ref={pageRef}>

        {/* MARQUEE */}
        <div className="k-marquee-wrap" aria-hidden="true">
          <div className="k-marquee-track">
            {[0, 1].map((i) => (
              <span key={i} className="k-marquee-text" dangerouslySetInnerHTML={{ __html: marqueeContent }} />
            ))}
          </div>
        </div>

        {/* NAV */}
        <nav className="k-nav">
          <Link href="/" className="k-nav-back">← Back</Link>
          <span className="k-nav-logo">HLS — Hoag Land Services</span>
          <a href="tel:+13865610003" className="k-nav-phone">(386) 561-0003</a>
        </nav>

        {/* HERO */}
        <section className="k-hero">
          <div className="k-hero-left">
            <span className="k-hero-eyebrow">Central Florida · Est. 2017</span>
            <div>
              <h1 className="k-hero-display">Hoag<br />Land<br />Svc.</h1>
              <p className="k-hero-sub">Site work, tree services &amp; fencing for residential &amp; commercial properties across DeLand &amp; Central Florida.</p>
            </div>
          </div>
          <div className="k-hero-right">
            <img src="/brand/images/logo_enhanced.png" alt="HLS in the field" />
            <div className="k-hero-right-text">
              <div className="k-hero-right-label">Find out<br />how HLS<br />can help.</div>
              <p className="k-hero-right-detail">DeLand · DeLeon Springs · Central FL</p>
            </div>
          </div>
        </section>

        {/* ROTATING BADGE */}
        <div className="k-badge-wrap" aria-hidden="true">
          <svg className="k-badge-ring" viewBox="0 0 100 100">
            <defs>
              <path id="circle" d="M50,50 m-34,0 a34,34 0 1,1 68,0 a34,34 0 1,1 -68,0" />
            </defs>
            <circle cx="50" cy="50" r="46" fill="#FFD700" stroke="#111" strokeWidth="2" />
            <text fontSize="9" fontFamily="Impact, sans-serif" letterSpacing="2.5" fill="#111" style={{ textTransform: 'uppercase' }}>
              <textPath href="#circle">ISA CERTIFIED · ARBORIST · CENTRAL FL · </textPath>
            </text>
          </svg>
          <div className="k-badge-inner">✦</div>
        </div>

        {/* SERVICES */}
        <section className="k-services" id="services">
          <div className="k-services-header k-reveal">
            <h2 className="k-services-title">What<br />We Do</h2>
            <span className="k-services-sub">3 Disciplines ↓</span>
          </div>
          <div className="k-cards">
            {[
              {
                num: '01', label: 'Site Work', img: '/brand/images/site1.JPEG',
                backColor: '#FF2D2D',
                items: ['Land Clearing', 'Excavation', 'Grading', 'Ponds & Drainage', 'Erosion Control'],
              },
              {
                num: '02', label: 'Tree Svc.', img: '/brand/images/tree3.jpeg',
                backColor: '#003EFF',
                items: ['Tree Removal', 'Trimming', 'Palm Pruning', 'Installation', 'Storm Clean-Up'],
              },
              {
                num: '03', label: 'Fencing', img: '/brand/images/fence4.jpeg',
                backColor: '#111',
                items: ['Wood Privacy', 'Vinyl Picket', 'Aluminum Estate', 'Field Fence', 'Pool Enclosure'],
              },
            ].map((card) => (
              <div key={card.num} className="k-flip k-reveal k-d1">
                <div className="k-flip-inner">
                  <div className="k-flip-front">
                    <img src={card.img} alt={card.label} />
                    <span className="k-flip-front-num">{card.num}</span>
                    <span className="k-flip-front-label">{card.label}</span>
                  </div>
                  <div className="k-flip-back" style={{ '--back-color': card.backColor } as React.CSSProperties}>
                    <h3 className="k-flip-back-title">{card.label}</h3>
                    <ul className="k-flip-back-list">
                      {card.items.map((it) => <li key={it}>{it}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* COLOR BLOCKS */}
        <div className="k-blocks" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => <div key={i} className={`k-block`} />)}
        </div>

        {/* PORTFOLIO */}
        <section className="k-portfolio" id="portfolio">
          <div className="k-portfolio-header k-reveal">
            <h2 className="k-portfolio-title">Work</h2>
            <span className="k-portfolio-note">Hover to distort →</span>
          </div>
          <div className="k-port-grid">
            {[
              { src: '/brand/images/fence1.jpeg', label: 'Fencing' },
              { src: '/brand/images/tree1.jpeg', label: 'Tree' },
              { src: '/brand/images/site18.JPEG', label: 'Site' },
              { src: '/brand/images/fence8.jpeg', label: 'Fencing' },
              { src: '/brand/images/tree8.jpeg', label: 'Tree' },
              { src: '/brand/images/fence6.jpeg', label: 'Fencing' },
              { src: '/brand/images/tree11.jpeg', label: 'Tree' },
              { src: '/brand/images/site4.PNG', label: 'Excavation' },
            ].map((item, i) => (
              <div key={i} className="k-port-item k-reveal">
                <img src={item.src} alt={item.label} />
                <span className="k-port-item-label">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section className="k-contact" id="contact">
          <h2 className="k-contact-title k-reveal">Let's<br />Talk.</h2>
          <div className="k-contact-right k-reveal k-d2">
            <div className="k-contact-item">
              <span className="k-contact-label">Call</span>
              <a href="tel:+13865610003" className="k-contact-value">(386) 561-0003</a>
            </div>
            <div className="k-contact-item">
              <span className="k-contact-label">Email</span>
              <a href="mailto:tyler@hlsdeland.com" className="k-contact-value" style={{ fontSize: 'clamp(16px, 2vw, 24px)' }}>tyler@hlsdeland.com</a>
            </div>
            <div className="k-contact-item">
              <span className="k-contact-label">Services</span>
              <div className="k-contact-svc">
                <span className="k-svc-tag">Site Work</span>
                <span className="k-svc-tag">Tree Services</span>
                <span className="k-svc-tag">Fencing</span>
              </div>
            </div>
          </div>
        </section>

        <footer className="k-footer">
          <span className="k-footer-text">Hoag Land Services, LLC — Est. 2017</span>
          <span className="k-footer-text">DeLand, FL — © 2025</span>
        </footer>
      </div>
    </>
  )
}
