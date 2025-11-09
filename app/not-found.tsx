'use client';

import css from './Home.module.css';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 – Page Not Found',
  description:
    'This page does not exist. You may have mistyped the address or the page may have been moved.',
  openGraph: {
    title: '404 – Page Not Found',
    description:
      'Sorry, the page you are looking for does not exist. Return to the homepage.',
    url: 'https://your-domain.com/not-found',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Not found page illustration',
      },
    ],
  },
};

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    // Редірект через 3 секунди
    const timer = setTimeout(() => router.push('/'), 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;