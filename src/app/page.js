// himanshupant.dev — single page.
// Server component on purpose: no 'use client', no observers, no timers.
// Everything is readable the moment the HTML lands.

const MEASURES = [
  {
    what: 'Legacy SAS batch, migrated to Spark on Azure Databricks',
    src: 'Futurense · partitioning, file sizing, broadcast joins',
    was: '6 hrs',
    now: '50 min',
  },
  {
    what: 'PySpark pipeline missing its daily SLA, profiled rather than guessed at',
    src: 'EXL · one 90-minute bottleneck in a 100M+ record run',
    was: 'baseline',
    now: '−66%',
  },
  {
    what: 'Model features served from a Kafka and Iceberg feature store',
    src: 'EXL · continuous instead of nightly, wired into SageMaker',
    was: 'nightly',
    now: '−58% cycle',
  },
  {
    what: 'Migration correctness, certified by a reconciliation framework I built',
    src: 'Futurense · every failed record investigated, none dropped silently',
    now: '99.5%',
  },
  {
    what: 'Ten-plus third-party feeds that disagreed, reconciled under live load',
    src: 'Super Six · cross-source validation, errors visible to users in minutes',
    now: '99.9%',
  },
  {
    what: 'User churn, against a randomly assigned holdout control group',
    src: 'Super Six · behavioural model at 78% accuracy',
    was: 'baseline',
    now: '−20%',
  },
  {
    what: 'Per-query LLM inference cost, after tracing where spend concentrated',
    src: 'MyEdmaster · complexity-based model routing',
    was: '$0.024',
    now: '$0.0044',
  },
  {
    what: 'Manual executive reporting, replaced with scheduled SQL and shell',
    src: 'Koron · $50M portfolio, 50+ sites',
    now: '20 hrs/mo saved',
  },
];

const JOBS = [
  {
    company: 'EXL Services',
    badge: null,
    title: 'Consultant II, Data Engineering',
    when: 'Jul 2023 – Mar 2024',
    where: 'Boston, MA (Remote)',
    ctx: 'Delivered to banking and insurance clients, working on fraud and risk data.',
    points: [
      'Owned the lakehouse behind products serving 500K+ users: S3 and Apache Iceberg ingestion, a <b>dbt</b> transformation layer, and curated <b>Snowflake</b> tables analysts queried directly. Made the table layout and partitioning calls that set read throughput.',
      "Cut a <b>100M+ record PySpark pipeline's runtime 66%</b> on AWS Glue and EMR by profiling real execution to find a single 90-minute bottleneck, rather than guessing at it.",
      'Built a <b>Kafka and Spark Structured Streaming feature store</b> on Iceberg feeding SageMaker, serving features continuously instead of nightly and cutting model deployment cycles 58%.',
      'Carried production ownership: Terraform with IAM and encryption controls, pytest-driven Jenkins CI/CD, CloudWatch alerting, and the on-call pager.',
      'Led design and code reviews for the pod, ran daily Scrum, mentored two junior engineers.',
    ],
  },
  {
    company: 'Super Six Sports Gaming',
    badge: 'Promoted in 6 months',
    title: 'Data Engineer',
    when: 'Aug 2022 – Jul 2023',
    where: 'Gurugram, India',
    ctx: 'Only data engineer on the product. No existing pipeline, no playbook, nobody to escalate to.',
    points: [
      'Designed the <b>MySQL schema and complete data model from scratch</b>, fact and dimension tables included, then ran every implementation from requirements through production and on-call.',
      'Built ingestion across <b>10+ third-party feeds</b> on sub-hourly refresh and held it to 99.9% accuracy through cross-source validation, during live events where a wrong number was visible to users within minutes.',
      'Adjudicated source conflicts in real time: traced discrepancies back to the originating vendor, decided which feed to trust when two diverged mid-event, and drove the fix with that vendor.',
      'Shipped a production retention model on behavioural event data at 78% accuracy, cutting churn 20% against a randomly assigned holdout control group.',
    ],
  },
  {
    company: 'Futurense Technologies',
    badge: null,
    title: 'Data Engineer',
    when: 'Oct 2021 – Jul 2022',
    where: 'Bangalore, India',
    ctx: 'Client engagement in healthcare. Client-facing on scoping and status.',
    points: [
      'Co-led migration of <b>1B+ health insurance claims</b> off a legacy SAS platform onto Spark on <b>Azure Databricks</b>, building the claims history into per-patient treatment timelines so clinicians could see where a patient actually stood.',
      'Compressed batch execution <b>from six hours to fifty minutes</b> through partitioning scheme, file sizing and join strategy, so the new platform was measurably faster than the one it replaced rather than just newer.',
      'Built the SQL validation, profiling and <b>reconciliation framework that certified the cutover at 99.5%</b>, with explicit exception handling so every failed record was investigated instead of quietly dropped.',
      'Automated recurring Python processing against AWS Athena, removing 80% of the manual effort.',
    ],
  },
  {
    company: 'Koron Projects Limited',
    badge: null,
    title: 'Executive Analyst, Data and Reporting',
    when: 'Oct 2018 – Jul 2021',
    where: 'Gurugram, India',
    ctx: 'Three years inside the legacy stack.',
    points: [
      'Wrote <b>PL/SQL stored procedures, packages and cursor-based routines</b> across Oracle, MS SQL Server and MySQL, and tuned the long-running ones to stay inside their processing windows as volume grew across 50+ sites.',
      'Consolidated three disconnected source systems into one reporting model spanning a <b>$50M portfolio</b>.',
      'Replaced manual executive reporting with scheduled SQL workflows, saving 20 hours a month, and maintained 15+ operational dashboards for leadership.',
    ],
  },
];

const PROJECTS = [
  {
    name: 'MeetFlow',
    tag: '1st place · DEVHACKS 2026',
    win: true,
    wide: true,
    body: 'Multi-agent orchestration on LangGraph that turns meeting transcripts into assigned, capacity-aware tickets. Analyses the transcript, checks team load, recommends reassignment for overloaded people, and notifies via Slack. Competed against 100+ teams.',
    tech: 'LangGraph · Python · Taiga API · Slack · Streamlit',
  },
  {
    name: 'FairCharge',
    tag: 'Solo build',
    body: "A medical bill audit pipeline on the Claude API. Reads the bill, itemises every charge, benchmarks against CMS Medicare pricing for the patient's state, flags overcharges, and drafts the dispute letter. Built because an AI pipeline's output is only worth what you can check it against.",
    tech: 'Claude Vision · SapBERT · ChromaDB · CMS data',
  },
  {
    name: 'TrustSeal',
    tag: 'VillageHacks 2026',
    body: 'Multi-provider identity document verification against the AAMVA 2020 standard. Claude agents analyse the document independently, a local PDF417 decode acts as ground truth, and a judge agent resolves conflicts into an approve, review or reject recommendation.',
    tech: 'Anthropic Claude · Multi-agent · PDF417 · FastAPI',
  },
  {
    name: 'Serverless Inference Platform',
    tag: 'Academic',
    body: "Multi-stage inference on Lambda, SQS and ECR with containerised PyTorch models. Asynchronous request and response queues decouple the stages, so a slow recognition step can't back-pressure ingestion when frame volume spikes.",
    tech: 'AWS Lambda · SQS · ECR · Docker · PyTorch',
  },
  {
    name: 'MyEdmaster',
    tag: 'ASU capstone',
    body: 'A stateful multi-agent RAG platform on Django and LangGraph, 5,000 documents into 200K+ embeddings in Qdrant at sub-two-second query latency. Cut per-query cost 82% by tracing execution to find where spend concentrated, then routing by complexity.',
    tech: 'LangGraph · Qdrant · FastAPI · LangSmith · Kubernetes',
  },
];

const STACK = [
  ['Core', '<b>Python</b>, <b>SQL</b>, PySpark, shell, Java'],
  ['Processing', '<b>Apache Spark</b>, Spark Structured Streaming, <b>Databricks</b>, Apache Kafka, AWS Glue, EMR'],
  ['Warehouse &amp; lake', '<b>Snowflake</b>, <b>dbt</b>, Apache Iceberg, S3 data lakes, dimensional modelling, partitioning and query tuning'],
  ['Orchestration', '<b>Apache Airflow</b> and AWS MWAA, Jenkins CI/CD, pytest, Git'],
  ['Databases', '<b>Oracle PL/SQL</b>, MS SQL Server, PostgreSQL, MySQL, MongoDB'],
  ['Cloud &amp; infra', 'AWS (S3, Lambda, SQS, ECR, Athena, RDS, SageMaker, IAM, CloudWatch), Azure, <b>Terraform</b>, Docker, Kubernetes'],
  ['Data quality', 'Validation and <b>reconciliation frameworks</b>, Great Expectations, profiling, monitoring and alerting, incident triage'],
  ['AI', '<b>LangGraph</b>, LangChain, Anthropic Claude API, RAG and embeddings (Qdrant, pgvector), LangSmith, Claude Code and Cursor'],
];

const CREDS = [
  ['AWS Certified Data Engineer', 'Associate · DEA-C01 · May 2026'],
  ['Microsoft Certified: Fabric Analytics Engineer', 'Associate · DP-700 · May 2026'],
  ['Databricks Certified', 'Generative AI & Lakehouse'],
  ['SPOT Award, Exceptional Delivery', 'Super Six Sports Gaming'],
];

export default function Home() {
  return (
    <main className="wrap">

      <header className="hero">
        <h1 className="hero-name">Himanshu Pant</h1>
        <p className="hero-role">Data Engineer &middot; Tempe, AZ</p>
        <p className="hero-claim">
          I build the pipelines underneath things, and I can <em>prove the data is right</em> when I&apos;m done.
        </p>

        <div className="figs">
          <div className="fig">
            <b>1B+</b>
            <span>records migrated off a legacy platform, certified at 99.5%</span>
          </div>
          <div className="fig">
            <b>86%</b>
            <span>batch runtime cut on that migration, six hours to fifty minutes</span>
          </div>
          <div className="fig">
            <b>5+ yrs</b>
            <span>production data engineering across insurance, banking, healthcare and sports</span>
          </div>
        </div>

        <p className="meta">
          <span className="avail"><i className="pip" />Open to Data Engineer roles</span>
          <a href="mailto:hpant.data@gmail.com">hpant.data@gmail.com</a>
          <a href="https://linkedin.com/in/himanshupant-de">LinkedIn</a>
          <a href="https://github.com/hpant5">GitHub</a>
        </p>
      </header>

      <section className="sect" id="about">
        <p className="lab">What I do</p>
        <h2>Messy sources in, trusted data out.</h2>
        <p className="lede">
          Five years building batch and streaming pipelines on Spark, Databricks, Snowflake and AWS. The part
          I&apos;m actually known for is the unglamorous half: reconciling sources that disagree with each other,
          and building the validation frameworks that let someone sign off on a number. I&apos;ve been the only
          data engineer on a product, and I&apos;ve delivered as a consultant to banking and insurance clients.
          Both taught me that a pipeline nobody trusts isn&apos;t finished.
        </p>
      </section>

      <section className="sect" id="measurements">
        <p className="lab">Selected measurements</p>
        <h2>Before, and after.</h2>
        <p className="lede">
          Most of what I&apos;ve shipped can be stated as a number that moved. These are the ones I&apos;d defend
          in an interview.
        </p>
        <div className="measures">
          {MEASURES.map((m) => (
            <div className="m" key={m.what}>
              <div className="m-what">
                {m.what}
                <span className="m-src">{m.src}</span>
              </div>
              <div className="m-num">
                {m.was ? (
                  <>
                    <span className="was">{m.was}</span>
                    <span className="arr">&rarr;</span>
                  </>
                ) : null}
                <span className="now">{m.now}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="sect" id="experience">
        <p className="lab">Experience</p>
        <h2>Where I&apos;ve worked.</h2>
        <div>
          {JOBS.map((j) => (
            <article className="job" key={j.company}>
              <div className="when">
                <b>{j.when}</b>
                {j.where}
              </div>
              <div>
                <h3>
                  {j.company}
                  {j.badge ? <span className="badge">{j.badge}</span> : null}
                </h3>
                <p className="job-title">{j.title}</p>
                <p className="job-ctx">{j.ctx}</p>
                <ul>
                  {j.points.map((p, i) => (
                    <li key={i} dangerouslySetInnerHTML={{ __html: p }} />
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="sect" id="projects">
        <p className="lab">Projects</p>
        <h2>Things I built on my own time.</h2>
        <p className="lede">
          Mostly agent and LLM systems, shipped at hackathons in 2026. I use Claude Code and Cursor daily, so
          this is where I keep that current.
        </p>
        <div className="projs">
          {PROJECTS.map((p) => (
            <div className={p.wide ? 'proj proj-wide' : 'proj'} key={p.name}>
              <div className="proj-top">
                <h3>{p.name}</h3>
                <span className={p.win ? 'proj-tag proj-tag-win' : 'proj-tag'}>{p.tag}</span>
              </div>
              <p>{p.body}</p>
              <p className="proj-tech">{p.tech}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="sect" id="stack">
        <p className="lab">Stack</p>
        <h2>What I actually use.</h2>
        <p className="lede">
          Listed by how much I&apos;ve shipped with it, not by how it looks on a resume. Everything here I&apos;d
          take a question on.
        </p>
        <dl className="stack">
          {STACK.map(([k, v]) => (
            <div className="row" key={k}>
              <dt dangerouslySetInnerHTML={{ __html: k }} />
              <dd dangerouslySetInnerHTML={{ __html: v }} />
            </div>
          ))}
        </dl>
      </section>

      <section className="sect" id="credentials">
        <p className="lab">Credentials</p>
        <h2>Certified, and one award.</h2>
        <div className="creds">
          {CREDS.map(([t, s]) => (
            <div className="cred" key={t}>
              <h3>{t}</h3>
              <p>{s}</p>
            </div>
          ))}
        </div>
        <div className="edu">
          <div className="edu-row">
            <b>M.S. Software Engineering, AI Specialization</b>
            <span>Arizona State University &middot; 2024&ndash;2026</span>
          </div>
          <div className="edu-row">
            <b>B.Tech. Computer Science and Engineering</b>
            <span>GGSIPU, Delhi &middot; 2018</span>
          </div>
        </div>
      </section>

      <section className="sect contact" id="contact">
        <p className="lab">Contact</p>
        <h2>Let&apos;s talk.</h2>
        <p className="lede">
          Open to Data Engineer, Data Platform and Analytics Engineering roles working on large-scale pipelines,
          migrations and the systems that feed models. Based in Tempe, AZ and willing to relocate anywhere in the
          US for the right role.
        </p>
        <div className="links">
          <a className="pri" href="mailto:hpant.data@gmail.com">hpant.data@gmail.com</a>
          <a href="https://linkedin.com/in/himanshupant-de">linkedin.com/in/himanshupant-de</a>
          <a href="https://github.com/hpant5">github.com/hpant5</a>
        </div>
        <p className="foot">Himanshu Pant &middot; Tempe, AZ &middot; 2026</p>
      </section>

    </main>
  );
}
