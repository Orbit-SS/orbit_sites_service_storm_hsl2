'use client'

import Link from 'next/link'

const PAGES = [
  {
    href: '/brutalist',
    num: '01',
    title: 'Editorial Brutalist',
    ref: 'Are.na · Swiss Style · Cargo',
    mood: 'Stark. Typographic. Confrontational.',
    accent: '#FFFFFF',
    hoverBg: '#111111',
  },
  {
    href: '/luxe',
    num: '02',
    title: 'Luxe Scroll Theater',
    ref: 'Loewe · Loro Piana · Editorial',
    mood: 'Refined. Cinematic. Timeless.',
    accent: '#C9A84C',
    hoverBg: '#0c0a04',
  },
  {
    href: '/kinetic',
    num: '03',
    title: 'Kinetic Maximalist',
    ref: 'Studio Dumbar · Resn · Awwwards',
    mood: 'Loud. Moving. Unstoppable.',
    accent: '#FF2D2D',
    hoverBg: '#0d0000',
  },
  {
    href: '/minimal',
    num: '04',
    title: 'Spatial Minimalist',
    ref: 'Linear · Basement · Stripe',
    mood: 'Quiet. Precise. Inevitable.',
    accent: '#5B8DEF',
    hoverBg: '#05080f',
  },
  {
    href: '/retro',
    num: '05',
    title: 'Retro Digital',
    ref: 'Pool · Bret Victor · CRT Era',
    mood: 'Glitchy. Terminal. Alive.',
    accent: '#00FF41',
    hoverBg: '#000d00',
  },
]

const CSS = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.portal-root {
  min-height: 100vh;
  background: #050505;
  color: #666;
  font-family: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', 'Courier New', monospace;
}

.portal-topbar {
  padding: 18px 32px;
  border-bottom: 1px solid #141414;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.portal-logo {
  display: flex;
  align-items: center;
  gap: 14px;
}

.portal-logo img {
  height: 26px;
  width: auto;
  filter: brightness(0) invert(1);
  opacity: 0.55;
}

.portal-logo-name {
  color: #444;
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.portal-badge {
  font-size: 10px;
  letter-spacing: 0.14em;
  color: #383838;
  border: 1px solid #1e1e1e;
  padding: 5px 12px;
  border-radius: 3px;
  text-transform: uppercase;
}

.portal-content {
  padding: 72px 32px 40px;
  max-width: 1300px;
  margin: 0 auto;
}

.portal-eyebrow {
  font-size: 10px;
  letter-spacing: 0.22em;
  color: #333;
  margin-bottom: 12px;
}

.portal-heading {
  font-size: clamp(32px, 4.5vw, 60px);
  font-weight: 400;
  color: #e8e8e8;
  margin: 0 0 10px;
  letter-spacing: -0.03em;
  line-height: 1.05;
}

.portal-sub {
  font-size: 12px;
  color: #444;
  margin-bottom: 56px;
  max-width: 520px;
  line-height: 1.7;
}

.portal-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  border: 1px solid #141414;
  gap: 0;
  background: #141414;
}

.portal-card {
  background: #050505;
  padding: 36px 32px 60px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  transition: background 0.25s ease;
  position: relative;
  overflow: hidden;
  min-height: 200px;
}

.portal-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: var(--card-accent, #333);
  opacity: 0;
  transition: opacity 0.25s ease;
}

.portal-card:hover { background: var(--card-hover); }
.portal-card:hover::before { opacity: 1; }
.portal-card:hover .c-title { color: var(--card-accent); }
.portal-card:hover .c-arrow { color: var(--card-accent); transform: translate(4px, -4px); }

.c-num {
  font-size: 10px;
  color: #2a2a2a;
  letter-spacing: 0.18em;
  margin-bottom: 22px;
}

.c-title {
  font-size: 17px;
  font-weight: 400;
  color: #c0c0c0;
  margin: 0 0 6px;
  letter-spacing: -0.01em;
  transition: color 0.25s ease;
  line-height: 1.2;
}

.c-ref {
  font-size: 10px;
  color: #383838;
  margin: 0 0 0;
  letter-spacing: 0.06em;
}

.c-mood {
  font-size: 11px;
  color: #555;
  line-height: 1.55;
  border-top: 1px solid #131313;
  margin-top: auto;
  padding-top: 16px;
}

.c-arrow {
  position: absolute;
  bottom: 32px; right: 32px;
  color: #282828;
  font-size: 16px;
  transition: color 0.25s ease, transform 0.25s ease;
  line-height: 1;
}

.portal-footer {
  padding: 28px 32px;
  border-top: 1px solid #0e0e0e;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #282828;
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  max-width: 1300px;
  margin: 0 auto;
}

@media (max-width: 640px) {
  .portal-content { padding: 48px 20px 32px; }
  .portal-topbar { padding: 16px 20px; }
  .portal-card { padding: 28px 20px 52px; }
  .portal-footer { padding: 24px 20px; flex-direction: column; gap: 8px; }
}
`

export default function PortalPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="portal-root">
        <header className="portal-topbar">
          <div className="portal-logo">
            <img src="/brand/images/HLSlogo-nobackground.png" alt="HLS" />
            <span className="portal-logo-name">Hoag Land Services</span>
          </div>
          <span className="portal-badge">Design Review — v5.0</span>
        </header>

        <main className="portal-content">
          <p className="portal-eyebrow">// internal design archive</p>
          <h1 className="portal-heading">5 Directions<br />for HLS.com</h1>
          <p className="portal-sub">
            Five fully realized concept directions for the Hoag Land Services website rebuild.
            Each uses real copy, real imagery, and a completely distinct visual philosophy.
          </p>

          <div className="portal-grid">
            {PAGES.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="portal-card"
                style={{
                  '--card-accent': p.accent,
                  '--card-hover': p.hoverBg,
                } as React.CSSProperties}
              >
                <p className="c-num">{p.num} / 05</p>
                <h2 className="c-title">{p.title}</h2>
                <p className="c-ref">{p.ref}</p>
                <p className="c-mood">{p.mood}</p>
                <span className="c-arrow">↗</span>
              </Link>
            ))}
          </div>
        </main>

        <footer className="portal-footer">
          <span>Hoag Land Services, LLC — Design Concepts 2025</span>
          <span>hlsdeland.com</span>
        </footer>
      </div>
    </>
  )
}
