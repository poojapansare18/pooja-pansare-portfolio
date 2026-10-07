'use client';

import Image from 'next/image';
import { FormEvent, useState } from 'react';

type Project = {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  type: string;
  description: string;
  problem: string;
  solution: string;
  execution: string;
  value: string;
  stack: string[];
  accent: string;
  major?: boolean;
};

const projects: Project[] = [
  {
    id: 'campus',
    num: '01',
    title: 'CampusSyntra',
    subtitle: 'AI-Powered Campus Intelligence & Operations Platform',
    type: 'Independent product build',
    description: 'A unified application layer for campus information, academic workflows and AI-assisted operations — designed to move beyond fragmented portals and isolated chat interfaces.',
    problem: 'Students, faculty and staff typically navigate separate systems for academic information, attendance, fees, syllabus, examinations and support. The operational problem is not simply access to data; it is finding the right information and turning it into the next useful action.',
    solution: 'CampusSyntra brings institutional data, role-aware application services and AI capabilities into one governed experience. The AI layer assists with retrieval, academic workflows and structured generation while application permissions remain authoritative.',
    execution: 'Built the application foundation with Next.js, TypeScript, FastAPI, Python, PostgreSQL and JWT authentication. Designed structured academic models and an AI-assisted question-paper workflow that follows syllabus and assessment requirements before producing a structured, downloadable paper.',
    value: 'The target outcome is a more coherent campus operating experience: less fragmented information access, faster academic workflows and a foundation for future institutional agents and automation.',
    stack: ['Next.js', 'TypeScript', 'FastAPI', 'Python', 'PostgreSQL', 'JWT', 'LLMs', 'RAG', 'AI Agents', 'n8n', 'Docker'],
    accent: 'teal',
    major: true,
  },
  {
    id: 'persynta',
    num: '02',
    title: 'Persynta',
    subtitle: 'Personal AI / Voice Agent Platform',
    type: 'Independent product build',
    description: 'A persistent personal AI identity designed around natural voice interaction, memory and follow-through — where the assistant is experienced more like a contact than a conventional app notification.',
    problem: 'Reminder applications notify users, but notification does not guarantee follow-through. Real-world tasks often require a conversation: confirmation, rescheduling, clarification, escalation or a later check-in.',
    solution: 'Persynta introduces a persistent “Digital Friend” identity that can interact through voice. The system turns intent into scheduled interventions, conducts a conversation, captures the outcome and updates the task state rather than stopping at an alert.',
    execution: 'Designed and built a stateful agent workflow covering reminders, tasks, checklists, rescheduling and completion tracking. Added personal memory and semantic retrieval, multi-user isolation, asynchronous scheduling, retry / escalation workflows and real-time state updates using LLMs, STT/TTS, telephony APIs, REST services and PostgreSQL-oriented architecture.',
    value: 'The target outcome is reliable personal follow-through: an assistant that can remember context, initiate the right interaction and adapt the task state based on the user’s response.',
    stack: ['Agentic AI', 'Conversational AI', 'LLMs', 'STT / TTS', 'Telephony APIs', 'REST APIs', 'PostgreSQL', 'Semantic Retrieval', 'Stateful Workflows'],
    accent: 'indigo',
    major: true,
  },
  {
    id: 'ops',
    num: '03',
    title: 'AI Operations Automation',
    subtitle: 'AI-Assisted Business Workflow Orchestration',
    type: 'Independent system',
    description: 'An automation pattern for converting unstructured business requests into structured decisions and controlled workflow execution.',
    problem: 'Operational requests arrive in natural language, while downstream systems require structured fields, routing decisions and explicit controls.',
    solution: 'AI extracts and classifies the request; deterministic rules control what may happen; human approval is introduced where risk requires it; automation then executes the approved action and records the result.',
    execution: 'V1 focuses on request intake, structured extraction, classification, confidence gating, business rules, routing, approval, API / workflow action, notification and audit logging.',
    value: 'The engineering objective is reliable automation without allowing an LLM to become the authority for business-critical execution.',
    stack: ['n8n', 'LLM Structured Outputs', 'Python / FastAPI', 'REST APIs', 'PostgreSQL', 'Human-in-the-Loop', 'Retries', 'Idempotency'],
    accent: 'orange',
  },
  {
    id: 'revenue',
    num: '04',
    title: 'AI Revenue Intelligence',
    subtitle: 'Sales & Deal Intelligence Assistant',
    type: 'Independent system',
    description: 'An AI decision-support layer designed to turn CRM context and internal sales knowledge into grounded deal intelligence and next-best actions.',
    problem: 'Sales decisions are often distributed across CRM records, activity history, qualification frameworks, product knowledge and internal playbooks.',
    solution: 'A retrieval and reasoning layer combines structured sales data with relevant internal knowledge to assess fit, surface risk and recommend the next action, while keeping business-changing actions behind approval.',
    execution: 'The V1 pattern covers CRM / deal retrieval, knowledge retrieval, AI analysis, fit and risk assessment, next-best-action planning, human approval and controlled CRM / API execution.',
    value: 'The engineering objective is decision support that is grounded, explainable and operationally connected — rather than a generic sales chatbot.',
    stack: ['LLMs', 'Structured Outputs', 'RAG', 'Embeddings', 'Vector Search', 'Tool Calling', 'Python / FastAPI', 'REST APIs', 'PostgreSQL', 'Evaluation'],
    accent: 'green',
  },
];

const events = [
  {
    short: 'HPE Discover More AI',
    name: 'HPE Discover More AI 2024',
    city: 'Mumbai',
    date: '2024',
    role: 'Enterprise AI',
    body: 'Technical representation in an enterprise AI environment, supporting product and solution conversations with stakeholders.',
    image: '/images/events/hpe-portrait.png',
  },
  {
    short: 'NVIDIA AI Summit',
    name: 'NVIDIA AI Summit 2024',
    city: 'Mumbai',
    date: '2024',
    role: 'AI ecosystem',
    body: 'Technical ecosystem exposure and stakeholder-facing representation. Participation is presented as event evidence, not as employment or a personal partnership claim.',
    image: '/images/events/nvidia-environment.png',
  },
  {
    short: 'IMTEX',
    name: 'IMTEX 2025',
    city: 'Bengaluru',
    date: '23–29 Jan 2025',
    role: 'Manufacturing technology',
    body: 'Exposure to industrial and manufacturing technology environments, extending solution communication beyond software-only contexts.',
    image: '/images/events/imtex.jpg',
  },
  {
    short: 'IIMBue',
    name: 'IIMBue 2025',
    city: 'Bengaluru',
    date: '2–3 Aug 2025',
    role: 'Business & leadership',
    body: 'Technical representation across discussions with technical, non-technical and senior stakeholders.',
    image: '/images/events/iimbue-discussion.png',
  },
  {
    short: 'Healthcare Summit',
    name: 'The 5th Edition Healthcare Summit 2025',
    city: 'Bengaluru',
    date: '13–14 Jun 2025',
    role: 'Healthcare technology',
    body: 'Healthcare technology environment used to communicate technical solutions in a domain-specific setting.',
    image: '/images/events/healthcare-backdrop.jpg',
  },
];

const capabilities = [
  ['01', 'AI / GenAI', 'LLM applications, RAG, structured outputs, prompt engineering, agentic workflows and evaluation'],
  ['02', 'Application Engineering', 'Python, FastAPI, TypeScript, React, Next.js, REST APIs and PostgreSQL'],
  ['03', 'Automation', 'n8n, RPA, API-driven workflows, webhooks, approvals, retries and idempotency'],
  ['04', 'Solution Engineering', 'Requirements analysis, solution design, POC development, technical discovery and demonstrations'],
];

const skillGroups = [
  ['AI & Generative AI', 'Generative AI · LLM Applications · Prompt Engineering · LLM Orchestration · Structured Outputs · RAG · Embeddings · Semantic Search · Conversational AI · AI Evaluation'],
  ['Agentic Systems', 'AI Agents · Agentic Workflows · Tool / Function Calling · LLM Orchestration · Prompt Chaining · LlamaIndex · Flowise · Human-in-the-Loop'],
  ['Application Development', 'Python · FastAPI · REST APIs · JavaScript · TypeScript · ReactJS · Next.js · SQL · PostgreSQL · JSON'],
  ['Automation & Integration', 'n8n · RPA · Workflow Automation · Process Automation · Joget · Twilio · Amazon S3 · Zerodha · Tally integrations'],
  ['Cloud & Delivery', 'AWS · Azure · Azure OpenAI Service · Docker · Linux · Git · GitHub'],
  ['Quality & Testing', 'Postman · JMeter · API Testing · Functional Testing · Integration Testing · Performance Testing · POC Validation'],
  ['Data & Knowledge', 'SQL · PostgreSQL · Document Processing · Vector Search · Semantic Search · Knowledge Bases · ChromaDB'],
  ['Solution Engineering', 'Requirements Analysis · Technical Discovery · Business Process Analysis · Solution Design · POC Development · Stakeholder Communication'],
];

function Icon({ type }: { type: string }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  if (type === 'arrow') return <svg {...common}><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>;
  if (type === 'mail') return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>;
  if (type === 'linkedin') return <svg {...common}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>;
  return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8v8"/></svg>;
}

function SectionHead({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return <div className="sectionHead"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{desc && <p>{desc}</p>}</div>;
}

export default function Home() {
  const [eventIndex, setEventIndex] = useState(0);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [assistantLoading, setAssistantLoading] = useState(false);
  const [intent, setIntent] = useState('Professional Opportunity');
  const [contactState, setContactState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [contactMessage, setContactMessage] = useState('');
  const event = events[eventIndex];

  async function ask() {
    const trimmed = question.trim();
    if (!trimmed || assistantLoading) return;
    setAssistantLoading(true);
    try {
      const response = await fetch('/api/assistant', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question: trimmed }) });
      const data = await response.json();
      setAnswer(data.answer || 'I could not find that in the public portfolio knowledge base.');
    } catch {
      setAnswer('The portfolio assistant is temporarily unavailable. Please use the contact links below.');
    } finally {
      setAssistantLoading(false);
    }
  }

  async function submitContact(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setContactState('sending');
    setContactMessage('');
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to send message.');
      setContactState('sent');
      setContactMessage('Message sent successfully.');
      e.currentTarget.reset();
      setIntent('Professional Opportunity');
    } catch (err) {
      setContactState('error');
      setContactMessage(err instanceof Error ? err.message : 'Unable to send message.');
    }
  }

  return <main>
    <nav className="nav">
      <a className="brand" href="#top">PP<span>.</span></a>
      <div className="navlinks"><a href="#work">Work</a><a href="#experience">Experience</a><a href="#capabilities">Capabilities</a><a href="#contact">Contact</a></div>
      <div className="navActions"><a className="resumeLink" href="/Pooja_Pansare_AI_Engineer_Resume.pdf" target="_blank" rel="noreferrer">Resume <Icon type="arrow" /></a><button className="navAI" onClick={() => setAssistantOpen(true)}>Ask Pooja’s AI <Icon type="arrow" /></button></div>
    </nav>

    <section id="top" className="hero shell">
      <div className="heroCopy">
        <div className="status"><span /> Pune, India <b>·</b> Open to International Opportunities</div>
        <p className="kicker">AI SOLUTIONS ENGINEERING</p>
        <h1>Building AI systems<br /><span>that move from idea to action.</span></h1>
        <p className="heroRole">AI Solutions Engineer <i>·</i> GenAI <i>·</i> Agentic AI <i>·</i> Intelligent Automation</p>
        <p className="heroLead">I connect AI capabilities with software, automation and real business requirements — from technical discovery and POCs to working systems and stakeholder-facing delivery.</p>
        <div className="heroActions"><a className="btn primary" href="#work">Explore Selected Work <Icon type="arrow" /></a><a className="btn secondary" href="/Pooja_Pansare_AI_Engineer_Resume.pdf" download>Download Resume <Icon type="arrow" /></a><button className="btn ghost" onClick={() => setAssistantOpen(true)}>Ask Pooja’s AI <span className="pulse" /></button></div>
        <div className="contactMini"><a href="mailto:poojapansare1810@gmail.com"><Icon type="mail" /> Email</a><a href="/go/whatsapp" target="_blank" rel="noreferrer"><span className="waDot">W</span> WhatsApp</a><a href="https://www.linkedin.com/in/poojapansare1810" target="_blank" rel="noreferrer"><Icon type="linkedin" /> LinkedIn</a></div>
      </div>
      <aside className="heroProfile"><div className="profileMonogram">PP</div><span className="eyebrow">PROFESSIONAL PROFILE</span><h3>AI systems · software engineering · intelligent automation</h3><p>Nearly two years of enterprise delivery experience, backed by independent product and agentic-system builds.</p><div className="profileFacts"><div><b>10+</b><span>AI / automation POCs</span></div><div><b>200+</b><span>enterprise stakeholders</span></div><div><b>20%</b><span>POC-to-deal conversion</span></div><div><b>1,000+</b><span>daily transactions automated</span></div></div><div className="profileFoot">Open to international relocation · employer sponsorship required</div></aside>
    </section>

    <section id="signals" className="proof shell">
      <div className="proofLead"><span className="eyebrow">PROFESSIONAL SIGNALS</span><p>Evidence from enterprise delivery, measurable automation outcomes, stakeholder-facing work and independent systems building.</p></div>
      <div className="proofStats"><div><strong>10+</strong><span>enterprise POCs</span></div><div><strong>5+</strong><span>client engagements</span></div><div><strong>200+</strong><span>stakeholders</span></div><div><strong>2 yrs</strong><span>software + AI / automation</span></div></div>
    </section>

    <section className="build shell">
      <SectionHead eyebrow="01 / CAPABILITY" title="What I Build" desc="AI systems designed around operational context, reliable execution and measurable business outcomes." />
      <div className="capabilityGrid">{capabilities.map(([num, title, desc]) => <article key={num}><span>{num}</span><div><h3>{title}</h3><p>{desc}</p></div><Icon type="arrow" /></article>)}</div>
    </section>

    <section id="work" className="projects shell">
      <div className="workIntro"><SectionHead eyebrow="02 / SELECTED WORK" title="Independent AI Systems" desc="Two major product builds, followed by two focused system patterns. Each is presented through the problem, solution, execution and engineering value — without decorative project imagery." /><div className="workNote"><span>04</span><small>systems</small><b>Problem-led.<br />Architecture-aware.</b></div></div>
      <div className="projectGrid">{projects.map((p) => <article className={`projectCard ${p.accent} ${p.major ? 'major' : ''}`} key={p.id}>
        <div className="projectHeader"><div className="projectNumber">{p.num}</div><div><span className="eyebrow">{p.type}</span><h3>{p.title}</h3><h4>{p.subtitle}</h4></div><span className="projectMark">AI SYSTEM</span></div>
        <p className="projectDescription">{p.description}</p>
        <div className="projectDetails">
          <div><span className="detailLabel">PROBLEM</span><p>{p.problem}</p></div>
          <div><span className="detailLabel">SOLUTION APPROACH</span><p>{p.solution}</p></div>
          <div><span className="detailLabel">EXECUTION</span><p>{p.execution}</p></div>
          <div><span className="detailLabel">ENGINEERING VALUE</span><p>{p.value}</p></div>
        </div>
        <div className="projectFooter"><div className="tags">{p.stack.map((t) => <span key={t}>{t}</span>)}</div><span className="projectPrinciple">AI interprets · systems control · humans govern where required</span></div>
      </article>)}</div>
    </section>

    <section id="experience" className="experience shell">
      <SectionHead eyebrow="03 / PROFESSIONAL EXPERIENCE" title="Enterprise delivery, not just experimentation." desc="Software development, AI/GenAI, RPA, POC delivery, technical discovery, validation and stakeholder-facing solution work." />
      <div className="experienceLayout">
        <aside className="experienceAside"><span className="eyebrow">SKYMERIC TECHNOLOGIES PVT. LTD.</span><h3>Software Developer</h3><p>AI & RPA functional scope</p><div className="date">Jan 2024 — Oct 2025<br />Pune, India</div><div className="companyBadge">Agentic AI & RPA product company<br /><b>HPE ISV Partner · NVIDIA Inception Partner</b></div></aside>
        <div className="experienceMain">
          <div className="deliveryLine"><span>Requirement</span><i>→</i><span>Discovery</span><i>→</i><span>Solution design</span><i>→</i><span>Build</span><i>→</i><span>Validation</span><i>→</i><span>POC / Demo</span></div>
          <div className="impactGrid">
            <article><span>01</span><div><h4>Enterprise POC delivery</h4><p>Delivered 10+ AI and automation POCs across 5+ client engagements; achieved a 20% POC-to-deal conversion rate and contributed to 2 major contracts.</p></div></article>
            <article><span>02</span><div><h4>Generative AI data assistants</h4><p>Built Flowise, LlamaIndex and SQL-Llama based assistants for PDF, Excel, Word and CSV sources, reducing information retrieval time by 50%.</p></div></article>
            <article><span>03</span><div><h4>Agentic workflows & applications</h4><p>Designed 5+ Agentic AI workflows and built an HR Policy Approval application using Joget, ReactJS and a GenAI-powered Q&A assistant.</p></div></article>
            <article><span>04</span><div><h4>Enterprise automation</h4><p>Automated Tally ERP invoice processing and ledger reconciliation for 1,000+ daily transactions, reducing manual work by 60% and processing errors by approximately 95%.</p></div></article>
            <article><span>05</span><div><h4>API-connected RPA</h4><p>Built RPA workflows integrating Twilio, Amazon S3, Zerodha and Tally, reducing manual operational effort by 35%.</p></div></article>
            <article><span>06</span><div><h4>Testing & technical consulting</h4><p>Validated solutions with Postman and JMeter and supported on-site technical consulting and demonstrations for industrial AI / computer-vision use cases.</p></div></article>
          </div>
          <div className="case"><div><span className="eyebrow">SELECTED PROFESSIONAL CASE</span><h3>Seco Tools</h3><p>On-site technical consulting for a manufacturing enterprise, demonstrating computer-vision automation for item detection and counting. The technical presentation contributed to securing the project proposal.</p></div><div className="caseQuote">From requirement<br /><b>to working solution.</b></div></div>
        </div>
      </div>
    </section>

    <section className="industry shell">
      <div className="industryHead"><SectionHead eyebrow="04 / INDUSTRY EVIDENCE" title="Technology Beyond the Screen" desc="A compact record of technical representation across AI, enterprise technology, manufacturing, business and healthcare environments." /><div className="industryNumbers"><div><strong>5</strong><span>events</span></div><div><strong>200+</strong><span>stakeholders</span></div><div><strong>2024–25</strong><span>exposure</span></div></div></div>
      <div className="eventSwipeHint">Swipe / use the arrows to review each event</div>
      <div className="eventPanel"><div className="eventThumb"><Image src={event.image} alt={event.name} fill sizes="240px" /></div><div className="eventInfo"><div className="eventTopline"><span className="eyebrow">{event.role}</span><span className="eventCounter">{String(eventIndex + 1).padStart(2, '0')} / 05</span></div><h3>{event.name}</h3><p className="eventMeta">{event.city} · {event.date}</p><p>{event.body}</p><div className="eventControls"><button aria-label="Previous event" onClick={() => setEventIndex((eventIndex - 1 + events.length) % events.length)}>←</button><div className="eventProgress"><span style={{ width: `${((eventIndex + 1) / events.length) * 100}%` }} /></div><button aria-label="Next event" onClick={() => setEventIndex((eventIndex + 1) % events.length)}>→</button></div></div></div>
      <div className="eventTabs">{events.map((e, i) => <button key={e.name} className={i === eventIndex ? 'active' : ''} onClick={() => setEventIndex(i)}><span>{String(i + 1).padStart(2, '0')}</span>{e.short}</button>)}</div>
      <div className="industryClose"><p>Technology is not only something I build. It is something I explain, demonstrate and connect to real-world requirements.</p><div><span>Technical Depth</span><span>Business Context</span><span>Stakeholder Communication</span></div></div>
    </section>

    <section id="capabilities" className="skills shell">
      <div className="skillsTop"><SectionHead eyebrow="05 / TECHNICAL CAPABILITIES" title="A practical engineering stack." desc="Capabilities are grouped around the work: AI systems, application engineering, data, automation, quality and solution delivery." /><div className="stackStrip"><b>Tools used across work</b><span>Flowise</span><span>LlamaIndex</span><span>SQL-Llama</span><span>n8n</span><span>Joget</span><span>Postman</span><span>JMeter</span><span>Docker</span><span>AWS</span><span>Azure</span></div></div>
      <div className="skillsGrid">{skillGroups.map(([title, desc]) => <article key={title}><span className="skillNo">CAPABILITY</span><h3>{title}</h3><p>{desc}</p></article>)}</div>
    </section>

    <section className="education shell">
      <SectionHead eyebrow="06 / FOUNDATION" title="Education & Credentials" desc="A computer-science foundation strengthened through applied software, AI and automation work." />
      <div className="educationLayout"><div className="educationMain"><article><span className="eyebrow">M.SC. IN COMPUTER APPLICATIONS</span><h3>Modern College of Arts, Science & Commerce, Pune</h3><p>Savitribai Phule Pune University · 2023–2026</p><b>CGPA 8.11 · Final Grade A · First Class with Distinction</b></article><article><span className="eyebrow">BCA</span><h3>Savitribai Phule Pune University</h3><p>2019–2022</p><b>CGPA 8.0 · A+</b></article></div><aside className="credentialCard"><span className="eyebrow">PROFESSIONAL CREDENTIALS</span><h3>Artificial Intelligence Fundamentals</h3><p>IBM SkillsBuild · Issued 04 Sep 2026</p><a className="credentialLink" href="https://www.credly.com/badges/0ddde538-a7be-48f5-b16c-1c2c2f5e5da0" target="_blank" rel="noreferrer">View verified credential <Icon type="arrow" /></a><hr /><h3>AWS Solution Architect & Python Training</h3><p>3Ri Technologies · Certificate of Achievement · 21 Jan 2023 · Certificate ID 22874</p><hr /><span className="eyebrow">RECOGNITION</span><h3>2× Star Performer</h3><p>Client Appreciation Award — POC Excellence</p></aside></div>
      <div className="eduClose"><span>Resume</span><a href="/Pooja_Pansare_AI_Engineer_Resume.pdf" target="_blank" rel="noreferrer">View the full professional profile as PDF <Icon type="arrow" /></a></div>
    </section>

    <section id="contact" className="contact shell">
      <div className="contactHead"><SectionHead eyebrow="07 / CONTACT" title="Let’s build something useful." desc="For international opportunities, technical collaboration, AI systems work or a serious product conversation, start with the context." /><div className="contactMeta"><span>Based in Pune, India</span><span>Open to international relocation</span><span>Employer sponsorship required</span></div></div>
      <div className="contactGrid"><div className="contactPitch"><span className="eyebrow">DIRECT CONTACT</span><h3>Opportunity, technical discussion or collaboration — send the context.</h3><div className="contactLinks"><a href="mailto:poojapansare1810@gmail.com"><Icon type="mail" /> Email</a><a href="/go/whatsapp" target="_blank" rel="noreferrer"><span className="waDot">W</span> WhatsApp</a><a href="https://www.linkedin.com/in/poojapansare1810" target="_blank" rel="noreferrer"><Icon type="linkedin" /> LinkedIn</a></div><div className="contactResume"><span>Prefer the complete profile?</span><a href="/Pooja_Pansare_AI_Engineer_Resume.pdf" download>Download Resume <Icon type="arrow" /></a></div><div className="privacyNote">The portfolio does not display the phone number. WhatsApp routing is kept behind the site.</div></div>
        <form onSubmit={submitContact} className="contactForm"><label>Intent<select name="intent" value={intent} onChange={(e) => setIntent(e.target.value)}>{['Professional Opportunity', 'AI / Technical Discussion', 'Project Collaboration', 'CampusSyntra', 'Persynta', 'AI Operations Automation', 'AI Revenue Intelligence', 'Other'].map((x) => <option key={x}>{x}</option>)}</select></label><label>Name<input name="name" placeholder="Your name" required maxLength={80} /></label><label>Email / LinkedIn<input name="replyTo" placeholder="How should I reach you?" required maxLength={160} /></label><label>Message<textarea name="message" placeholder="What would you like to discuss?" rows={5} required maxLength={3000} /></label><input className="honeypot" name="website" tabIndex={-1} autoComplete="off" /><button className="btn primary" type="submit" disabled={contactState === 'sending'}>{contactState === 'sending' ? 'Sending…' : 'Send Message'} <Icon type="arrow" /></button>{contactMessage && <p className={`formStatus ${contactState}`}>{contactMessage}</p>}</form></div>
    </section>

    <footer className="footer shell"><div><b>Pooja Kailash Pansare</b><span>AI Solutions Engineer · GenAI · Agentic AI · Intelligent Automation</span></div><div className="footerLinks"><a href="/Pooja_Pansare_AI_Engineer_Resume.pdf" target="_blank" rel="noreferrer">Resume</a><a href="https://www.linkedin.com/in/poojapansare1810" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/poojapansare18" target="_blank" rel="noreferrer">GitHub</a><a href="mailto:poojapansare1810@gmail.com">Email</a><a href="/go/whatsapp" target="_blank" rel="noreferrer">WhatsApp</a></div><small>© {new Date().getFullYear()} Pooja Kailash Pansare</small></footer>

    <button className="floatingAI" onClick={() => setAssistantOpen(true)} aria-label="Open Pooja AI assistant">AI<span>Ask Pooja</span></button>

    {assistantOpen && <div className="overlay" onClick={() => setAssistantOpen(false)}><aside className="assistant" onClick={(e) => e.stopPropagation()}><div className="assistantHead"><div><span className="eyebrow">PORTFOLIO INTELLIGENCE</span><h3>Ask Pooja’s AI</h3></div><button onClick={() => setAssistantOpen(false)} aria-label="Close assistant">×</button></div><p className="assistantIntro">Ask about experience, projects, skills, education, credentials, industry exposure or professional contact options.</p><div className="chips">{['Who is Pooja?', 'What is CampusSyntra?', 'Tell me about Persynta', 'What are her strongest technical areas?', 'What measurable results has she delivered?'].map((x) => <button key={x} onClick={() => { setQuestion(x); setAnswer(''); }}>{x}</button>)}</div><div className="askRow"><input value={question} onChange={(e) => setQuestion(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && ask()} placeholder="Ask a question…" /><button onClick={ask} disabled={assistantLoading}>{assistantLoading ? '…' : 'Ask'}</button></div>{answer && <div className="answer"><span>ANSWER</span><p>{answer}</p></div>}<div className="assistantNote">Public portfolio knowledge only. No private credentials, secrets or proprietary implementation details.</div></aside></div>}
  </main>;
}
