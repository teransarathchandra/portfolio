import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/nav/Navbar";
import GridOverlay from "@/components/layout/GridOverlay";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import LiquidGlassCursor from "@/components/effects/LiquidGlassCursor";
import StarMeshBackgroundMount from "@/components/effects/StarMeshBackgroundMount";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Teran Sarathchandra — Software Engineer",
  description:
    "I build performant, accessible web applications with modern tooling. Explore my portfolio, projects, and experience.",
  openGraph: {
    title: "Teran Sarathchandra — Software Engineer",
    description:
      "I build performant, accessible web applications with modern tooling.",
    type: "website",
    locale: "en_US",
    siteName: "Teran Sarathchandra Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Teran Sarathchandra — Software Engineer",
    description:
      "I build performant, accessible web applications with modern tooling.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" style={{ colorScheme: 'dark' }}>
      <head>
        <meta name="theme-color" content="#121212" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-primary-text`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-background focus:font-semibold focus:shadow-lg"
        >
          Skip to main content
        </a>
        <SmoothScrollProvider />
        <StarMeshBackgroundMount />
        <GridOverlay />
        <LiquidGlassCursor />
        <Navbar />
        <main id="main-content" role="main" className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
