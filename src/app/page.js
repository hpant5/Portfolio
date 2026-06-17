'use client';

import { useState, useEffect } from 'react';
import Reveal from '@/components/Reveal';
import ProjectCarousel from '@/components/ProjectCarousel';
import ContactForm from '@/components/ContactForm';
import AnimatedRole from '@/components/AnimatedRole';

const EXPERIENCE = [
  {
    title: 'AI / Data Engineer (Industry Capstone)',
    company: 'MyEdMaster',
    period: 'Jan 2026 - Apr 2026',
    location: 'Tempe, AZ',
    tech: ['Python', 'LangGraph', 'Qdrant', 'FastAPI', 'Node.js', 'Docker'],
    bullets: [
      'Built a stateful, multi-agent RAG system using LangGraph and a Qdrant vector DB, achieving sub-2s query latency across 10K+ documents',
      'Engineered a FastAPI + Node.js backend (Dockerized) with an optimized 5-node retrieval pipeline',
      'Authored the QnA service evaluation framework, debugged the agentic graph execution layer, and shipped layered technical documentation adopted by the partner team',
    ],
  },
  {
    title: 'Consultant II, Data Engineering',
    company: 'EXL Services',
    period: 'Jul 2023 - Mar 2024',
    location: 'Gurugram, India',
    companyNote: 'Delivered across two client engagements: a major US auto insurer and a global toy manufacturer.',
    tech: ['PySpark', 'AWS Glue', 'MWAA', 'Snowflake', 'S3', 'dbt', 'Great Expectations', 'Terraform', 'Jenkins'],
    bullets: [
      'Eliminated a 90-minute production bottleneck by optimizing PySpark ETL on AWS Glue/MWAA processing 100M+ records per batch, cutting runtimes 66% via partition pruning and predicate pushdown',
      'Architected an S3 data lake and Snowflake warehouse with a Great Expectations data-quality framework across 15+ sources, maintaining 100% SLA compliance; automated delivery via Jenkins CI/CD and Terraform IaC',
      'Architected end-to-end ETL integrating ADLS, SharePoint, APIs, and flat files into structured mart layers using advanced dbt (Jinja macros, snapshots for SCD, incremental models) with custom data-quality checks',
      'Built dbt documentation with column-level lineage and added vacuum/optimization hooks reducing data-processing time; mentored 2 junior engineers',
    ],
  },
  {
    title: 'Data Engineer',
    company: 'Super Six Sports Gaming',
    period: 'Aug 2022 - Jul 2023',
    location: 'Gurugram, India',
    companyNote: 'Promoted within 6 months based on performance.',
    tech: ['Python', 'SQL', 'PySpark', 'MongoDB', 'S3', 'REST APIs', 'Scikit-Learn'],
    bullets: [
      'Built and owned the core data ingestion layer: multi-source batch ETL from 10+ REST APIs and S3, loading 500K+ daily records of sports-event data into MongoDB',
      'Reduced user churn 20% by building a production ML retention pipeline (78% accuracy, validated against a control group) that detected behavioral anomalies in time-series user activity and triggered automated Python/SQL workflows',
      'Added automated validation and redundancy checks that eliminated data-integrity errors in routine spot checks',
      'Engineered ML feature pipelines with SCD Type 1/2 dimensional modeling, significantly reducing experiment cycle time through automation',
    ],
  },
  {
    title: 'Associate Data Engineer',
    company: 'Futurense Technologies',
    period: 'Oct 2021 - Jul 2022',
    location: 'Bangalore, India',
    tech: ['Apache Spark', 'Azure Databricks', 'PySpark', 'Python', 'SQL', 'AWS Athena'],
    bullets: [
      'Spearheaded migration of 1B+ insurance claims pipelines from legacy SAS (manual proc-SQL batches) to Apache Spark on Azure Databricks, cutting batch time from 6+ hours to 50 minutes via broadcast joins and partitioning',
      'Automated previously manual recurring HCP-targeting reports with a Python ETL layer on AWS Athena',
      'Validated migration with comprehensive PySpark + SQL reconciliation frameworks; zero data-integrity issues reported post-migration',
    ],
  },
  {
    title: 'Data Analyst',
    company: 'Koron Projects Limited',
    period: 'Oct 2018 - Jul 2021',
    location: 'New Delhi, India',
    tech: ['Power BI', 'SQL Server', 'Oracle', 'MySQL', 'SQL'],
    bullets: [
      'Built 15 Power BI dashboards with advanced analytics for executive leadership tracking project costs, timelines, and profitability across $50M+ in annual construction projects',
      'Consolidated cost data from SQL Server, Oracle, and MySQL via SQL and stored procedures, removing 20 hours/month of manual effort',
    ],
  },
];

const TECH_STACK = {
  Languages: ['Python', 'SQL', 'JavaScript', 'PySpark'],
  'Data & ML': ['Apache Spark', 'Databricks', 'Airflow', 'LangGraph', 'Snowflake', 'dbt', 'Great Expectations'],
  'Cloud & Infra': ['AWS (EMR, S3, Lambda, SQS, ECR)', 'Azure', 'Docker', 'Jenkins', 'CI/CD'],
  Frontend: ['React', 'Next.js', 'Node.js', 'HTML/CSS'],
  Databases: ['PostgreSQL', 'SQL Server', 'Oracle', 'NoSQL', 'Vector DBs'],
  Tools: ['Git', 'Power BI', 'Streamlit', 'Jira'],
};

const CERTIFICATIONS = [
  {
    title: 'AWS Certified Data Engineer - Associate',
    issuer: 'Amazon Web Services',
    code: 'DEA-C01',
    badge: '/images/aws-cert.png',
    verify: 'https://www.credly.com/badges/c5b61c24-e142-4d60-9c4d-238719926f2a/linked_in_profile',
    desc: 'Validated expertise in designing, building, and maintaining data pipelines using AWS services including Glue, EMR, Redshift, Kinesis, and implementing data quality frameworks at scale.',
  },
  {
    title: 'Microsoft Certified: Fabric Data Engineer Associate',
    issuer: 'Microsoft',
    code: 'DP-700',
    badge: '/images/ms-cert.png',
    verify: 'https://learn.microsoft.com/en-us/users/himanshupant-1290/credentials/ed9a3de2acc4b9c6?ref=https%3A%2F%2Fwww.linkedin.com%2F',
    desc: 'Certified in Microsoft Fabric data engineering, data warehousing, modeling, and implementing end-to-end analytics solutions on the Azure platform.',
  },
];

const ACHIEVEMENTS = [
  {
    icon: '🏆',
    title: 'DEVHACKS 2026 - 1st Place',
    desc: 'Won Track 1 with MeetFlow - intelligent task orchestration converting meeting transcripts into capacity-aware ticket assignments using LLM-powered analysis, competing against 100+ teams.',
  },
  {
    icon: '☁️',
    title: 'AWS Certified Data Engineer Associate',
    desc: 'Passed DEA-C01 (May 2026) - validated expertise in data pipeline design, ETL optimization, AWS Glue/EMR/Redshift, and implementing data quality frameworks at scale.',
  },
  {
    icon: '📊',
    title: 'Microsoft Certified: Fabric Data Engineer Associate',
    desc: 'Passed DP-700 (May 2026) - validated expertise in Microsoft Fabric data engineering, data warehousing, and cloud data solutions.',
  },
  {
    icon: '🏆',
    title: 'HackASU - FairCharge',
    desc: 'Built a medical-bill audit pipeline at HackASU that uses Claude Vision to detect overcharges and billing violations - targeting the kind of errors that average $1,300+ per hospital bill across the industry.',
  },
  {
    icon: '🏅',
    title: 'SPOT Award - Exceptional Delivery',
    desc: 'Recognized at Super Six Sports Gaming for exceptional delivery and cross-team collaboration on critical product features.',
  },
];

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
    id: 'trustseal',
    title: 'TrustSeal',
    tag: 'Hackathon',
    highlight: true,
    role: 'VillageHacks 2026 | Notary Everyday Track',
    desc: 'A multi-provider AI pipeline that verifies identity documents against the AAMVA 2020 standard, replacing manual ID inspection with a scored, auditable report. Claude-based agents independently analyze the document, a local PDF417 decode acts as ground truth, and a judge agent resolves conflicts before generating an APPROVE / REVIEW / REJECT recommendation.',
    tech: ['Python', 'Anthropic Claude', 'Multi-Agent', 'PDF417', 'FastAPI', 'Document Verification'],
    link: null,
    github: 'https://github.com/hpant5/trustseal',
    images: [],
    captions: [],
  },
  {
    id: 'faircharge',
    title: 'FairCharge',
    tag: 'Hackathon',
    highlight: true,
    role: 'Solo builder | HackASU Claude AI Builder Hackathon',
    desc: 'A medical-bill audit pipeline that reads your bill, identifies every charge, benchmarks against CMS Medicare pricing data for your state, detects overcharges and billing violations, and generates a ready-to-send dispute letter. Built to target the kind of errors that average $1,300+ per hospital bill across the industry.',
    tech: ['Python', 'Claude Vision', 'SapBERT', 'ChromaDB', 'SQLite', 'Streamlit', 'CMS Data'],
    link: null,
    github: 'https://github.com/hpant5/Fair_charge',
    images: ['/images/Faircharge1.webp', '/images/Faircharge2.webp', '/images/Faircharge3.webp'],
    captions: ['Bill Upload & Analysis', 'Pricing Benchmark & Discrepancies', 'Generated Dispute Letter'],
  },
  {
    id: 'makelifeeasy',
    title: 'MakeLifeEasy',
    tag: 'Hackathon',
    highlight: true,
    role: 'LA Hacks 2026 | with Hemakshi Pandey',
    desc: 'An AI assistant that executes real actions across Gmail, Calendar, Notion, Jira, and GitHub through a single plain-English conversation. It routes intent through a LangGraph workflow to pull data in parallel and take real actions like moving calendar events, sending emails, creating tasks, and prioritizing work.',
    tech: ['Python', 'LangGraph', 'Fetch.ai', 'Multi-Agent', 'API Integration'],
    link: null,
    github: 'https://github.com/hema8Codes/LAHacks_2026_UCLA_MakeLifeEasy',
    images: [],
    captions: [],
  },
  {
    id: 'face-recognition',
    title: 'Serverless Face Recognition',
    tag: 'Academic',
    desc: 'A serverless, multistage face recognition system using edge computing. IoT clients send video frames processed through decoupled detection and recognition stages via event-driven architecture - scalable, real-time identification without persistent servers.',
    tech: ['AWS Lambda', 'SQS', 'ECR', 'Docker', 'PyTorch', 'OpenCV', 'Edge Computing'],
    link: null,
    github: null,
    images: [],
    captions: [],
  },
  {
    id: 'lifesync',
    title: 'LifeSync',
    tag: 'Live',
    desc: 'Full-stack productivity platform with Google OAuth, Focus Score tracking, daily task management, Pomodoro timer, and motivational micro-challenges.',
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
    desc: 'A developer wellness app with mixable ambient soundscapes, 10+ casual mini-games, and a calming UI - because even builders need a break.',
    tech: ['React', 'JavaScript', 'Web Audio API', 'CSS Animations'],
    link: 'https://www.pausebutton.dev/',
    github: null,
    images: ['/images/pause-sounds.webp', '/images/pause-games.webp'],
    captions: ['Nature Sounds Mixer', 'Casual Mini-Games'],
  },
  {
    id: 'feature-store',
    title: 'Feature Store with Time Travel',
    tag: 'Industry',
    desc: 'Centralized feature store using Apache Iceberg with time-travel, enabling ML teams to train, test, and deploy from a single source of truth.',
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
    desc: 'Migrated 50 legacy SAS workflows to Spark, cutting runtime from 6+ hours to under 50 minutes via partitioning, broadcast joins, and caching.',
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

const GHIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="grain" />

      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <a className="nav-logo" href="#top">
          HP
        </a>
        <ul className="nav-links">
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#experience">Experience</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>

      <section className="hero" id="top">
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <Reveal>
          <div className="hero-top">
            <img src="/images/profile.webp" alt="Himanshu Pant" className="hero-photo" />
            <div className="hero-text">
              <h1 className="hero-name">Himanshu Pant</h1>
              <p className="hero-tag">AWS & Microsoft Certified Data Engineer</p>
              <h2 className="hero-headline">
                I build things that <em>scale.</em>
              </h2>
              <AnimatedRole />
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="hero-sub">
            Data Engineer specializing in large-scale ETL/ELT pipelines, cloud data infrastructure, and AI/ML systems. Built production workloads spanning 100M-record batches and 1B+ insurance claims, with measured 66-86% performance improvements across insurance, sports analytics, and healthcare.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">
              Get in Touch
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.26}>
          <div className="hero-meta">
            <span className="meta-item">
              <span className="pulse" /> Open to opportunities
            </span>
            <span className="meta-item">Tempe, AZ</span>
            <span className="meta-item">himanshupant.dev</span>
          </div>
        </Reveal>
      </section>

      <div className="divider">
        <hr />
      </div>

      <section className="section" id="about">
        <Reveal>
          <p className="section-label">About</p>
          <h2 className="section-title">Engineer at heart.</h2>
        </Reveal>
        <div className="about-grid">
          <div>
            <Reveal delay={0.08}>
              <p className="about-text">
                Data Engineer with expertise in large-scale data infrastructure, real-time processing, and AI/ML systems. I&apos;ve migrated 1B+ insurance claims to distributed cloud architectures, eliminated a 90-minute production bottleneck, and built ML retention pipelines that cut churn 20%.
              </p>
              <p className="about-text">
                Track record of rapid impact across insurance, sports analytics, and healthcare - promoted within 6 months at Super Six Sports Gaming and awarded the SPOT Recognition Award for delivering critical data infrastructure under tight deadlines.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="domains">
                {DOMAINS.map((domain) => (
                  <span key={domain.name} className="domain-chip">
                    {domain.icon} {domain.name}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
          <div className="stats">
            <Reveal delay={0.1}>
              <div className="stat">
                <div className="stat-num">100M-1B</div>
                <div className="stat-label">Claims / Records Processed</div>
              </div>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="stat">
                <div className="stat-num">M.S.</div>
                <div className="stat-label">Software Engineering (AI Specialization) - Arizona State University</div>
              </div>
            </Reveal>
          </div>
        </div>
        <Reveal delay={0.1}>
          <h3 className="subsection-title">Tech I work with</h3>
        </Reveal>
        <div className="tech-grid">
          {Object.entries(TECH_STACK).map(([category, items], index) => (
            <Reveal key={category} delay={0.06 * index}>
              <div className="tech-category">
                <span className="tech-cat-label">{category}</span>
                <div className="tech-items">
                  {items.map((item) => (
                    <span key={item} className="tech-item">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="divider">
        <hr />
      </div>

      <section className="section" id="achievements">
        <Reveal>
          <p className="section-label">Achievements</p>
          <h2 className="section-title">Highlights.</h2>
        </Reveal>
        <div className="achievements-grid">
          {ACHIEVEMENTS.map((achievement, index) => (
            <Reveal key={achievement.title} delay={index * 0.08}>
              <div className="achievement">
                <span className="achievement-icon">{achievement.icon}</span>
                <div>
                  <h4 className="achievement-title">{achievement.title}</h4>
                  <p className="achievement-desc">{achievement.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="divider">
        <hr />
      </div>

      <section className="section" id="certifications">
        <Reveal>
          <p className="section-label">Certifications</p>
          <h2 className="section-title">Industry Credentials.</h2>
        </Reveal>
        <div className="certs-grid">
          {CERTIFICATIONS.map((certification, index) => (
            <Reveal key={certification.title} delay={index * 0.1}>
              <a href={certification.verify} target="_blank" rel="noopener noreferrer" className="cert-card">
                <div className="cert-badge-container">
                  <img
                    src={certification.badge}
                    alt={`${certification.title} badge`}
                    className="cert-badge"
                    onError={(event) => {
                      event.target.style.display = 'none';
                    }}
                  />
                </div>
                <div className="cert-content">
                  <h4 className="cert-title">{certification.title}</h4>
                  <p className="cert-meta">
                    {certification.issuer} • {certification.code}
                  </p>
                  <p className="cert-desc">{certification.desc}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="divider">
        <hr />
      </div>

      <section className="section" id="experience">
        <Reveal>
          <p className="section-label">Experience</p>
          <h2 className="section-title">Where I&apos;ve worked.</h2>
        </Reveal>
        <div className="timeline">
          {EXPERIENCE.map((job, index) => (
            <Reveal key={`${job.company}-${job.period}`} delay={index * 0.08}>
              <div className="timeline-item">
                <div className="timeline-content">
                  <div className="timeline-header">
                    <div>
                      <h3 className="timeline-company">{job.company}</h3>
                      <p className="timeline-role">{job.title}</p>
                    </div>
                    <span className="timeline-date">{job.period}</span>
                  </div>
                  {job.companyNote && <p className="job-note">{job.companyNote}</p>}
                  <p className="job-location">{job.location}</p>
                  <div className="timeline-desc">
                    <ul className="job-bullets">
                      {job.bullets.map((bullet, bulletIndex) => (
                        <li key={bulletIndex}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="job-tech">
                    {job.tech.map((tech) => (
                      <span key={tech} className="pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="divider">
        <hr />
      </div>

      <section className="section section-wide" id="projects">
        <Reveal>
          <p className="section-label">Projects</p>
          <h2 className="section-title">Selected work.</h2>
        </Reveal>
        <ProjectCarousel projects={PROJECTS} />
      </section>

      <div className="divider">
        <hr />
      </div>

      <section className="section" id="contact">
        <Reveal>
          <p className="section-label">Get in Touch</p>
          <h2 className="section-title">Let&apos;s build something.</h2>
        </Reveal>
        <div className="contact-grid">
          <Reveal delay={0.06}>
            <div className="contact-info">
              <p className="about-text">
                Open to Data Engineer, ML Engineer, and Backend Engineer roles focused on large-scale data infrastructure, real-time systems, and AI/ML platforms. Willing to relocate anywhere in the US for the right opportunity.
              </p>
              <div className="contact-links-list">
                <a href="mailto:hpant.data@gmail.com" className="contact-link-item">
                  <MailIcon /> hpant.data@gmail.com
                </a>
                <a href="https://www.linkedin.com/in/himanshupant-de/" target="_blank" rel="noopener noreferrer" className="contact-link-item">
                  <LIIcon /> linkedin.com/in/himanshupant-de
                </a>
                <a href="https://github.com/hpant5" target="_blank" rel="noopener noreferrer" className="contact-link-item">
                  <GHIcon /> github.com/hpant5
                </a>
              </div>
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
