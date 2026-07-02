import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["500", "600", "700"],
});

// TODO: replace with your production domain before deploying.
const siteUrl = "https://blueframeai.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "blueframeAI — Intelligent Infrastructure for the Enterprise",
    template: "%s | blueframeAI",
  },
  description:
    "blueframeAI gives enterprises the intelligent infrastructure to design, deploy, and scale AI-native products — without the complexity.",
  keywords: [
    "blueframeAI",
    "AI infrastructure",
    "enterprise AI platform",
    "AI automation",
    "machine learning infrastructure",
  ],
  applicationName: "blueframeAI",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "blueframeAI",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "blueframeAI",
    title: "blueframeAI — Intelligent Infrastructure for the Enterprise",
    description:
      "Design, deploy, and scale AI-native products with intelligent infrastructure built for the enterprise.",
    images: [{ url: "/icons/icon-512x512.png", width: 512, height: 512, alt: "blueframeAI" }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "blueframeAI — Intelligent Infrastructure for the Enterprise",
    description:
      "Design, deploy, and scale AI-native products with intelligent infrastructure built for the enterprise.",
    images: ["/icons/icon-512x512.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0F172A",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-background font-sans text-slate-100 antialiased">
        {children}

        {/* Register the service worker after the page is interactive */}
        <Script id="sw-register" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function () {
                navigator.serviceWorker.register('/sw.js').catch(function (err) {
                  console.error('Service worker registration failed:', err);
                });
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}
