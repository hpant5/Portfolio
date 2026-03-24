'use client';

import { useState, useEffect } from 'react';
import Reveal from '@/components/Reveal';
import Gallery from '@/components/Gallery';

/* ══════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════ */

const EXPERIENCE = [
  {
    title: 'Consultant II — Analytics (Data Engineer)',
    company: 'EXL',
    period: 'Jul 2023 – Mar 2024',
    location: 'Gurugram, India · Remote',
    domain: 'Insurance',
    tech: ['PySpark', 'AWS EMR', 'Airflow', 'Snowflake', 'Great Expectations', 'Jenkins'],
    bullets: [
      'Optimized PySpark ETL pipelines on AWS EMR, cutting processing time by 66% (90 min → under 30 min) for insurance reporting stakeholders',
      'Built automated data validation frameworks with Great Expectations across 5 insurance data sources, catching quality issues before downstream models',
      'Orchestrated end-to-end data workflows in Airflow — integrating APIs, databases, and S3 — to deliver analytics-ready data for underwriting and ML models',
      'Partnered with data science team to productionize underwriting models, ensuring stable data flows and reliable performance in production',
      'Implemented CI/CD pipelines (Jenkins + Bitbucket) to streamline releases and reduce deployment friction',
    ],
  },
  {
    title: 'Data Engineer',
    company: 'Super Six Sports Gaming',
    period: 'Aug 2022 – Jul 2023',
    location: 'Gurugram, India · On-site',
    domain: 'Sports Analytics',
    tech: ['Python', 'PySpark', 'SQL', 'NoSQL', 'Machine Learning'],
    bullets: [
      'Built end-to-end data pipelines (Python, PySpark, SQL) ingesting semi-structured data from APIs, logs, and NoSQL sources at scale',
      'Designed and optimized data models for sports analytics workflows, improving query performance and enabling advanced reporting',
      'Developed and deployed a churn prediction model for new users, directly reducing churn and improving retention metrics',
      'Automated data ingestion, validation, monitoring, and unit testing frameworks across the full pipeline',
    ],
    award: '🏅 Awarded SPOT Recognition for outstanding ownership and cross-functional collaboration',
  },
  {
    title: 'Associate Data Engineer',
    company: 'Futurense Technologies',
    period: 'Oct 2021 – Jul 2022',
    location: 'Bangalore, India · Remote',
    domain: 'Banking & Financial Services',
    tech: ['Azure Databricks', 'Apache Spark', 'PySpark', 'SAS', 'SQL', 'S3'],
    bullets: [
      'Led migration of 50 legacy SAS batch workflows to Apache Spark on Azure Databricks for financial services clients',
      'Tuned Spark jobs using partitioning, caching, and broadcast joins — cutting runtime from 6 hours to under 50 minutes (86% reduction)',
      'Delivered zero-data-loss transition to Azure, resolving schema mismatches and validation gaps across all 50 workflows',
      'Built automated data cleaning and transformation pipelines, storing curated datasets in S3 for analytics and Power BI dashboards',
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
      'Built and maintained 15 Power BI dashboards for senior leadership, providing real-time visibility into costs and profitability across $50M+ in annual construction projects',
      'Automated monthly executive reporting with Power BI and SQL stored procedures, replacing manual Excel workflows and saving 20 hours/month',
      'Designed KPI dashboards tracking progress across 50+ active projects, enabling leadership to identify delays and make faster decisions',
    ],
  },
];

const TECH_STACK = {
  'Languages': ['Python', 'SQL', 'JavaScript', 'PySpark'],
  'Data & ML': ['Apache Spark', 'Databricks', 'Airflow', 'LangChain', 'Snowflake', 'Great Expectations'],
  'Cloud & Infra': ['AWS (EMR, S3, Lambda)', 'Azure', 'Docker', 'Jenkins', 'CI/CD'],
  'Frontend': ['React', 'Next.js', 'Node.js', 'HTML/CSS'],
  'Databases': ['PostgreSQL', 'SQL Server', 'Oracle', 'NoSQL', 'Vector DBs'],
  'Tools': ['Git', 'Power BI', 'Streamlit', 'Jira'],
};

const ACHIEVEMENTS = [
  {
    icon: '🏆',
    title: 'DEVLABS Hackathon Winner',
    desc: 'Won 1st place with MeetFlow — an intelligent task orchestration tool that converts meeting transcripts into assigned tickets using GPT-4o-mini and capacity-aware reassignment.',
  },
  {
    icon: '🏅',
    title: 'SPOT Recognition Award',
    desc: 'Awarded at Super Six Sports Gaming for outstanding ownership and cross-functional collaboration on critical product features.',
  },
  {
    icon: '🎓',
    title: 'M.S. Software Engineering (AI)',
    desc: 'Currently pursuing AI specialization at Arizona State University — researching agentic RAG systems and multi-agent architectures.',
  },
];

const PROJECTS = [
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
    id: 'lifesync', title: 'LifeSync', tag: 'Live',
    desc: 'Full-stack productivity platform with Google OAuth, Focus Score tracking, daily task management, Pomodoro timer, and motivational micro-challenges — built to help users plan and optimize their day.',
    tech: ['React', 'Node.js', 'Google OAuth', 'REST API'],
    link: 'https://lifesync.xyz', github: null,
    images: ['/images/lifesync-dashboard.webp', '/images/lifesync-pomodoro.webp'],
    captions: ['Focus Score Dashboard', 'Pomodoro Timer'],
  },
  {
    id: 'pause', title: 'The Pause Button', tag: 'Live',
    desc: 'A developer wellness app for engineers who need to unwind. Features mixable ambient soundscapes, 10+ casual mini-games, and a calming UI — because even builders need a break.',
    tech: ['React', 'JavaScript', 'Web Audio API', 'CSS Animations'],
    link: 'https://www.pausebutton.dev/', github: null,
    images: ['/images/pause-sounds.webp', '/images/pause-games.webp'],
    captions: ['Nature Sounds Mixer', 'Casual Mini-Games'],
  },
  {
    id: 'legal-ai', title: 'Legal AI — Agentic RAG', tag: 'Building',
    desc: "A multi-agent system providing accessible legal guidance for those who can't afford a lawyer but deserve one. Uses extensive query refinement via a vector database for RAG, with multiple specialized agents that collaborate yet operate independently.",
    tech: ['Python', 'LangChain', 'Vector DB', 'Multi-Agent', 'LLM'],
    link: null, github: null, images: [], captions: [],
  },
  {
    id: 'feature-store', title: 'Feature Store with Time Travel', tag: 'Industry',
    desc: 'Built a centralized Feature Store using Apache Iceberg with time-travel capabilities, enabling data scientists across multiple teams to train, test, and deploy ML models from a single source of truth.',
    tech: ['Apache Iceberg', 'Spark', 'Python', 'ML Infra'],
    link: null, github: null, images: [], captions: [],
  },
  {
    id: 'sas-spark', title: 'SAS to Spark Migration', tag: 'Industry',
    desc: 'Migrated a legacy SAS analytics system to Apache Spark, cutting pipeline runtime from 6+ hours to under 50 minutes through intelligent partitioning, broadcast joins, caching strategies, and predicate pushdown optimizations.',
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
const ExtIcon = () => (<svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M1 13L13 1M13 1H5M13 1V9" /></svg>);
const GHIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>);
const MailIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 4L12 13L2 4" /></svg>);
const LIIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>);
const DownloadIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>);
const BriefcaseIcon = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /></svg>);

function tagClass(t) {
  if (t === 'Hackathon Winner') return 'tag-winner';
  if (t === 'Live') return 'tag-live';
  if (t === 'Building') return 'tag-building';
  return 'tag-industry';
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 20); window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h); }, []);

  return (
    <>
      <div className="grain" />

      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <a className="nav-logo" href="#top">Himanshu Pant</a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="nav-resume"><DownloadIcon /> Resume</a></li>
        </ul>
      </nav>

      <section className="hero" id="top">
        <div className="orb orb-a" /><div className="orb orb-b" />
        <Reveal><p className="hero-tag">Hey, I'm Himanshu</p></Reveal>
        <Reveal delay={0.08}><h1>I build things<br />that <em>scale.</em></h1></Reveal>
        <Reveal delay={0.16}>
          <p className="hero-sub">Software Engineer with 5+ years in data & backend engineering. Currently pursuing my M.S. in Software Engineering (AI Specialization) at Arizona State University — building systems that are fast, reliable, and intelligent.</p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">Get in Touch</a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-secondary"><DownloadIcon /> Resume</a>
          </div>
        </Reveal>
        <Reveal delay={0.3}>
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
              <p className="about-text">I care about clean architecture, thoughtful API design, and code the next person can maintain. Currently exploring the intersection of agentic AI and retrieval-augmented generation.</p>
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
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <div className="job-header">
                    <div>
                      <h3 className="job-title">{job.title}</h3>
                      <p className="job-company">{job.company}</p>
                    </div>
                    <div className="job-meta-right">
                      <span className="job-period">{job.period}</span>
                      <span className="job-domain"><BriefcaseIcon /> {job.domain}</span>
                    </div>
                  </div>
                  <p className="job-location">{job.location}</p>
                  <ul className="job-bullets">{job.bullets.map((b, j) => (<li key={j}>{b}</li>))}</ul>
                  {job.award && <p className="job-award">{job.award}</p>}
                  <div className="job-tech">{job.tech.map((t) => (<span key={t} className="pill">{t}</span>))}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Projects */}
      <div className="divider"><hr /></div>
      <section className="section" id="projects">
        <Reveal><p className="section-label">Projects</p><h2 className="section-title">Selected work.</h2></Reveal>
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
                  <div className="pills">{p.tech.map((t) => <span key={t} className="pill">{t}</span>)}</div>
                  <div className="card-links">
                    {p.github && (<a href={p.github} target="_blank" rel="noopener noreferrer"><GHIcon /> Code</a>)}
                    {p.link && (<a href={p.link} target="_blank" rel="noopener noreferrer"><ExtIcon /> Live</a>)}
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
        <Reveal><p className="section-label">Get in Touch</p><h2>Let's build something.</h2></Reveal>
        <Reveal delay={0.06}><p>I'm looking for SWE, Backend Engineering, and Data Engineering roles. If you're building something interesting, I'd love to hear about it.</p></Reveal>
        <Reveal delay={0.12}>
          <div className="cta-row">
            <a className="btn btn-primary" href="mailto:hpant.data@gmail.com"><MailIcon /> Say Hello</a>
            <a className="btn btn-secondary" href="https://www.linkedin.com/in/itshimanshup/" target="_blank" rel="noopener noreferrer"><LIIcon /> LinkedIn</a>
            <a className="btn btn-secondary" href="https://github.com/hpant5" target="_blank" rel="noopener noreferrer"><GHIcon /> GitHub</a>
            <a className="btn btn-secondary" href="/resume.pdf" target="_blank" rel="noopener noreferrer"><DownloadIcon /> Resume</a>
          </div>
        </Reveal>
      </section>

      <footer className="footer">© {new Date().getFullYear()} Himanshu Pant. Built with care.</footer>
    </>
  );
}
