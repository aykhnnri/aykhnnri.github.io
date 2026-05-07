/* global React, ReactDOM, RagDemo, RankerDemo */
const { useState, useEffect, useRef } = React;

/* ============================================================
   DATA — pulled from resume
   ============================================================ */
const NAME = 'AYKHAN NURI';
const TAGLINE = 'AI Engineer building backend systems for LLMs, RAG, and agentic workflows.';

const SKILLS = [
{
  title: 'Languages',
  items: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'C++']
},
{
  title: 'Backend & API',
  items: ['FastAPI', 'REST APIs', 'Async Python', 'Background jobs', 'Microservices', 'API integrations', 'Webhooks', 'Authentication', 'Streaming responses']
},
{
  title: 'Databases & Caching',
  items: ['PostgreSQL', 'SQL Server', 'Redis', 'Qdrant', 'Vector databases', 'Semantic search']
},
{
  title: 'AI & Machine Learning',
  items: ['Prompt engineering', 'Tool/function calling', 'Agent orchestration', 'RAG pipelines', 'Query rewriting', 'Reranking', 'LLM evaluation']
},
{
  title: 'Frameworks & Libraries',
  items: ['LangChain', 'LangGraph', 'Pandas', 'NumPy', 'Node.js', 'React', 'React Native', '.NET']
},
{
  title: 'DevOps & Infrastructure',
  items: ['Docker', 'Docker Compose', 'Linux', 'GitHub Actions', 'CI/CD', 'Deployment configuration', 'Logging & monitoring']
},
{
  title: 'Tools & Platforms',
  items: ['Git', 'GitHub', 'OpenAI Platform', 'Firebase', 'n8n', 'Postman', 'Cursor/Codex']
},
{
  title: 'System Design & Engineering',
  items: ['Scalable backend design', 'Async workflows', 'Caching', 'Error handling', 'Fallback logic', 'Retry/rate-limit handling', 'Automation workflows']
},
];


const PROJECTS = [
{
  id: 'rag',
  num: '01',
  title: 'Agentic RAG System',
  desc: 'Production-grade Agentic RAG backend: input guard → query rewrite → hybrid retrieval → LLM reranking → CRAG-style grading with decomposition retry, returning grounded answers with inline citations.',
  tags: ['FastAPI', 'OpenAI', 'Qdrant', 'CRAG', 'Agentic'],
  repo: 'https://github.com/aykhnnri/production-rag-system',
  demo: null
},
{
  id: 'ranker',
  num: '02',
  title: 'Resume Parser & Ranker',
  desc: 'Paste a job description and a stack of resumes — the system parses, embeds, scores each candidate against the JD, and returns ranked matches with one-line reasoning.',
  tags: ['Python', 'LLM Reasoning', 'Embeddings', 'Structured Output'],
  repo: null,
  demo: null
},
{
  id: 'multiagent',
  num: '03',
  title: 'Multi-Agent Automation',
  desc: 'Production system at Veyseloglu LLC orchestrating specialized agents for task automation and information retrieval across enterprise data sources.',
  tags: ['Response API', 'Agents SDK', 'FastAPI', 'Production'],
  demo: null
},
{
  id: 'chatbot',
  num: '04',
  title: 'Customer Service Chatbot',
  desc: 'Retail-chain support bot blending dataset Q&A with GPT fallback. Vector embeddings improve match accuracy; automated pipelines refresh the knowledge base on a schedule.',
  tags: ['NLP', 'GPT', 'Vector Search', 'Automation'],
  demo: null
}];


const EXPERIENCE = [
{
  period: 'Sep 2025 — Present',
  current: true,
  role: 'AI Engineer',
  org: 'Veyseloglu LLC · Baku, Azerbaijan',
  body: 'Designing and developing AI-powered multi-agent systems that handle task automation and information retrieval across enterprise workflows.'
},
{
  period: 'Jun 2024 — Jul 2024',
  current: false,
  role: 'AI Developer Intern',
  org: '"Araz" Supermarkets Chain · Baku, Azerbaijan',
  body: 'Developed an AI-powered customer service chatbot for a retail chain, combining dataset-based Q&A with GPT fallback, vector embeddings for improved retrieval accuracy, and automated dataset update pipelines.'
},
{
  period: 'May 2023 — May 2024',
  current: false,
  role: 'Backend Developer',
  org: 'Cerner Corporation · Kansas City, Missouri',
  body: 'Designed and optimized scalable backend systems for healthcare applications. Integrated EHR data and improved performance, reliability, and overall system efficiency in a high-traffic enterprise environment.'
},
{
  period: 'Jan 2022 — Apr 2023',
  current: false,
  role: 'Research Assistant',
  org: 'UMKC School of Science and Engineering · Kansas City, Missouri',
  body: 'Developed programs to extract data and build knowledge graphs for an ongoing research project sponsored by the National Science Foundation.'
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
          AYKHAN NURI / AI ENG
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
          <span>PORTFOLIO · v2026.04</span>
          <span>{time}</span>
        </div>

        <h1 className="hero-title">
          <span className="line">AI</span>
          <span className="line">ENGINEER<span className="dim">.</span></span>
        </h1>

        <div className="hero-sub">
          <p>Aykhan Nuri - Python backend engineer focused on LLMs, RAG pipelines, and agentic systems. I take ideas from architecture sketch to production.

          </p>
          <div className="actions">
            <a href="#work" className="btn btn-primary">
              VIEW WORK <span className="arrow">→</span>
            </a>
            <a href="assets/AykhanNuri_Resume.pdf" download className="btn btn-ghost">
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
              <strong>I build systems that ship.</strong> AI engineer with a backend focus, working primarily in Python and FastAPI. I design APIs, integrate LLMs, and develop RAG-based solutions for automation and customer-facing applications.
            </p>
            <p>
              My work covers the full lifecycle: optimizing system performance, handling asynchronous workflows, and building scalable architectures with caching and external API integrations. I take systems from design to deployment and keep them running reliably in production.
            </p>
            <p>I focus on writing clean, maintainable code and building things that are practical, stable, and actually useful in real-world environments, not just impressive on a demo day.

            </p>
          </div>
          <div className="stat-grid">
            <div className="stat">
              <div className="k">Focus</div>
              <div className="vsm">LLMs · ML<br />Agentic systems</div>
            </div>
            <div className="stat">
              <div className="k">Stack</div>
              <div className="vsm">Python · FastAPI<br />PostgreSQL · Redis</div>
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
                <p>{e.body}</p>
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
            <div className="degree">B.Sc. Computer Science</div>
            <div className="school">University of Missouri - Kansas City</div>
            <div className="years">2019 — 2024</div>
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
          <a href="assets/AykhanNuri_Resume.pdf" download className="contact-row">
            <span className="label">Resume</span>
            <span className="val">AykhanNuri_Resume.pdf</span>
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
   DEMO MODAL
   ============================================================ */
function DemoModal({ which, onClose }) {
  useEffect(() => {
    const onKey = (e) => {if (e.key === 'Escape') onClose();};
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const titleMap = {
    rag: 'RAG SYSTEM · LIVE DEMO',
    ranker: 'RESUME RANKER · LIVE DEMO'
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <span className="title">{titleMap[which]}</span>
          <button className="close" onClick={onClose}>ESC · CLOSE</button>
        </div>
        <div className="modal-body">
          {which === 'rag' && <RagDemo />}
          {which === 'ranker' && <RankerDemo />}
        </div>
      </div>
    </div>);

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