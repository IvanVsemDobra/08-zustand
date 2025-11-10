import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | NoteHub",
  description:
    "The page you’re looking for doesn’t exist or has been moved.",
  openGraph: {
    title: "Page Not Found | NoteHub",
    description:
      "The page you’re looking for doesn’t exist or has been moved.",
    url: "https://your-vercel-app.vercel.app/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div>
      <h1>404 — Page Not Found</h1>
      <p>The page you’re trying to open doesn’t exist.</p>
    </div>
  );
}