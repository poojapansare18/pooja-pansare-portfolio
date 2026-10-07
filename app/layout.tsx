import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pooja Kailash Pansare | AI Solutions Engineer',
  description: 'AI Solutions Engineer focused on GenAI, Agentic AI, Intelligent Automation and practical AI systems.',
  keywords: ['AI Solutions Engineer', 'Generative AI', 'Agentic AI', 'Intelligent Automation', 'RAG', 'AI Agents', 'POC Development'],
  authors: [{ name: 'Pooja Kailash Pansare' }],
  creator: 'Pooja Kailash Pansare',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Pooja Kailash Pansare | AI Solutions Engineer',
    description: 'GenAI · Agentic AI · Intelligent Automation · Solution Engineering',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
