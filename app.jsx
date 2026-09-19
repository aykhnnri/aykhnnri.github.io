/* global React, ReactDOM */
const { useState, useEffect } = React;

/* ============================================================
   DATA — pulled from resume
   ============================================================ */
const NAME = 'AYKHAN NURI';
const TAGLINE = 'AI/ML engineer working across the machine-learning lifecycle, from data preparation to deployed Python services.';
const RESUME = 'assets/Aykhan_Nuri_Resume.pdf';

const SKILLS = [
{
  title: 'Programming',
  items: ['Python', 'SQL', 'TypeScript', 'JavaScript']
},
{
  title: 'Machine Learning',
  items: ['Supervised learning', 'Unsupervised learning', 'Classification', 'Regression', 'Clustering', 'Data preprocessing', 'Feature engineering', 'Model training', 'Cross-validation', 'Hyperparameter tuning', 'Model evaluation']
},
{
  title: 'Applied AI',
  items: ['RAG', 'Agentic systems', 'Function / tool calling', 'Embeddings', 'Semantic search', 'Prompt engineering', 'Query rewriting', 'Reranking', 'LLM evaluation']
},
{
  title: 'Frameworks & Data',
  items: ['scikit-learn', 'FastAPI', 'LangGraph', 'LangChain', 'OpenAI API', 'Pandas', 'NumPy', 'PostgreSQL', 'SQL Server', 'Redis', 'Qdrant']
},
{
  title: 'MLOps & Engineering',
  items: ['Model serving', 'REST APIs', 'Asynchronous Python', 'Docker', 'Linux', 'GitHub Actions', 'CI/CD', 'Caching', 'Logging', 'Monitoring']
},
];


const PROJECTS = [
{
  id: 'rag',
  num: '01',
  title: 'Agentic RAG System',
  desc: 'Agentic RAG backend that chains an input guard, query rewriting, hybrid retrieval, LLM reranking, and CRAG-style grading with a decomposition retry, returning grounded answers with inline citations.',
  tags: ['FastAPI', 'OpenAI', 'Qdrant', 'CRAG', 'Agentic'],
  repo: 'https://github.com/aykhnnri/production-rag-system',
  demo: null
},
{
  id: 'ranker',
  num: '02',
  title: 'Resume Parser & Ranker',
  desc: 'Paste a job description and a stack of resumes. The system parses, embeds, and scores each candidate against the JD, then returns ranked matches with one-line reasoning.',
  tags: ['Python', 'LLM Reasoning', 'Embeddings', 'Structured Output'],
  repo: null,
  demo: null
},
{
  id: 'multiagent',
  num: '03',
  title: 'Multi-Agent Automation',
  desc: 'Production system at Veyseloglu LLC orchestrating specialized agents for business-process automation, information retrieval, and decision support across enterprise data sources.',
  tags: ['FastAPI', 'Qdrant', 'Tool Calling', 'Structured Outputs', 'Production'],
  demo: null
},
{
  id: 'chatbot',
  num: '04',
  title: 'Customer Service Chatbot',
  desc: 'Retail support bot that answers from a curated dataset and falls back to GPT for uncovered queries. Vector embeddings and semantic search improve retrieval quality; automated pipelines keep the knowledge base current.',
  tags: ['NLP', 'GPT', 'Vector Search', 'Automation'],
  demo: null
}];


const EXPERIENCE = [
{
  period: 'Sep 2025 – Present',
  current: true,
  role: 'AI Engineer',
  org: 'Veyseloglu LLC · Baku, Azerbaijan',
  points: [
  'Design and develop AI/ML systems for business-process automation, information retrieval, and decision support across internal workflows.',
  'Build Python data pipelines and FastAPI services for model integration, inference, evaluation, and connectivity with enterprise APIs and databases.',
  'Develop RAG and multi-agent workflows using embeddings, Qdrant, semantic search, query rewriting, reranking, tool calling, structured outputs, and fallback logic.',
  'Strengthen reliability with caching, logging, monitoring, retries, rate-limit handling, error management, and Docker-based deployment.']

},
{
  period: 'Jun 2024 – Jul 2024',
  current: false,
  role: 'AI Developer Intern',
  org: '"Araz" Supermarkets Chain · Baku, Azerbaijan',
  points: [
  'Developed an AI-powered customer service chatbot that combined dataset-based question answering with GPT fallback for uncovered queries.',
  'Applied vector embeddings and semantic search to improve retrieval quality, and automated knowledge-base updates to keep source data current.']

},
{
  period: 'May 2023 – May 2024',
  current: false,
  role: 'Backend Developer',
  org: 'Cerner Corporation · Kansas City, Missouri',
  points: [
  'Designed and optimized scalable backend services supporting enterprise healthcare applications and EHR data integrations.',
  'Improved system performance, reliability, and efficiency in a high-traffic enterprise environment through backend and data-processing enhancements.']

},
{
  period: 'Jan 2022 – Apr 2023',
  current: false,
  role: 'Research Assistant',
  org: 'UMKC School of Science and Engineering · Kansas City, Missouri',
  points: [
  'Developed Python pipelines to extract, clean, transform, and prepare research datasets for an AI-focused project sponsored by the National Science Foundation.',
  'Trained and evaluated machine-learning models using feature engineering, model selection, validation, and iterative experimentation.',
  'Built knowledge graphs from processed data to represent entities and relationships for downstream research and model-development workflows.']

}];


const LANGUAGES = [
{ lng: 'Azerbaijani', lvl: 'Native' },
{ lng: 'English', lvl: 'C1' },
{ lng: 'Turkish', lvl: 'C1' }];


const CONTACT = {
  email: 'aykhannuri02@gmail.com',
  phone: '+994 (50) 821 00 54',
  linkedin: 'https://www.linkedin.com/in/aykhan-nuri-a087981a8/',
  github: 'https://github.com/aykhnnri'
};

/* ============================================================
   THEME
   ============================================================ */
function getInitialTheme() {
  const saved = localStorage.getItem('portfolio-theme');
  if (saved === 'light' || saved === 'dark') return saved;
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
  return 'dark';
}

function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);
  return [theme, setTheme];
}

/* ============================================================
   NAV
   ============================================================ */
function Nav({ theme, setTheme }) {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#top" className="brand">
          <span className="dot"></span>
          AYKHAN NURI / AI·ML ENG
        </a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="/projects/">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme">
            
            <span>{theme === 'dark' ? '◐' : '◑'}</span>
            <span>{theme === 'dark' ? 'LIGHT' : 'DARK'}</span>
          </button>
        </div>
      </div>
    </nav>);

}

/* ============================================================
   HERO
   ============================================================ */
function Hero() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      const d = new Date();
      const opts = { timeZone: 'Asia/Baku', hour: '2-digit', minute: '2-digit', hour12: false };
      setTime(new Intl.DateTimeFormat('en-GB', opts).format(d) + ' BAKU');
    };
    update();
    const t = setInterval(update, 30000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="hero" id="top">
      <div className="container">
        <div className="hero-meta">
          <span className="status">
            <span className="pulse"></span>
            AVAILABLE FOR WORK
          </span>
          <span>PORTFOLIO · v2026.09</span>
          <span>{time}</span>
        </div>

        <h1 className="hero-title">
          <span className="line">AI<span className="dim">/</span>ML</span>
          <span className="line">ENGINEER<span className="dim">.</span></span>
        </h1>

        <div className="hero-sub">
          <p>
            Aykhan Nuri, AI/ML engineer in Baku. I work the whole machine-learning
            lifecycle, from data preparation and feature engineering through training and
            evaluation, and ship the result as Python services that hold up in production.
          </p>
          <div className="actions">
            <a href="#work" className="btn btn-primary">
              VIEW WORK <span className="arrow">→</span>
            </a>
            <a href={RESUME} download className="btn btn-ghost">
              RESUME · PDF
            </a>
          </div>
        </div>
      </div>
    </section>);

}

/* ============================================================
   ABOUT
   ============================================================ */
function About() {
  return (
    <section id="about">
      <div className="container">
        <div className="section-head">
          <span className="num">01</span>
          <h2>About</h2>
        </div>
        <div className="about-grid">
          <div>
            <p>
              <strong>AI/ML engineer with a B.S. in Computer Science.</strong> I work across
              the machine-learning lifecycle: preparing data, engineering features, training
              and evaluating models, then wiring them into APIs and getting them deployed.
            </p>
            <p>
              Day to day that means machine-learning solutions, intelligent automation, RAG
              applications, and multi-agent systems built in Python with scikit-learn,
              FastAPI, and current AI frameworks. Most of it runs behind an API, so caching,
              retries, rate-limit handling, logging, and monitoring get built in rather than
              bolted on later.
            </p>
            <p>
              Before this I wrote backend services for enterprise healthcare software at
              Cerner, and worked on an NSF-sponsored research project at UMKC training models
              and building knowledge graphs from research datasets.
            </p>
          </div>
          <div className="stat-grid">
            <div className="stat">
              <div className="k">Focus</div>
              <div className="vsm">Machine learning<br />Applied AI</div>
            </div>
            <div className="stat">
              <div className="k">Stack</div>
              <div className="vsm">Python · FastAPI<br />scikit-learn · Qdrant</div>
            </div>
            <div className="stat">
              <div className="k">Based</div>
              <div className="vsm">Baku, AZ<br />Remote-friendly</div>
            </div>
            <div className="stat">
              <div className="k">Status</div>
              <div className="vsm">Open to roles<br />& collaborations</div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

/* ============================================================
   SKILLS
   ============================================================ */
function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <div className="section-head">
          <span className="num">02</span>
          <h2>Stack</h2>
        </div>
        <div className="skills">
          {SKILLS.map((cat, i) =>
          <div className="skill-cat" key={cat.title}>
              <div className="head">
                <h3>{cat.title}</h3>
                <span className="idx">{String(i + 1).padStart(2, '0')} / {String(SKILLS.length).padStart(2, '0')}</span>
              </div>
              <div className="tag-row">
                {cat.items.map((s) => <span key={s} className="tag">{s}</span>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

/* ============================================================
   PROJECTS PREVIEW
   ============================================================ */
function ProjectsPreview() {
  return (
    <section id="work">
      <div className="container">
        <div className="section-head">
          <span className="num">03</span>
          <h2>Selected Work</h2>
          <a href="/projects/" style={{ marginLeft: 'auto', fontFamily: 'var(--mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--fg-70)' }}>
            ALL PROJECTS →
          </a>
        </div>
        <div className="projects-list">
          {PROJECTS.map((p) => {
            const RowTag = p.repo ? 'a' : 'div';
            const rowProps = p.repo
              ? { href: p.repo, target: '_blank', rel: 'noopener', style: { textDecoration: 'none', color: 'inherit' } }
              : {};
            return (
              <RowTag
                key={p.id}
                className="proj-row"
                style={{ cursor: p.repo ? 'pointer' : 'default', ...(rowProps.style || {}) }}
                {...rowProps}>
                <span className="pnum">{p.num}</span>
                <div>
                  <div className="ptitle">{p.title}</div>
                  {p.repo &&
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--fg-50)', letterSpacing: '0.14em', marginTop: 6, display: 'inline-block' }}>
                      ◦ VIEW ON GITHUB ↗
                    </span>
                  }
                </div>
                <div className="pdesc">{p.desc}</div>
                <div className="ptags">
                  {p.tags.slice(0, 3).map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
              </RowTag>
            );
          })}
        </div>
      </div>
    </section>);

}

/* ============================================================
   EXPERIENCE
   ============================================================ */
function Experience() {
  return (
    <section id="experience">
      <div className="container">
        <div className="section-head">
          <span className="num">04</span>
          <h2>Experience</h2>
        </div>
        <div className="timeline">
          {EXPERIENCE.map((e, i) =>
          <div className="tl-item" key={i}>
              <div className="tl-date">
                {e.current && <span className="current">CURRENT</span>}
                <span>{e.period}</span>
              </div>
              <div className="tl-body">
                <h3>{e.role}</h3>
                <div className="org">{e.org}</div>
                <ul className="tl-points">
                  {e.points.map((pt, j) => <li key={j}>{pt}</li>)}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

/* ============================================================
   EDUCATION + LANGUAGES
   ============================================================ */
function EduLang() {
  return (
    <section id="education">
      <div className="container">
        <div className="section-head">
          <span className="num">05</span>
          <h2>Education / Languages</h2>
        </div>
        <div className="edu-lang">
          <div className="edu">
            <h3>Education</h3>
            <div className="degree">B.S. Computer Science</div>
            <div className="school">University of Missouri, Kansas City</div>
            <div className="years">2019 – 2024</div>
          </div>
          <div>
            <h3>Languages</h3>
            <div>
              {LANGUAGES.map((l) =>
              <div className="lang-row" key={l.lng}>
                  <span className="lng">{l.lng}</span>
                  <span className="lvl">{l.lvl}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>);

}

/* ============================================================
   CONTACT
   ============================================================ */
function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-head">
          <span className="num">06</span>
          <h2>Contact</h2>
        </div>
        <h3 className="contact-cta">
          Let's build<br />
          something <span className="dim">/*</span>useful<span className="dim">*/</span>.
        </h3>
        <div className="contact-rows">
          <a href={`mailto:${CONTACT.email}`} className="contact-row">
            <span className="label">Email</span>
            <span className="val">{CONTACT.email}</span>
            <span className="arr">→</span>
          </a>
          <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="contact-row">
            <span className="label">Phone</span>
            <span className="val">{CONTACT.phone}</span>
            <span className="arr">→</span>
          </a>
          <a href={CONTACT.linkedin} target="_blank" rel="noopener" className="contact-row">
            <span className="label">LinkedIn</span>
            <span className="val">Aykhan Nuri</span>
            <span className="arr">↗</span>
          </a>
          <a href={CONTACT.github} target="_blank" rel="noopener" className="contact-row">
            <span className="label">GitHub</span>
            <span className="val">@aykhnnri</span>
            <span className="arr">↗</span>
          </a>
          <a href={RESUME} download className="contact-row">
            <span className="label">Resume</span>
            <span className="val">Aykhan_Nuri_Resume.pdf</span>
            <span className="arr">↓</span>
          </a>
        </div>
      </div>
    </section>);

}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  return (
    <footer className="footer">
      <span>© 2026 AYKHAN NURI · ALL SYSTEMS NOMINAL</span>
      <span className="ascii">{'{ built with care · ☕ }'}</span>
    </footer>);

}

/* ============================================================
   APP
   ============================================================ */
function App() {
  const [theme, setTheme] = useTheme();

  return (
    <>
      <Nav theme={theme} setTheme={setTheme} />
      <Hero />
      <About />
      <Skills />
      <ProjectsPreview />
      <Experience />
      <EduLang />
      <Contact />
      <Footer />
    </>);

}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);