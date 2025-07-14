import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SessionProvider } from "@/components/SessionProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SEO Tools & Services | Boost Your Business Online",
  description: "Professional SEO tools and services to increase your business's online visibility. Free SEO audit, keyword research, and comprehensive SEO solutions.",
  keywords: "SEO tools, SEO services, keyword research, SEO audit, search engine optimization, digital marketing, business growth",
  authors: [{ name: "SEO Expert" }],
  creator: "SEO Tools Portfolio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://seo-tools-portfolio.vercel.app",
    title: "SEO Tools & Services | Boost Your Business Online",
    description: "Professional SEO tools and services to increase your business's online visibility. Free SEO audit, keyword research, and comprehensive SEO solutions.",
    siteName: "SEO Tools Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Tools & Services | Boost Your Business Online",
    description: "Professional SEO tools and services to increase your business's online visibility. Free SEO audit, keyword research, and comprehensive SEO solutions.",
    creator: "@seoexpert",
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://seo-tools-portfolio.vercel.app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
