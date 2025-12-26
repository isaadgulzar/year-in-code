import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/react";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://yearincode.xyz'),

  title: "Year in Code - Your AI Coding Year Wrapped",
  description: "Generate beautiful Spotify Wrapped-style reports for your Claude Code usage. See your tokens, streaks, top models, and more. 100% privacy-first, completely free.",

  // Icons
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/logo.png',
      },
    ],
  },

  // Manifest for PWA
  manifest: '/manifest.json',

  // Open Graph (Facebook, LinkedIn, Discord)
  openGraph: {
    title: "Year in Code - Your AI Coding Year Wrapped",
    description: "Generate beautiful Spotify Wrapped-style reports for your Claude Code usage. 100% privacy-first, completely free.",
    url: "https://yearincode.xyz",
    siteName: "Year in Code",
    images: [
      {
        url: "/year-in-code-og-image.png",
        width: 1200,
        height: 630,
        alt: "Year in Code - AI Coding Year Wrapped",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "Year in Code - Your AI Coding Year Wrapped",
    description: "Generate beautiful Spotify Wrapped-style reports for your Claude Code usage. 100% privacy-first.",
    images: ["/year-in-code-og-image.png"],
    // Add your Twitter handle here when you have one
    // creator: "@yourtwitterhandle",
  },

  // Additional metadata for SEO
  keywords: [
    "claude code",
    "ai coding",
    "wrapped",
    "year in review",
    "coding stats",
    "developer tools",
    "ai assistant",
    "coding analytics",
    "spotify wrapped for code",
    "github wrapped",
    "coding year wrapped",
    "ai code assistant stats",
    "claude usage stats",
    "developer analytics",
    "code metrics",
    "programming statistics"
  ],
  authors: [{ name: "Year in Code", url: "https://saadgulzar.dev" }],
  creator: "Saad Gulzar",
  publisher: "Year in Code",

  // Misc
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Verification tags (add when you have them)
  // verification: {
  //   google: 'your-google-verification-code',
  //   yandex: 'your-yandex-verification-code',
  // },

  // Category
  category: 'Technology',

  // Alternative languages
  alternates: {
    canonical: 'https://yearincode.xyz',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Year in Code',
    description: 'Generate beautiful Spotify Wrapped-style reports for your Claude Code usage. 100% privacy-first.',
    url: 'https://yearincode.xyz',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Person',
      name: 'Saad Gulzar',
      url: 'https://saadgulzar.dev',
    },
    creator: {
      '@type': 'Person',
      name: 'Saad Gulzar',
      url: 'https://saadgulzar.dev',
    },
  };

  return (
    <html lang="en">
      <head>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${jetbrainsMono.variable} font-sans antialiased`}
        style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
      >
        <Navbar />
        {children}

        {/* Hidden backlink for SEO (not visible to users) */}
        <div className="sr-only" aria-hidden="true">
          <a href="https://saadgulzar.dev" rel="author">Saad Gulzar</a>
        </div>

        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
