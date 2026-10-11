import type { Metadata, Viewport } from "next";
import { Inter, Montserrat, Noto_Nastaliq_Urdu } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

// Only used for the Urdu name — not preloaded so it never competes with the hero.
const nastaliq = Noto_Nastaliq_Urdu({
  variable: "--font-nastaliq",
  subsets: ["arabic"],
  weight: ["700"],
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Former MNA · Pakistan Tehreek-e-Insaf`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    title: site.name,
    description: site.description,
    images: ["/images/with-imran-khan.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@aijaz_ch",
  },
};

export const viewport: Viewport = {
  themeColor: "#053b22",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} ${nastaliq.variable} antialiased`}>
      <body className="min-h-screen bg-white">{children}</body>
    </html>
  );
}
