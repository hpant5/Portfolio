'use client';

import { useState, useEffect } from 'react';
import { track } from '@vercel/analytics';
import Reveal from '@/components/Reveal';
import ProjectCarousel from '@/components/ProjectCarousel';
import ContactForm from '@/components/ContactForm';

/* ══════════════════════════════════════════════ */

const EXPERIENCE = [
  {
    title: 'Backend & AI Developer — Internship',
    company: 'MyEdMaster',
    companyNote: 'US-based EdTech Company (Virginia)',
    period: 'Jan 2025 – Present',
    location: 'Remote',
    domain: 'Legal Tech / AI',
    current: true,
    tech: ['Python', 'LangChain', 'Vector DB', 'Multi-Agent Systems', 'LLM', 'RAG'],
    bullets: [
      'Building an Agentic RAG system with deep personalization that provides accessible legal guidance for underserved users who cannot afford traditional counsel',
      'Designed multi-agent pipeline where specialized agents collaborate independently — handling query refinement, document retrieval, and response generation',
      'Architecting backend infrastructure and an interactive interface that helps users understand their legal options with confidence',
    ],
  },
  {
    title: 'Consultant II — Analytics (Data Engineer)',
    company: 'EXL',
    period: 'Jul 2023 – Mar 2024',
    location: 'Gurugram, India · Remote',
    domain: 'Insurance',
    tech: ['PySpark', 'AWS EMR', 'Airflow', 'Snowflake', 'Great Expectations', 'Jenkins'],
    bullets: [
      'Cut PySpark ETL processing time by 66% (90 min → 30 min) on AWS EMR for insurance reporting stakeholders',
      'Built automated data validation with Great Expectations across 5 insurance data sources, catching quality issues before downstream models',
      'Orchestrated end-to-end Airflow workflows integrating APIs, databases, and S3 for underwriting ML models',
      'Implemented CI/CD pipelines (Jenkins + Bitbucket) to streamline releases and reduce deployment friction',
    ],
  },
  {
    title: 'Data Engineer',
    company: 'Super Six Sports Gaming',
    period: 'Aug 2022 – Jul 2023',
    location: 'Gurugram, India · On-site',
    domain: 'Sports Analytics',
    tech: ['Python', 'PySpark', 'SQL', 'NoSQL', 'Machine Learning', 'Data Modeling'],
    bullets: [
      'Designed and built the entire data infrastructure from scratch — data models, ingestion pipelines, and processing layers — serving as the foundation for all analytics and ML workloads',
      'Developed and deployed a churn prediction model for new users, directly reducing churn and driving measurable improvements in retention and revenue',
      'Built end-to-end pipelines (Python, PySpark, SQL) ingesting semi-structured data from APIs, logs, and NoSQL sources at scale',
      'Automated data validation, monitoring, and unit testing frameworks, improving quality and reliability across the full pipeline',
    ],
  },
  {
    title: 'Associate Data Engineer',
    company: 'Futurense Technologies',
    period: 'Oct 2021 – Jul 2022',
    location: 'Bangalore, India · Remote',
    domain: 'Healthcare',
    tech: ['Azure Databricks', 'Apache Spark', 'PySpark', 'SAS', 'SQL', 'S3'],
    bullets: [
      'Led migration of 50 legacy SAS batch workflows to Spark on Azure Databricks for financial services clients',
      'Cut runtime from 6 hours to under 50 minutes (86% reduction) via partitioning, caching, and broadcast joins',
      'Delivered zero-data-loss transition across all 50 workflows, resolving schema mismatches and validation gaps',
      'Built automated data quality checks and transformation pipelines for downstream ML and reporting',
    ],
  },
  {
    title: 'Executive Analyst',
    company: 'Koron Projects Limited',
    period: 'Oct 2018 – Jul 2021',
    location: 'Gurugram, India · On-site',
    domain: 'Construction & Infrastructure',
    tech: ['Power BI', 'SQL Server', 'Oracle', 'Python', 'Excel'],
    bullets: [
      'Built 15 Power BI dashboards providing real-time visibility across $50M+ in annual construction projects',
      'Automated monthly reporting, replacing manual Excel workflows and saving 20 hours/month for finance stakeholders',
      'Designed KPI dashboards tracking 50+ active projects, enabling leadership to identify delays and make faster decisions',
    ],
  },
];

const TECH_STACK = {
  'Languages': ['Python', 'SQL', 'JavaScript', 'PySpark'],
  'Data & ML': ['Apache Spark', 'Databricks', 'Airflow', 'LangChain', 'Snowflake', 'Great Expectations'],
  'Cloud & Infra': ['AWS (EMR, S3, Lambda, SQS, ECR)', 'Azure', 'Docker', 'Jenkins', 'CI/CD'],
  'Frontend': ['React', 'Next.js', 'Node.js', 'HTML/CSS'],
  'Databases': ['PostgreSQL', 'SQL Server', 'Oracle', 'NoSQL', 'Vector DBs'],
  'Tools': ['Git', 'Power BI', 'Streamlit', 'Jira'],
};

const ACHIEVEMENTS = [
  { icon: '🏆', title: 'DEVLABS Hackathon — 1st Place', desc: 'Won with MeetFlow — intelligent task orchestration converting meeting transcripts into capacity-aware ticket assignments using LLM-powered analysis.' },
  { icon: '🏆', title: 'HackASU — FairCharge', desc: 'Built a medical bill audit pipeline at HackASU that uses Claude Vision + SapBERT to detect overcharges, flagging $1,300+ in average billing errors per hospital bill.' },
  { icon: '🏅', title: 'SPOT Award — Exceptional Delivery', desc: 'Recognized at Super Six Sports Gaming for exceptional delivery and cross-team collaboration on critical product features.' },
  { icon: '🎓', title: 'M.S. Software Engineering (AI)', desc: 'Pursuing AI specialization at Arizona State University — researching agentic RAG systems and multi-agent architectures.' },
];

const PROJECTS = [
  {
    id: 'faircharge', title: 'FairCharge', tag: 'Hackathon', highlight: true,
    role: 'Solo builder — HackASU Claude AI Builder Hackathon',
    desc: 'A medical bill audit pipeline that reads your bill, identifies every charge, benchmarks against real CMS Medicare pricing data for your state, detects overcharges and billing violations, and generates a ready-to-send dispute letter. Built to fight the information asymmetry where 49–80% of medical bills contain errors.',
    tech: ['Python', 'Claude Vision', 'SapBERT', 'ChromaDB', 'SQLite', 'Streamlit', 'CMS Data'],
    link: null, github: 'https://github.com/hpant5/Fair_charge',
    images: ['/images/Faircharge1.webp', '/images/Faircharge2.webp', '/images/Faircharge3.webp'],
    captions: ['Bill Upload & Analysis', 'Pricing Benchmark & Discrepancies', 'Generated Dispute Letter'],
  },
  {
    id: 'meetflow', title: 'MeetFlow', tag: 'Hackathon Winner', highlight: true,
    role: 'Led the LLM pipeline & orchestration layer',
    desc: 'Intelligent task orchestration that converts meeting transcripts into actionable tickets. Analyzes via GPT-4o-mini, checks team capacity through Taiga, recommends smart reassignment for overloaded members, and notifies via Slack.',
    tech: ['Python', 'Streamlit', 'OpenAI', 'Taiga API', 'Slack'],
    link: null, github: 'https://github.com/hpant5/MeetFlow',
    images: ['/images/meetflow-analysis.webp', '/images/meetflow-capacity.webp', '/images/meetflow-slack.webp'],
    captions: ['Agent 1: Transcript Analysis', 'Capacity Projection & Reassignment', 'Slack Notification Output'],
  },
  {
    id: 'face-recognition', title: 'Serverless Face Recognition', tag: 'Academic',
    desc: 'A serverless, multistage face recognition system using edge computing. IoT clients send video frames processed through decoupled detection and recognition stages via event-driven architecture — scalable, real-time identification without persistent servers.',
    tech: ['AWS Lambda', 'SQS', 'ECR', 'Docker', 'PyTorch', 'OpenCV', 'Edge Computing'],
    link: null, github: null, images: [], captions: [],
  },
  {
    id: 'lifesync', title: 'LifeSync', tag: 'Live',
    desc: 'Full-stack productivity platform with Google OAuth, Focus Score tracking, daily task management, Pomodoro timer, and motivational micro-challenges.',
    tech: ['React', 'Node.js', 'Google OAuth', 'REST API'],
    link: 'https://lifesync.xyz', github: null,
    images: ['/images/lifesync-dashboard.webp', '/images/lifesync-pomodoro.webp'],
    captions: ['Focus Score Dashboard', 'Pomodoro Timer'],
  },
  {
    id: 'pause', title: 'The Pause Button', tag: 'Live',
    desc: 'A developer wellness app with mixable ambient soundscapes, 10+ casual mini-games, and a calming UI — because even builders need a break.',
    tech: ['React', 'JavaScript', 'Web Audio API', 'CSS Animations'],
    link: 'https://www.pausebutton.dev/', github: null,
    images: ['/images/pause-sounds.webp', '/images/pause-games.webp'],
    captions: ['Nature Sounds Mixer', 'Casual Mini-Games'],
  },
  {
    id: 'legal-ai', title: 'Legal AI — Agentic RAG', tag: 'Building',
    desc: "Multi-agent system providing accessible legal guidance for those who can't afford a lawyer. Extensive query refinement via vector DB, specialized agents that collaborate independently.",
    tech: ['Python', 'LangChain', 'Vector DB', 'Multi-Agent', 'LLM'],
    link: null, github: null, images: [], captions: [],
  },
  {
    id: 'feature-store', title: 'Feature Store with Time Travel', tag: 'Industry',
    desc: 'Centralized Feature Store using Apache Iceberg with time-travel, enabling ML teams to train, test, and deploy from a single source of truth.',
    tech: ['Apache Iceberg', 'Spark', 'Python', 'ML Infra'],
    link: null, github: null, images: [], captions: [],
  },
  {
    id: 'sas-spark', title: 'SAS to Spark Migration', tag: 'Industry',
    desc: 'Migrated 50 legacy SAS workflows to Spark, cutting runtime from 6+ hours to under 50 minutes via partitioning, broadcast joins, and caching.',
    tech: ['Apache Spark', 'PySpark', 'SAS', 'Data Engineering'],
    link: null, github: null, images: [], captions: [],
  },
];

const DOMAINS = [
  { name: 'Healthcare', icon: '🏥' },
  { name: 'Sports Analytics', icon: '⚽' },
  { name: 'Insurance & Banking', icon: '🏦' },
  { name: 'Retention & Segmentation', icon: '📊' },
];

/* ── Icons ── */
const MailIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 4L12 13L2 4" /></svg>);
const LIIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>);
const GHIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>);
const DownloadIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>);
const BriefcaseIcon = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /></svg>);

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 20); window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h); }, []);

  return (
    <>
      <div className="grain" />

      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <a className="nav-logo" href="#top">HP</a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="nav-resume" onClick={() => track('resume_download', { location: 'nav' })}><DownloadIcon /> Resume</a></li>
        </ul>
      </nav>

      {/* Hero */}
      <section className="hero" id="top">
        <div className="orb orb-a" /><div className="orb orb-b" />
        <Reveal>
          <div className="hero-top">
            <img src="/images/profile.webp" alt="Himanshu Pant" className="hero-photo" />
            <div className="hero-text">
              <p className="hero-tag">Himanshu Pant</p>
              <h1>I build things<br />that <em>scale.</em></h1>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="hero-sub">Software Engineer with 5+ years in data & backend engineering. Currently pursuing my M.S. in Software Engineering (AI Specialization) at ASU and working as a Backend & AI Developer at MyEdMaster, building agentic AI systems with deep personalization.</p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">Get in Touch</a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" onClick={() => track('resume_download', { location: 'hero' })}><DownloadIcon /> Resume</a>
          </div>
        </Reveal>
        <Reveal delay={0.26}>
          <div className="hero-meta">
            <span className="meta-item"><span className="pulse" /> Open to opportunities</span>
            <span className="meta-item">Tempe, AZ</span>
            <span className="meta-item">himanshupant.dev</span>
          </div>
        </Reveal>
      </section>

      {/* About + Tech */}
      <div className="divider"><hr /></div>
      <section className="section" id="about">
        <Reveal><p className="section-label">About</p><h2 className="section-title">Engineer at heart.</h2></Reveal>
        <div className="about-grid">
          <div>
            <Reveal delay={0.08}>
              <p className="about-text">I've spent 5+ years designing backend systems, data pipelines, and distributed architectures across healthcare, sports analytics, insurance, and banking. Now I'm sharpening that foundation with an M.S. focused on AI at ASU.</p>
              <p className="about-text">Currently interning at <strong>MyEdMaster</strong>, a US-based company (Virginia), as a Backend & AI Developer — building an Agentic RAG system with deep personalization that provides accessible legal guidance. Because everyone deserves answers, not just those who can afford a lawyer.</p>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="domains">{DOMAINS.map((d) => (<span key={d.name} className="domain-chip">{d.icon} {d.name}</span>))}</div>
            </Reveal>
          </div>
          <div className="stats">
            <Reveal delay={0.1}><div className="stat"><div className="stat-num">5+</div><div className="stat-label">Years Experience</div></div></Reveal>
            <Reveal delay={0.14}><div className="stat"><div className="stat-num">M.S.</div><div className="stat-label">Software Engineering (AI) — ASU</div></div></Reveal>
          </div>
        </div>
        <Reveal delay={0.1}><h3 className="subsection-title">Tech I work with</h3></Reveal>
        <div className="tech-grid">
          {Object.entries(TECH_STACK).map(([cat, items], i) => (
            <Reveal key={cat} delay={0.06 * i}>
              <div className="tech-category">
                <span className="tech-cat-label">{cat}</span>
                <div className="tech-items">{items.map((item) => (<span key={item} className="tech-item">{item}</span>))}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <div className="divider"><hr /></div>
      <section className="section" id="achievements">
        <Reveal><p className="section-label">Achievements</p><h2 className="section-title">Highlights.</h2></Reveal>
        <div className="achievements-grid">
          {ACHIEVEMENTS.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.08}>
              <div className="achievement-card">
                <span className="achievement-icon">{a.icon}</span>
                <div>
                  <h4 className="achievement-title">{a.title}</h4>
                  <p className="achievement-desc">{a.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Experience */}
      <div className="divider"><hr /></div>
      <section className="section" id="experience">
        <Reveal><p className="section-label">Experience</p><h2 className="section-title">Where I've worked.</h2></Reveal>
        <div className="timeline">
          {EXPERIENCE.map((job, i) => (
            <Reveal key={job.company} delay={i * 0.08}>
              <div className="timeline-item">
                <div className={`timeline-dot${job.current ? ' timeline-dot-active' : ''}`} />
                <div className="timeline-content">
                  <div className="job-header">
                    <div>
                      <h3 className="job-title">{job.title}</h3>
                      <p className="job-company">{job.company}</p>
                      {job.companyNote && <p className="job-note">{job.companyNote}</p>}
                    </div>
                    <div className="job-meta-right">
                      <span className="job-period">{job.current && <span className="current-badge">Current</span>}{job.period}</span>
                      <span className="job-domain"><BriefcaseIcon /> {job.domain}</span>
                    </div>
                  </div>
                  <p className="job-location">{job.location}</p>
                  <ul className="job-bullets">{job.bullets.map((b, j) => (<li key={j}>{b}</li>))}</ul>
                  <div className="job-tech">{job.tech.map((t) => (<span key={t} className="pill">{t}</span>))}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Projects Carousel */}
      <div className="divider"><hr /></div>
      <section className="section section-wide" id="projects">
        <Reveal><p className="section-label">Projects</p><h2 className="section-title">Selected work.</h2></Reveal>
        <ProjectCarousel projects={PROJECTS} />
      </section>

      {/* Contact */}
      <div className="divider"><hr /></div>
      <section className="section" id="contact">
        <Reveal><p className="section-label">Get in Touch</p><h2 className="section-title">Let's build something.</h2></Reveal>
        <div className="contact-grid">
          <Reveal delay={0.06}>
            <div className="contact-info">
              <p className="about-text">I'm looking for SWE, Backend Engineering, and Data Engineering roles. If you're building something interesting, I'd love to hear about it.</p>
              <div className="contact-links-list">
                <a href="mailto:hpant.data@gmail.com" className="contact-link-item"><MailIcon /> hpant.data@gmail.com</a>
                <a href="https://www.linkedin.com/in/itshimanshup/" target="_blank" rel="noopener noreferrer" className="contact-link-item"><LIIcon /> linkedin.com/in/itshimanshup</a>
                <a href="https://github.com/hpant5" target="_blank" rel="noopener noreferrer" className="contact-link-item"><GHIcon /> github.com/hpant5</a>
              </div>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ marginTop: 20 }} onClick={() => track('resume_download', { location: 'contact' })}><DownloadIcon /> Download Resume</a>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <footer className="footer">© {new Date().getFullYear()} Himanshu Pant. Built with care.</footer>
    </>
  );
}