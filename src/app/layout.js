import './globals.css';
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Himanshu Pant — Software Engineer',
  description:
    'Software Engineer with 5+ years in data & backend engineering. M.S. in Software Engineering (AI) at ASU. Building systems that scale.',
  metadataBase: new URL('https://himanshupant.dev'),
  openGraph: {
    title: 'Himanshu Pant — Software Engineer',
    description:
      'Software Engineer with 5+ years in data & backend engineering. Building systems that scale.',
    url: 'https://himanshupant.dev',
    siteName: 'Himanshu Pant',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Himanshu Pant — Software Engineer',
    description:
      'Software Engineer with 5+ years in data & backend engineering. Building systems that scale.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}