import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Source_Sans_3, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { organizationLd, webSiteLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/utils";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SHIVAM ITCS — AI Infrastructure & Agentic Systems Partner | India",
    template: "%s | SHIVAM ITCS",
  },
  description:
    "We cut AI & cloud costs by 40–70% using Commander Architecture — autonomous multi-agent systems built for enterprise. 18+ years. India & Global.",
  applicationName: "SHIVAM ITCS",
  authors: [{ name: "Vijay Paliwal", url: SITE_URL }],
  creator: "Vijay Paliwal",
  keywords: [
    "Agentic AI",
    "Multi-Agent Systems",
    "Commander Architecture",
    "AI Infrastructure",
    "LLM Cost Optimization",
    "Legacy .NET Modernization",
    "HealthTech Software",
    "Next.js SaaS Development",
    "SHIVAM ITCS",
    "Vijay Paliwal",
    "AI India",
    "shivamitcs.in",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "SHIVAM ITCS",
    title: "SHIVAM ITCS — AI Infrastructure & Agentic Systems Partner",
    description:
      "We cut AI & cloud costs by 40–70% using Commander Architecture — autonomous multi-agent systems built for enterprise. 18+ years. India & Global.",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SHIVAM ITCS — AI Infrastructure & Cost Optimization Partner",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SHIVAM ITCS — AI Infrastructure & Agentic Systems Partner",
    description:
      "We cut AI & cloud costs by 40–70% using Commander Architecture — autonomous multi-agent systems built for enterprise. 18+ years. India & Global.",
    images: ["/og-image.jpg"],
  },
  other: {
    "geo.region": "IN-RJ",
    "geo.placename": "Nathdwara, Rajasthan, India",
    "geo.position": "24.9383;73.8262",
    ICBM: "24.9383, 73.8262",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0D10",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteLd()) }}
        />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
