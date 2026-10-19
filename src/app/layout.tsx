import type { Metadata, Viewport } from "next";
import { Newsreader, Public_Sans } from "next/font/google";
import { BackToTop, Footer, Header, MobileActionBar, PageTransition, ScrollReveal } from "@/components/layout";
import { JsonLd } from "@/components/ui";
import { organizationLd, websiteLd } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";
import styles from "./layout.module.css";

const serif = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif-face",
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz"],
});
const sans = Public_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  // Origin only: Next adds the sub-folder (basePath) to file-based images itself.
  metadataBase: new URL(new URL(absoluteUrl("/")).origin),
  title: {
    default: "Manpower Agency in Kathmandu, Nepal | Henna Enterprises",
    template: "%s | Henna Enterprises",
  },
  description: site.description,
  applicationName: site.shortName,
  keywords: [
    "manpower agency Nepal",
    "manpower company Kathmandu",
    "recruitment agency Nepal",
    "foreign employment Nepal",
    "Nepali workers for Saudi Arabia",
    "Nepali workers for UAE",
    "Gulf jobs from Nepal",
    "Henna Enterprises",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    type: "website",
    siteName: site.shortName,
    locale: site.locale,
    url: absoluteUrl("/"),
    title: "Henna Enterprises | Licensed Manpower Agency in Nepal",
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  formatDetection: { telephone: false },
  category: "business",
};

export const viewport: Viewport = {
  themeColor: "#fbfaf7",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${styles.root} ${serif.variable} ${sans.variable}`}>
      <body>
        <a href="#main" className={styles.skipLink}>
          Skip to content
        </a>
        <Header />
        <main id="main">
          {/* Page change: old page fades out, the new one fades up (styles in layout.module.css) */}
          <PageTransition enter={styles.pageEnter} exit={styles.pageExit}>
            {children}
          </PageTransition>
        </main>
        <Footer />
        <MobileActionBar />
        <BackToTop />
        <ScrollReveal />
        <JsonLd data={[organizationLd, websiteLd]} />
      </body>
    </html>
  );
}
