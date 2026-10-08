import { NextResponse } from 'next/server';

const messages:Record<string,string>={
 recruiter:'Hi Pooja, I would like to discuss an international AI / GenAI / Agentic AI opportunity with you.',
 persynta:'Hi Pooja, I would like to know more about the Persynta project. I have a question about the architecture, implementation or current status.',
 campus:'Hi Pooja, I would like to know more about CampusSyntra. I have a question about its architecture, AI workflow or implementation.',
 invoice:'Hi Pooja, I would like to know more about the Intelligent Invoice Automation project. I have a question about the UiPath workflow, Tally integration or current implementation.'
};

export function GET(request:Request){
 const base=process.env.WHATSAPP_DESTINATION_URL;
 if(!base)return NextResponse.redirect(new URL('/#contact',request.url));
 const url=new URL(base);
 const params=new URL(request.url).searchParams;
 const project=params.get('project')||'';
 const context=params.get('context')||'';
 const message=project?(messages[project]||messages.recruiter):(messages[context]||messages.recruiter);
 url.searchParams.set('text',message);
 return NextResponse.redirect(url);
}
