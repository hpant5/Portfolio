'use client';

import { useState, useEffect } from 'react';
import Reveal from '@/components/Reveal';
import Gallery from '@/components/Gallery';

/* ── Data ── */
const PROJECTS = [
  {
    id: 'meetflow',
    title: 'MeetFlow',
    tag: 'Hackathon Winner',
    highlight: true,
    role: 'Led the LLM pipeline & orchestration layer',
    desc: 'Intelligent task orchestration that converts meeting transcripts into actionable tickets. Analyzes via GPT-4o-mini, checks team capacity through Taiga, recommends smart reassignment for overloaded members, and notifies via Slack.',
    tech: ['Python', 'Streamlit', 'OpenAI', 'Taiga API', 'Slack'],
    link: null,
    github: 'https://github.com/hpant5/MeetFlow',
    images: ['/images/meetflow-analysis.webp', '/images/meetflow-capacity.webp', '/images/meetflow-slack.webp'],
    captions: ['Agent 1: Transcript Analysis', 'Capacity Projection & Reassignment', 'Slack Notification Output'],
  },
  {
    id: 'lifesync',
    title: 'LifeSync',
    tag: 'Live',
    desc: 'Full-stack productivity platform with Google OAuth, Focus Score tracking, daily task management, Pomodoro timer, and motivational micro-challenges — built to help users plan and optimize their day.',
    tech: ['React', 'Node.js', 'Google OAuth', 'REST API'],
    link: 'https://lifesync.xyz',
    github: null,
    images: ['/images/lifesync-dashboard.webp', '/images/lifesync-pomodoro.webp'],
    captions: ['Focus Score Dashboard', 'Pomodoro Timer'],
  },
  {
    id: 'pause',
    title: 'The Pause Button',
    tag: 'Live',
    desc: 'A developer wellness app for engineers who need to unwind. Features mixable ambient soundscapes, 10+ casual mini-games, and a calming UI — because even builders need a break.',
    tech: ['React', 'JavaScript', 'Web Audio API', 'CSS Animations'],
    link: 'https://www.pausebutton.dev/',
    github: null,
    images: ['/images/pause-sounds.webp', '/images/pause-games.webp'],
    captions: ['Nature Sounds Mixer', 'Casual Mini-Games'],
  },
  {
    id: 'legal-ai',
    title: 'Legal AI — Agentic RAG',
    tag: 'Building',
    desc: "A multi-agent system providing accessible legal guidance for those who can't afford a lawyer but deserve one. Uses extensive query refinement via a vector database for RAG, with multiple specialized agents that collaborate yet operate independently, delivering a highly interactive experience that helps users make informed decisions.",
    tech: ['Python', 'LangChain', 'Vector DB', 'Multi-Agent', 'LLM'],
    link: null,
    github: null,
    images: [],
    captions: [],
  },
  {
    id: 'feature-store',
    title: 'Feature Store with Time Travel',
    tag: 'Industry',
    desc: 'Built a centralized Feature Store using Apache Iceberg with time-travel capabilities, enabling data scientists across multiple teams to train, test, and deploy ML models from a single source of truth — eliminating feature duplication and versioning headaches.',
    tech: ['Apache Iceberg', 'Spark', 'Python', 'ML Infra'],
    link: null,
    github: null,
    images: [],
    captions: [],
  },
  {
    id: 'sas-spark',
    title: 'SAS to Spark Migration',
    tag: 'Industry',
    desc: 'Migrated a legacy SAS analytics system to Apache Spark, cutting pipeline runtime from 6+ hours to under 40 minutes through intelligent partitioning, broadcast joins, caching strategies, and predicate pushdown optimizations.',
    tech: ['Apache Spark', 'PySpark', 'SAS', 'Data Engineering'],
    link: null,
    github: null,
    images: [],
    captions: [],
  },
];

const DOMAINS = [
  { name: 'Healthcare', icon: '🏥' },
  { name: 'Sports Analytics', icon: '⚽' },
  { name: 'Insurance & Banking', icon: '🏦' },
  { name: 'Retention & Segmentation', icon: '📊' },
];

/* ── Icons ── */
const ExtIcon = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 13L13 1M13 1H5M13 1V9" />
  </svg>
);
const GHIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);
const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 4L12 13L2 4" />
  </svg>
);
const LIIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

function tagClass(t) {
  if (t === 'Hackathon Winner') return 'tag-winner';
  if (t === 'Live') return 'tag-live';
  if (t === 'Building') return 'tag-building';
  return 'tag-industry';
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <>
      <div className="grain" />

      {/* Nav */}
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <a className="nav-logo" href="#top">Himanshu Pant</a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Work</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Hero */}
      <section className="hero" id="top">
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <Reveal><p className="hero-tag">Hey, I'm Himanshu</p></Reveal>
        <Reveal delay={0.08}>
          <h1>I build things<br />that <em>scale.</em></h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="hero-sub">
            Software Engineer with 5+ years in data & backend engineering.
            Currently pursuing my M.S. in Software Engineering (AI Specialization)
            at Arizona State University — building systems that are fast, reliable, and intelligent.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="hero-meta">
            <span className="meta-item"><span className="pulse" /> Open to opportunities</span>
            <span className="meta-item">Tempe, AZ</span>
            <span className="meta-item">himanshupant.dev</span>
          </div>
        </Reveal>
      </section>

      {/* About */}
      <div className="divider"><hr /></div>
      <section className="section" id="about">
        <Reveal>
          <p className="section-label">About</p>
          <h2 className="section-title">Engineer at heart.</h2>
        </Reveal>
        <div className="about-grid">
          <div>
            <Reveal delay={0.08}>
              <p className="about-text">
                I've spent 5+ years designing backend systems, data pipelines, and distributed
                architectures across healthcare, sports analytics, insurance, and banking. Now I'm
                sharpening that foundation with an M.S. focused on AI at ASU.
              </p>
              <p className="about-text">
                I care about clean architecture, thoughtful API design, and code the next person can
                maintain. Currently exploring the intersection of agentic AI and retrieval-augmented
                generation.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="domains">
                {DOMAINS.map((d) => (
                  <span key={d.name} className="domain-chip">{d.icon} {d.name}</span>
                ))}
              </div>
            </Reveal>
          </div>
          <div className="stats">
            <Reveal delay={0.1}>
              <div className="stat"><div className="stat-num">5+</div><div className="stat-label">Years Experience</div></div>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="stat"><div className="stat-num">M.S.</div><div className="stat-label">Software Engineering (AI) — ASU</div></div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Projects */}
      <div className="divider"><hr /></div>
      <section className="section" id="projects">
        <Reveal>
          <p className="section-label">Projects</p>
          <h2 className="section-title">Selected work.</h2>
        </Reveal>
        <div className="projects">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <div className={`card${p.highlight ? ' highlight' : ''}`}>
                <div className="card-header">
                  <span className="card-title">{p.title}</span>
                  <span className={`tag ${tagClass(p.tag)}`}>{p.tag}</span>
                </div>
                {p.role && <p className="card-role">{p.role}</p>}
                <p className="card-desc">{p.desc}</p>
                <Gallery images={p.images} captions={p.captions} />
                <div className="card-footer">
                  <div className="pills">
                    {p.tech.map((t) => <span key={t} className="pill">{t}</span>)}
                  </div>
                  <div className="card-links">
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noopener noreferrer"><GHIcon /> Code</a>
                    )}
                    {p.link && (
                      <a href={p.link} target="_blank" rel="noopener noreferrer"><ExtIcon /> Live</a>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Contact */}
      <div className="divider"><hr /></div>
      <section className="contact" id="contact">
        <Reveal>
          <p className="section-label">Get in Touch</p>
          <h2>Let's build something.</h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p>
            I'm looking for SWE, Backend Engineering, and Data Engineering roles.
            If you're building something interesting, I'd love to hear about it.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="cta-row">
            <a className="btn btn-primary" href="mailto:hpant.data@gmail.com"><MailIcon /> Say Hello</a>
            <a className="btn btn-secondary" href="https://www.linkedin.com/in/itshimanshup/" target="_blank" rel="noopener noreferrer"><LIIcon /> LinkedIn</a>
            <a className="btn btn-secondary" href="https://github.com/hpant5" target="_blank" rel="noopener noreferrer"><GHIcon /> GitHub</a>
          </div>
        </Reveal>
      </section>

      <footer className="footer">© {new Date().getFullYear()} Himanshu Pant. Built with care.</footer>
    </>
  );
}
