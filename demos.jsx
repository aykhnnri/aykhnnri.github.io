/* global React */
const { useState, useRef, useEffect } = React;

/* ============================================================
   RAG DEMO — upload docs, ask questions, get cited answers
   ============================================================ */
function RagDemo() {
  const [docs, setDocs] = useState([
    { name: 'product_handbook.pdf', size: '2.4 MB' },
    { name: 'engineering_runbook.md', size: '184 KB' },
  ]);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      body: 'Documents indexed. Ask anything about the uploaded materials.',
      cites: [],
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);
  const logRef = useRef(null);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages, loading]);

  const handleFile = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach((f) => {
      const sizeKB = f.size / 1024;
      const display = sizeKB > 1024
        ? `${(sizeKB / 1024).toFixed(1)} MB`
        : `${sizeKB.toFixed(0)} KB`;
      setDocs((d) => [...d, { name: f.name, size: display }]);
    });
    e.target.value = '';
  };

  const removeDoc = (i) => setDocs((d) => d.filter((_, idx) => idx !== i));

  const send = async () => {
    const q = input.trim();
    if (!q || loading) return;
    setInput('');
    setMessages((m) => [...m, { role: 'user', body: q, cites: [] }]);
    setLoading(true);

    const docList = docs.map((d) => d.name).join(', ') || 'no documents';
    const prompt = `You are a RAG system answering questions about uploaded documents. The available documents are: ${docList}. The user asks: "${q}". Respond in 2-3 short sentences as if you retrieved relevant passages. Be concise and technical. Don't acknowledge that this is a demo or that you don't actually have the documents — pretend you do, and answer plausibly.`;

    try {
      const reply = await window.claude.complete(prompt);
      // Generate fake citations
      const cites = docs.length
        ? docs.slice(0, Math.min(2, docs.length)).map((d, i) => `${d.name} · §${Math.floor(Math.random() * 8) + 1}.${Math.floor(Math.random() * 6) + 1}`)
        : [];
      setMessages((m) => [...m, { role: 'assistant', body: reply, cites }]);
    } catch (err) {
      setMessages((m) => [...m, { role: 'assistant', body: 'Error contacting model. (In production, this would query your vector store + LLM endpoint.)', cites: [] }]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="demo">
      <div className="demo-sidebar">
        <div className="label">Knowledge Base</div>
        <div
          className="upload-zone"
          onClick={() => fileRef.current?.click()}
        >
          + UPLOAD DOCUMENTS<br />
          <span style={{ color: 'var(--fg-30)', fontSize: '11px' }}>PDF · MD · TXT · DOCX</span>
        </div>
        <input
          ref={fileRef}
          type="file"
          multiple
          accept=".pdf,.md,.txt,.docx"
          style={{ display: 'none' }}
          onChange={handleFile}
        />
        <div className="label">Indexed ({docs.length})</div>
        <div className="doc-list">
          {docs.map((d, i) => (
            <div key={i} className="doc-item">
              <span className="name">{d.name}</span>
              <span style={{ color: 'var(--fg-30)', fontSize: '11px', marginLeft: 8 }}>{d.size}</span>
              <button className="x" onClick={() => removeDoc(i)} aria-label="remove">×</button>
            </div>
          ))}
          {docs.length === 0 && (
            <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--fg-30)', padding: '12px 0' }}>
              No documents indexed.
            </div>
          )}
        </div>
      </div>

      <div className="chat">
        <div className="chat-log" ref={logRef}>
          {messages.map((m, i) => (
            <div key={i} className={`msg ${m.role}`}>
              <div className="role">{m.role === 'user' ? 'YOU' : 'ASSISTANT'}</div>
              <div className="body">{m.body}</div>
              {m.cites && m.cites.length > 0 && (
                <div className="citations">
                  {m.cites.map((c, j) => (
                    <span key={j} className="cite">{c}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="msg assistant">
              <div className="role">ASSISTANT</div>
              <div className="body">
                <span className="dots"><span></span><span></span><span></span></span>
                <span style={{ marginLeft: 12, fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--fg-50)' }}>
                  retrieving · embedding · generating
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder={docs.length ? 'Ask a question about your documents…' : 'Upload a document first.'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            disabled={loading}
          />
          <button className="send" onClick={send} disabled={loading || !input.trim()}>
            SEND
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   RANKER DEMO — paste JD + resumes, get scored matches
   ============================================================ */
const SAMPLE_JD = `Senior AI Engineer — RAG & Agentic Systems

We're hiring an AI Engineer to design and ship LLM-powered systems in production. You'll own backend services in Python/FastAPI, build retrieval-augmented generation pipelines, integrate multi-agent workflows, and optimize performance at scale.

Required:
- 3+ years backend engineering with Python
- Experience with LLMs (OpenAI, Anthropic, etc.)
- RAG architectures, vector databases, embedding models
- FastAPI / async Python / REST API design
- PostgreSQL, Redis, Docker

Nice to have:
- Multi-agent orchestration
- Healthcare or enterprise integrations
- Production deployment & observability`;

const SAMPLE_RESUMES = [
  {
    name: 'Aykhan Nuri',
    body: `AI Engineer | Python, FastAPI, LLMs, RAG.
Currently AI Engineer at Veyseloglu LLC building multi-agent systems.
Backend Developer at Cerner Corporation — healthcare EHR systems at scale.
AI Developer Intern at Araz Supermarkets — built RAG chatbot with vector embeddings + GPT fallback.
Skills: Python, FastAPI, OpenAI Agents/Assistants, RAG, vector search, PostgreSQL, Redis, Docker.`,
  },
  {
    name: 'Sarah Chen',
    body: `Frontend Engineer with 5 years React/TypeScript experience.
Built design systems at fintech startup. Strong CSS, animation, accessibility.
Some Node.js backend work. Curious about AI but no production LLM experience.`,
  },
  {
    name: 'Marcus Webb',
    body: `Data Scientist, 4 years.
PhD in NLP. Published on transformer architectures.
Heavy PyTorch / HuggingFace user. Fine-tuned models for sentiment analysis.
Limited backend engineering — mostly notebooks and batch jobs.`,
  },
];

function RankerDemo() {
  const [jd, setJd] = useState(SAMPLE_JD);
  const [resumes, setResumes] = useState(SAMPLE_RESUMES);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateResume = (i, patch) => {
    setResumes((r) => r.map((x, idx) => (idx === i ? { ...x, ...patch } : x)));
  };
  const removeResume = (i) => setResumes((r) => r.filter((_, idx) => idx !== i));
  const addResume = () => setResumes((r) => [...r, { name: `Candidate ${r.length + 1}`, body: '' }]);

  const rank = async () => {
    if (!jd.trim() || resumes.filter((r) => r.body.trim()).length === 0) return;
    setLoading(true);
    setResults(null);

    const prompt = `You are a resume ranker. Score each candidate against this job description from 0 to 100, and give a one-sentence reason.

JOB DESCRIPTION:
${jd}

CANDIDATES:
${resumes.map((r, i) => `[${i}] ${r.name}:\n${r.body}`).join('\n\n')}

Respond with ONLY valid JSON in this exact format, no markdown, no prose:
{"rankings":[{"index":0,"score":85,"reason":"..."}]}
Sort the array by score descending. Each reason must be one short sentence (max 18 words).`;

    try {
      const raw = await window.claude.complete(prompt);
      // Strip code fences if any
      const cleaned = raw.replace(/```json|```/g, '').trim();
      const match = cleaned.match(/\{[\s\S]*\}/);
      const parsed = JSON.parse(match ? match[0] : cleaned);
      const enriched = parsed.rankings.map((r) => ({
        ...r,
        name: resumes[r.index]?.name || `Candidate ${r.index + 1}`,
      }));
      setResults(enriched);
    } catch (err) {
      console.error(err);
      setResults([
        { name: 'Error', score: 0, reason: 'Could not parse model response. Try shorter inputs.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ranker">
      <div className="ranker-left">
        <div className="label">Job Description</div>
        <textarea
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          placeholder="Paste the job description…"
        />

        <div className="label" style={{ marginTop: 8 }}>Resumes ({resumes.length})</div>
        {resumes.map((r, i) => (
          <div key={i} className="resume-input">
            <div className="head">
              <input
                type="text"
                value={r.name}
                onChange={(e) => updateResume(i, { name: e.target.value })}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--fg)',
                  fontFamily: 'var(--mono)',
                  fontSize: 13,
                  outline: 'none',
                  flex: 1,
                  padding: 0,
                }}
              />
              <button
                onClick={() => removeResume(i)}
                style={{ color: 'var(--fg-50)', fontFamily: 'var(--mono)', fontSize: 12 }}
              >
                ×
              </button>
            </div>
            <textarea
              value={r.body}
              onChange={(e) => updateResume(i, { body: e.target.value })}
              placeholder="Paste resume text or summary…"
            />
          </div>
        ))}

        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 8 }}>
          <button className="add-resume-btn" onClick={addResume}>+ ADD RESUME</button>
          <button className="rank-btn" onClick={rank} disabled={loading} style={{ marginLeft: 'auto' }}>
            {loading ? 'RANKING…' : 'RANK CANDIDATES →'}
          </button>
        </div>
      </div>

      <div className="ranker-right">
        <div className="label" style={{ marginBottom: 16 }}>Ranking Results</div>
        {!results && !loading && (
          <div className="empty">
            Paste a JD + resumes, then click RANK CANDIDATES.<br />
            <span style={{ color: 'var(--fg-30)', fontSize: 11, marginTop: 8, display: 'inline-block' }}>
              The sample data is pre-loaded — try it.
            </span>
          </div>
        )}
        {loading && (
          <div className="empty">
            <span className="dots"><span></span><span></span><span></span></span>
            <div style={{ marginTop: 16, fontSize: 12, color: 'var(--fg-50)' }}>
              embedding · scoring · ranking
            </div>
          </div>
        )}
        {results && results.map((r, i) => (
          <div key={i} className={`rank-item ${i === 0 ? 'top1' : ''}`}>
            <div className="pos">{String(i + 1).padStart(2, '0')}</div>
            <div>
              <div className="name">{r.name}</div>
              <div className="reason">{r.reason}</div>
            </div>
            <div>
              <div className="score">{r.score}</div>
              <div className="score-suffix">MATCH</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

window.RagDemo = RagDemo;
window.RankerDemo = RankerDemo;
