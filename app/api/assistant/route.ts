import { NextResponse } from 'next/server';

const knowledge = `
Pooja Kailash Pansare is an AI Solutions Engineer focused on Generative AI, Agentic AI and Intelligent Automation. She is based in Pune, India and is open to international relocation worldwide, including the UAE. Employer sponsorship is required. She is 24 years old as of 8 October 2026 and turns 25 on 18 October 2026.

Professional experience: Software Developer at Skymeric Technologies Pvt. Ltd., January 2024 to October 2025, Pune. Functional scope included AI/GenAI, RPA, API integration, testing, POC development, requirement gathering, onsite setup and technical demonstrations. Skymeric is described as an Agentic AI & RPA product company and an HPE ISV Partner / NVIDIA Inception Partner at company level.

Professional evidence: 10+ enterprise AI and automation POCs across 5+ client engagements; 20% POC-to-deal conversion; contributed to 2 major contracts; 200+ enterprise stakeholders. Built Generative AI data assistants using Flowise, LlamaIndex and SQL-Llama for PDF, Excel, Word and CSV sources, reducing information retrieval time by 50%. Designed 5+ Agentic AI workflows. Built an HR Policy Approval application using Joget, ReactJS and a GenAI-powered Q&A assistant. Automated Tally ERP invoice processing and ledger reconciliation for 1,000+ daily transactions, reducing manual work by 60% and processing errors by approximately 95%. Built RPA workflows integrating Twilio, Amazon S3, Zerodha and Tally, reducing manual operational effort by 35%. Validated solutions with Postman and JMeter. Supported onsite technical consulting and demonstrations for industrial AI / computer-vision use cases, including Seco Tools.

Independent systems: CampusSyntra, Persynta, AI Operations Automation and AI Revenue Intelligence.
CampusSyntra is an AI-powered campus intelligence and operations platform. It provides a unified interface for campus information and academic workflows including attendance, fees, syllabus, examinations, scholarships and support. The backend uses FastAPI and PostgreSQL with authentication and structured academic models. Its AI-assisted question-paper workflow is driven by syllabus and assessment requirements. The engineering direction combines Next.js, TypeScript, FastAPI, Python, PostgreSQL, JWT, LLMs, RAG, AI agents, n8n and Docker.
Persynta is a personal AI / voice agent platform centered on a persistent Digital Friend identity. It turns user intentions into scheduled, conversational follow-through actions through a dedicated interaction point. The system covers reminders, tasks, rescheduling, checklists and completion tracking; it also includes personal memory and semantic retrieval, multi-user isolation, asynchronous scheduling, retry / escalation workflows and real-time state updates. Its technology direction includes Agentic AI, conversational AI, LLMs, STT/TTS, telephony APIs, REST APIs and PostgreSQL-oriented architecture.
AI Operations Automation is an independent n8n-based system pattern where AI interprets and structures business requests, deterministic rules control execution, human approval is used where required, and automation executes with auditability.
AI Revenue Intelligence is an independent sales and deal intelligence system pattern combining structured sales data, internal sales knowledge and AI analysis to assess fit, risk and next-best actions, with human approval before business-changing actions.

Education: M.Sc. Computer Applications, Modern College of Arts, Science and Commerce (Autonomous), Pune, Savitribai Phule Pune University, 2023–2026, CGPA 8.11, First Class with Distinction. BCA, Savitribai Phule Pune University, 2019–2022, Grade A+.

Credentials: Artificial Intelligence Fundamentals — IBM SkillsBuild, issued 4 September 2026, verified on Credly at https://www.credly.com/badges/0ddde538-a7be-48f5-b16c-1c2c2f5e5da0. AWS Solution Architect & Python Training — 3Ri Technologies Certificate of Achievement, issued 21 January 2023, Certificate ID 22874. Do not describe the 3Ri credential as an AWS-issued certification.

Recognition: 2x Star Performer of the Month; Client Appreciation Award — POC Excellence.
Industry exposure: HPE Discover More AI 2024, NVIDIA AI Summit 2024, IMTEX 2025, IIMBue 2025 and The 5th Edition Healthcare Summit 2025. The portfolio presents these as technical representation / stakeholder-facing industry exposure, not as employment or personal partnerships with the event brands.

Public contact options: Email poojapansare1810@gmail.com, LinkedIn linkedin.com/in/poojapansare1810, GitHub github.com/poojapansare18, and WhatsApp through the portfolio's protected routing link. The public portfolio does not display the phone number.
`;

function fallback(question: string) {
  const q = question.toLowerCase();
  if (q.includes('age') || q.includes('old')) return 'Pooja is 24 years old as of 8 October 2026. She turns 25 on 18 October 2026.';
  if (q.includes('experience') || q.includes('skymeric')) return 'Pooja worked as a Software Developer at Skymeric Technologies from January 2024 to October 2025, with a functional focus on AI/GenAI, RPA, APIs, testing, POCs and technical solution delivery.';
  if (q.includes('campussyntra') || q.includes('campus')) return 'CampusSyntra is Pooja’s AI-powered campus intelligence and operations platform, combining institutional data, academic workflows and AI-assisted operations through a unified application layer.';
  if (q.includes('persynta') || q.includes('digital friend')) return 'Persynta is a personal AI / voice agent platform centered on a persistent Digital Friend identity, conversational follow-through, controlled memory and bounded agentic workflows.';
  if (q.includes('skill') || q.includes('technology')) return 'Her strongest capability areas include Generative AI, LLM applications, RAG, Agentic AI, Python/FastAPI, React/Next.js, PostgreSQL, RPA, workflow automation, cloud and solution engineering.';
  if (q.includes('result') || q.includes('impact') || q.includes('metric')) return 'Selected measurable outcomes include 10+ enterprise POCs, 20% POC-to-deal conversion, 50% faster information retrieval, 60% less manual Tally work, approximately 95% fewer processing errors, 35% lower manual operational effort and 1,000+ daily transactions automated.';
  if (q.includes('education') || q.includes('degree')) return 'Pooja has an M.Sc. in Computer Applications with CGPA 8.11 and First Class with Distinction, plus a BCA with Grade A+.';
  if (q.includes('certificate') || q.includes('credential') || q.includes('ibm')) return 'Pooja holds IBM SkillsBuild Artificial Intelligence Fundamentals, issued 4 September 2026, with a verified Credly credential, plus a 3Ri Technologies Certificate of Achievement for AWS Solution Architect & Python Training.';
  if (q.includes('contact') || q.includes('email') || q.includes('linkedin') || q.includes('github')) return 'You can reach Pooja through the Email, LinkedIn, GitHub and protected WhatsApp options on this portfolio.';
  if (q.includes('event') || q.includes('summit') || q.includes('imtex')) return 'Her industry exposure includes HPE Discover More AI 2024, NVIDIA AI Summit 2024, IMTEX 2025, IIMBue 2025 and The 5th Edition Healthcare Summit 2025.';
  return 'I can answer questions about Pooja’s public experience, projects, skills, education, credentials, industry exposure and professional contact options.';
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const question = String(body.question || '').trim();
    if (!question || question.length > 500) return NextResponse.json({ error: 'Please enter a question up to 500 characters.' }, { status: 400 });

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return NextResponse.json({ answer: fallback(question), mode: 'controlled-fallback' });

    const model = process.env.OPENAI_MODEL || 'gpt-5.6-luna';
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        input: [
          { role: 'system', content: `You are Pooja Pansare's public portfolio assistant. Answer only from the controlled knowledge below. Never invent employers, project status, certifications, contact details, metrics or private implementation details. Distinguish measured professional outcomes from independent-project objectives. If the knowledge does not support the answer, say that the portfolio does not publish that information. Keep answers concise and professional.\n\n${knowledge}` },
          { role: 'user', content: question },
        ],
        max_output_tokens: 240,
      }),
    });
    const data = await response.json();
    if (!response.ok) return NextResponse.json({ answer: fallback(question), mode: 'controlled-fallback' });
    const text = typeof data.output_text === 'string' ? data.output_text.trim() : '';
    return NextResponse.json({ answer: text || fallback(question), mode: text ? 'llm' : 'controlled-fallback' });
  } catch {
    return NextResponse.json({ answer: 'The portfolio assistant is temporarily unavailable. Please use the contact options instead.' }, { status: 500 });
  }
}
