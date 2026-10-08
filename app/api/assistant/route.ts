import { NextResponse } from 'next/server';

const knowledge = `
Pooja Kailash Pansare is an AI Engineer focused on Generative AI, Agentic AI and Intelligent Automation. She is based in Pune, India and is open to relocation anywhere and international opportunities. Employer sponsorship is required.

Professional experience: Software Developer at Skymeric Technologies Pvt. Ltd., January 2024 to October 2025, Pune. Functional scope included AI/GenAI, RPA, API integration, testing, POC development, requirement gathering, technical consulting and demonstrations. Skymeric is an Agentic AI & RPA product company and an HPE ISV Partner / NVIDIA Inception Partner at company level.

Professional evidence: 10+ enterprise AI and automation POCs across 5+ client engagements; 20% POC-to-deal conversion; contribution to 2 major contracts; 200+ enterprise stakeholders. Built Generative AI data assistants using Flowise, LlamaIndex and SQL-Llama for PDF, Excel, Word and CSV sources, reducing information retrieval time by 50%. Designed 5+ Agentic AI workflows. Built an HR Policy Approval application using Joget, ReactJS and a GenAI-powered Q&A assistant. Professional Tally ERP automation is stated as covering 1,000+ daily transactions, reducing manual work by 60% and processing errors by approximately 95%. Built RPA workflows integrating Twilio, Amazon S3, Zerodha and Tally, reducing manual operational effort by 35%. Validated solutions with Postman and JMeter. Supported onsite technical consulting and demonstrations for industrial AI / computer-vision use cases, including Seco Tools.

Selected independent systems:
Persynta is an AI Personal Follow-Through Platform centered on a persistent Digital Friend identity. It is designed around voice interaction, memory, scheduled interventions, reminders, tasks, rescheduling, checklists, completion tracking and controlled agentic workflows. The architecture is being developed around LLMs, voice/STT/TTS, telephony APIs, REST services, PostgreSQL and asynchronous scheduling.
CampusSyntra is an AI-Native Campus Operations Platform connecting institutional data, academic workflows and AI-assisted operations. Its foundation uses Next.js, TypeScript, FastAPI, Python, PostgreSQL and JWT. It includes an AI-assisted question-paper workflow driven by syllabus and assessment requirements. It is an independent system/product build, not presented as a university-wide production deployment.
Intelligent Invoice Automation is an in-progress UiPath + Tally ERP workflow. Tested evidence includes Gmail-triggered invoice attachment intake, PDF download and parsing, extraction of three sample line items (Laptop 2 x ₹50,000; Keyboard 5 x ₹1,000; Mouse 5 x ₹500) and a calculated total of ₹107,500 matching the invoice total. The validation gate is established; Tally voucher creation and end-to-end reconciliation remain in progress. Do not describe the Tally integration as completed.

Industry exposure: Pooja represented her company as a technical representative across five major industry summits and exhibitions in India: HPE Discover More AI 2024, NVIDIA AI Summit 2024, IMTEX 2025, IIMBue 2025 and The 5th Edition Healthcare Summit 2025. This is presented as technical representation and stakeholder-facing industry exposure, not as employment or personal partnership with those event brands.

Education: M.Sc. Computer Applications, Modern College of Arts, Science and Commerce (Autonomous), Pune, Savitribai Phule Pune University, 2023–2026, CGPA 8.11, First Class with Distinction. BCA, Savitribai Phule Pune University, 2019–2022, Grade A+.

Credentials: Artificial Intelligence Fundamentals — IBM SkillsBuild, issued 4 September 2026, verified on Credly at https://www.credly.com/badges/0ddde538-a7be-48f5-b16c-1c2c2f5e5da0. AWS Solution Architect & Python Training — 3Ri Technologies Certificate of Achievement, issued 21 January 2023, Certificate ID 22874. Do not describe the 3Ri credential as an AWS-issued certification.

Recognition: 2x Star Performer of the Month; Client Appreciation Award — POC Excellence.

Public contact options: Email poojapansare1810@gmail.com, LinkedIn linkedin.com/in/poojapansare1810, GitHub github.com/poojapansare18 and protected WhatsApp routing. The phone number is not displayed publicly.
`;

function fallback(question:string){
 const q=question.toLowerCase();
 if(q.includes('experience')||q.includes('skymeric'))return 'Pooja worked as a Software Developer at Skymeric Technologies from January 2024 to October 2025, with a functional focus on AI/GenAI, RPA, APIs, testing, POCs, technical consulting and solution delivery.';
 if(q.includes('campussyntra')||q.includes('campus'))return 'CampusSyntra is Pooja’s AI-Native Campus Operations Platform, combining institutional data, academic workflows and AI-assisted operations through a unified application layer.';
 if(q.includes('persynta')||q.includes('digital friend'))return 'Persynta is an AI Personal Follow-Through Platform centered on a persistent Digital Friend identity, voice interaction, memory and controlled agentic workflows.';
 if(q.includes('invoice')||q.includes('uipath')||q.includes('tally'))return 'The Intelligent Invoice Automation project is in progress. Tested evidence includes email attachment intake, PDF parsing, three sample line items and a calculated total of ₹107,500 matching the invoice total. Tally voucher creation and end-to-end reconciliation are still being developed.';
 if(q.includes('skill')||q.includes('technology'))return 'Key capability areas include Generative AI, LLM applications, RAG, Agentic AI, Python/FastAPI, React/Next.js, PostgreSQL, UiPath, n8n, workflow automation and solution engineering.';
 if(q.includes('result')||q.includes('impact')||q.includes('metric'))return 'Selected professional outcomes include 10+ enterprise POCs, 20% POC-to-deal conversion, 50% faster information retrieval, 60% less manual Tally work, approximately 95% fewer processing errors, 35% lower manual operational effort and 1,000+ daily transactions automated.';
 if(q.includes('education')||q.includes('degree'))return 'Pooja has an M.Sc. in Computer Applications with CGPA 8.11 and First Class with Distinction, plus a BCA with Grade A+.';
 if(q.includes('certificate')||q.includes('credential')||q.includes('ibm'))return 'Pooja holds IBM SkillsBuild Artificial Intelligence Fundamentals with a verified Credly credential, plus a 3Ri Technologies Certificate of Achievement for AWS Solution Architect & Python Training.';
 if(q.includes('contact')||q.includes('email')||q.includes('linkedin')||q.includes('github'))return 'Pooja can be reached through the Email, LinkedIn, GitHub and protected WhatsApp options on this portfolio.';
 if(q.includes('event')||q.includes('summit')||q.includes('imtex'))return 'Pooja represented her company as a technical representative across five major industry summits and exhibitions in India, including HPE Discover More AI, NVIDIA AI Summit, IMTEX, IIMBue and the Healthcare Summit.';
 return 'I can answer questions about Pooja’s public experience, projects, skills, education, credentials, industry exposure and professional contact options.';
}

export async function POST(request:Request){
 try{
  const body=await request.json();const question=String(body.question||'').trim();
  if(!question||question.length>500)return NextResponse.json({error:'Please enter a question up to 500 characters.'},{status:400});
  const apiKey=process.env.OPENAI_API_KEY;
  if(!apiKey)return NextResponse.json({answer:fallback(question),mode:'controlled-fallback'});
  const model=process.env.OPENAI_MODEL||'gpt-5.6-luna';
  const response=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{Authorization:'Bearer '+apiKey,'Content-Type':'application/json'},body:JSON.stringify({model,input:[{role:'system',content:'You are Pooja Pansare’s public portfolio assistant. Answer only from the controlled knowledge below. Never invent employers, project status, certifications, contact details, metrics or private implementation details. Distinguish measured professional outcomes from independent-project objectives and in-progress work. Keep answers concise and professional.\n\n'+knowledge},{role:'user',content:question}],max_output_tokens:240})});
  const data=await response.json();if(!response.ok)return NextResponse.json({answer:fallback(question),mode:'controlled-fallback'});
  const output=typeof data.output_text==='string'?data.output_text.trim():'';
  return NextResponse.json({answer:output||fallback(question),mode:output?'llm':'controlled-fallback'});
 }catch{return NextResponse.json({answer:'The portfolio assistant is temporarily unavailable. Please use the direct contact options instead.'},{status:500})}
}