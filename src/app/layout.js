import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { Archivo, Public_Sans, JetBrains_Mono } from 'next/font/google';

const disp = Archivo({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-disp',
});

const body = Public_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-body',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata = {
  title: 'Himanshu Pant — Data Engineer',
  description:
    'Data Engineer, five years building batch and streaming pipelines on Spark, Databricks, Snowflake and AWS — and the reconciliation frameworks that prove the data is right.',
  metadataBase: new URL('https://himanshupant.dev'),
  openGraph: {
    title: 'Himanshu Pant — Data Engineer',
    description:
      'I build the pipelines underneath things, and I can prove the data is right when I am done.',
    url: 'https://himanshupant.dev',
    siteName: 'Himanshu Pant',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Himanshu Pant — Data Engineer',
    description:
      'I build the pipelines underneath things, and I can prove the data is right when I am done.',
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  colorScheme: 'light dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${disp.variable} ${body.variable} ${mono.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
