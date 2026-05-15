'use client';

import { useState, useEffect } from 'react';
import { track } from '@vercel/analytics';
import Reveal from '@/components/Reveal';
import ProjectCarousel from '@/components/ProjectCarousel';
import ContactForm from '@/components/ContactForm';
import AnimatedRole from '@/components/AnimatedRole';

/* ══════════════════════════════════════════════ */

const EXPERIENCE = [
  {
    title: 'AI Engineer',
    company: 'MyEdMaster',
    companyNote: 'Industry Capstone Project (ASU SER517)',
    period: 'Jan 2026 – Apr 2026',
    location: 'Remote',
    domain: 'Legal Tech / AI',
    current: false,
    tech: ['Python', 'LangChain', 'LangGraph', 'Qdrant', 'FastAPI', 'Docker'],
    bullets: [
      'Developed multi-agent Stateful RAG system for personalized legal guidance using LangGraph with Qdrant vector DB, achieving sub-2s query latency across 10K+ documents and 95% relevance accuracy',
      'Built FastAPI + Node.js backend with Docker supporting 100+ concurrent sessions with sub-200ms response time through optimized vector retrieval',
    ],
  },
  {
    title: 'Data Engineer II',
    company: 'EXL Services',
    period: 'Jul 2023 – Mar 2024',
    location: 'Gurugram, India · Remote',
    domain: 'Insurance',
    tech: ['PySpark', 'AWS Glue', 'MWAA', 'Snowflake', 'S3', 'Great Expectations', 'CloudWatch'],
    bullets: [
      'Drove 40% BI query performance improvement by architecting S3 data lake and Snowflake warehouse across 8 datasets supporting 500K+ daily users processing high-frequency insurance claim events',
      'Eliminated 90-minute production bottleneck by optimizing PySpark ETL pipelines on AWS Glue/MWAA processing 100M records/batch, achieving 66% runtime reduction via partition pruning and Spark query optimization',
      'Built production anomaly detection layer using Great Expectations across 15+ data sources with CloudWatch monitoring and MWAA retries, maintaining 100% SLAs',
    ],
  },
  {
    title: 'Data Engineer',
    company: 'Super Six Sports Gaming',
    period: 'Aug 2022 – Jul 2023',
    location: 'Gurugram, India · On-site',
    domain: 'Sports Analytics',
    tech: ['Python', 'PySpark', 'SQL', 'MongoDB', 'Scikit-Learn', 'REST APIs'],
    bullets: [
      'Reduced user churn 20% by building production ML retention pipeline with 78% accuracy using Scikit-Learn and statistical modeling that identified behavioral anomalies in time-series user activity data, deployed automated Python/SQL re-engagement campaigns',
      'Built and owned core data ingestion layer — multi-source batch ETL pipelines ingesting from 10+ REST APIs and S3 using cloud data solutions, loading 500K+ daily records of football, soccer, and basketball data into MongoDB with sub-hourly refresh cadence, enabling near-real-time analytics for product and marketing teams with 99.9% data accuracy via cross-source validation and data profiling',
      'Engineered ML feature pipelines with SCD Type 1/2 dimensional modeling and automated feature engineering, reducing ML experiment cycle time 35% through optimized time-series data storage patterns',
    ],
  },
  {
    title: 'Associate Data Engineer',
    company: 'Futurense Technologies',
    period: 'Oct 2021 – Jul 2022',
    location: 'Bangalore, India · Remote',
    domain: 'Healthcare',
    tech: ['Azure Databricks', 'Apache Spark', 'PySpark', 'AWS Athena', 'Python', 'SQL'],
    bullets: [
      'Spearheaded migration of 1 Billion+ record oncology pipelines from legacy SAS to Apache Spark on Azure Databricks, achieving 86% reduction in batch processing time from 6+ hours to 50 minutes through broadcast joins and strategic partitioning',
      'Automated bi-weekly HCP targeting reports by building Python ETL pipeline querying AWS Athena, reducing manual effort from 4–5 hours to 15 minutes, delivering 95% time savings',
      'Delivered 99.5% data accuracy post-migration via comprehensive PySpark and SQL validation frameworks with statistical reconciliation',
    ],
  },
  {
    title: 'Data Analyst',
    company: 'Koron Projects Limited',
    period: 'Oct 2018 – Jul 2021',
    location: 'Gurugram, India · On-site',
    domain: 'Construction & Infrastructure',
    tech: ['Power BI', 'SQL Server', 'Oracle', 'MySQL', 'Python', 'Excel'],
    bullets: [
      'Built and maintained 15 Power BI dashboards with advanced analytics for executive leadership tracking project costs, timelines, and profitability across $50M+ in annual construction projects',
      'Consolidated cost data from multiple enterprise sources including SQL Server, Oracle, and MySQL via SQL queries and stored procedures, automating monthly executive reporting and reducing manual effort by 20 hours/month',
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

const CERTIFICATIONS = [
  {
    title: 'AWS Certified Data Engineer – Associate',
    issuer: 'Amazon Web Services',
    code: 'DEA-C01',
    badge: '/images/aws-cert.png',
    verify: 'https://www.credly.com/badges/c5b61c24-e142-4d60-9c4d-238719926f2a/linked_in_profile',
    desc: 'Validated expertise in designing, building, and maintaining data pipelines using AWS services including Glue, EMR, Redshift, Kinesis, and implementing data quality frameworks at scale.'
  },
  {
    title: 'Microsoft Certified: Fabric Analytics Engineer Associate',
    issuer: 'Microsoft',
    code: 'DP-700',
    badge: '/images/ms-cert.png',
    verify: 'https://learn.microsoft.com/en-us/users/himanshupant-1290/credentials/ed9a3de2acc4b9c6?ref=https%3A%2F%2Fwww.linkedin.com%2F',
    desc: 'Certified in Microsoft Fabric analytics engineering, data warehousing, data modeling, and implementing end-to-end analytics solutions on Azure cloud platform.'
  }
];

const ACHIEVEMENTS = [
  { icon: '🏆', title: 'DEVHACKS 2026 — 1st Place', desc: 'Won Track 1 with MeetFlow — intelligent task orchestration converting meeting transcripts into capacity-aware ticket assignments using LLM-powered analysis, competing against 100+ teams.' },
  { icon: '☁️', title: 'AWS Certified Data Engineer Associate', desc: 'Passed DEA-C01 (May 2026) — validated expertise in data pipeline design, ETL optimization, AWS Glue/EMR/Redshift, and implementing data quality frameworks at scale.' },
  { icon: '📊', title: 'Microsoft Certified: Fabric Analytics Engineer', desc: 'Passed DP-700 (May 2026) — validated expertise in Microsoft Fabric analytics engineering, data warehousing, and cloud data solutions.' },
  { icon: '🏆', title: 'HackASU — FairCharge', desc: 'Built a medical bill audit pipeline at HackASU that uses Claude Vision + SapBERT to detect overcharges, flagging $1,300+ in average billing errors per hospital bill.' },
  { icon: '🏅', title: 'SPOT Award — Exceptional Delivery', desc: 'Recognized at Super Six Sports Gaming for exceptional delivery and cross-team collaboration on critical product features.' },
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
              <h1 className="hero-name">Himanshu Pant</h1>
              <p className="hero-tag">AWS & Microsoft Certified Data Engineer</p>
              <h2 className="hero-headline">I build things that <em>scale.</em></h2>
              <AnimatedRole />
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="hero-sub">Data Engineer specializing in large-scale ETL/ELT pipelines, real-time data infrastructure, and AI/ML systems. Built production platforms processing 100M-1B records with 66-86% performance improvements across insurance, sports analytics, and healthcare domains.</p>
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
              <p className="about-text">Data Engineer with expertise in large-scale data infrastructure, real-time processing, and AI/ML systems. I've migrated 1B+ records to distributed architectures, eliminated 90-minute production bottlenecks, and built real-time pipelines handling 500K+ daily events with 99.9% accuracy.</p>
              <p className="about-text">Track record of rapid impact across insurance, sports analytics, and healthcare — promoted within 6 months at Super Six and received SPOT Recognition Award for delivering critical data infrastructure under tight deadlines.</p>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="domains">{DOMAINS.map((d) => (<span key={d.name} className="domain-chip">{d.icon} {d.name}</span>))}</div>
            </Reveal>
          </div>
          <div className="stats">
            <Reveal delay={0.1}><div className="stat"><div className="stat-num">100M-1B</div><div className="stat-label">Records Processed</div></div></Reveal>
            <Reveal delay={0.14}><div className="stat"><div className="stat-num">M.S.</div><div className="stat-label">Software Engineering (AI Specialization) — Arizona State University</div></div></Reveal>
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

      {/* Certifications */}
      <div className="divider"><hr /></div>
      <section className="section" id="certifications">
        <Reveal><p className="section-label">Certifications</p><h2 className="section-title">Industry Credentials.</h2></Reveal>
        <div className="certs-grid">
          {CERTIFICATIONS.map((cert, i) => (
            <Reveal key={cert.title} delay={i * 0.1}>
              <a href={cert.verify} target="_blank" rel="noopener noreferrer" className="cert-card">
                <div className="cert-badge-container">
                  <img src={cert.badge} alt={`${cert.title} badge`} className="cert-badge" onError={(e) => { e.target.style.display = 'none'; }} />
                </div>
                <div className="cert-content">
                  <h4 className="cert-title">{cert.title}</h4>
                  <p className="cert-meta">{cert.issuer} • {cert.code}</p>
                  <p className="cert-desc">{cert.desc}</p>
                </div>
              </a>
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
              <p className="about-text">Open to Data Engineer, ML Engineer, and Backend Engineer roles focused on large-scale data infrastructure, real-time systems, and AI/ML platforms. Willing to relocate anywhere in the US for the right opportunity.</p>
              <div className="contact-links-list">
                <a href="mailto:hpant.data@gmail.com" className="contact-link-item"><MailIcon /> hpant.data@gmail.com</a>
                <a href="https://www.linkedin.com/in/himanshupant-de/" target="_blank" rel="noopener noreferrer" className="contact-link-item"><LIIcon /> linkedin.com/in/himanshupant-de</a>
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