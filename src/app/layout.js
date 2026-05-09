import './globals.css';
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Himanshu Pant — Data Engineer | AI & Infrastructure',
  description:
    'Data Engineer specializing in large-scale ETL/ELT pipelines, real-time data infrastructure, and AI/ML systems. Built production platforms processing 100M-1B records with 66-86% performance improvements.',
  metadataBase: new URL('https://himanshupant.dev'),
  openGraph: {
    title: 'Himanshu Pant — Data Engineer | AI & Infrastructure',
    description:
      'Data Engineer specializing in large-scale data pipelines, real-time systems, and AI/ML infrastructure. Processing 100M-1B records at scale.',
    url: 'https://himanshupant.dev',
    siteName: 'Himanshu Pant',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Himanshu Pant — Data Engineer | AI & Infrastructure',
    description:
      'Data Engineer specializing in large-scale data pipelines, real-time systems, and AI/ML infrastructure. Processing 100M-1B records at scale.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}<Analytics /></body>
    </html>
  );
}