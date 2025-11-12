import type { ReactNode } from "react";
import type { Metadata } from "next";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Roboto } from "next/font/google";

const robotoFont = Roboto({
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Manage your notes efficiently",
  openGraph: {
    title: "NoteHub — Smart Note Management",
    description: "Organize, edit, and manage your notes efficiently with NoteHub.",
    url: "https://notehub.goit.global/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Open Graph Image",
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <html lang="en" className={robotoFont.variable}>
      <body>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Toaster position="top-right" reverseOrder={false} />
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}