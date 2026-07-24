import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "EvoEstate — Property, intelligently connected",
    template: "%s · EvoEstate",
  },
  description: "Premium real-estate advisory and an intelligent operating platform for modern agencies.",
  keywords: ["real estate CRM", "property management", "real estate agency", "property Algiers", "EvoEstate"],
  openGraph: {
    title: "EvoEstate — Move forward. Beautifully.",
    description: "Exceptional property and a quieter, more intelligent real-estate experience.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "EvoEstate property advisory" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EvoEstate — Move forward. Beautifully.",
    description: "Exceptional property. Intelligent advisory.",
    images: ["/og.png"],
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "EvoEstate Advisory",
    url: "https://evoestate.example",
    telephone: "+213560001010",
    address: { "@type": "PostalAddress", streetAddress: "12 Rue des Oliviers", addressLocality: "Hydra", addressRegion: "Algiers", addressCountry: "DZ" },
  };
  return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable}`}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}/>{children}</body></html>;
}
