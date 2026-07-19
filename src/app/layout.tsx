import type { Metadata } from "next";
import { Archivo_Black, Geist, Geist_Mono } from "next/font/google";
import type { CSSProperties } from "react";
import { prospect } from "@/config/prospect";
import { Providers } from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Meridian United FC — Interactive Concept Preview",
  description: "A personalized Onzio club website and admin concept for Meridian United FC.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${archivoBlack.variable} h-full antialiased`}
    >
      <body
        className="min-h-full"
        style={{
          "--club-primary": prospect.branding.primaryColor,
          "--club-secondary": prospect.branding.secondaryColor,
          "--club-accent": prospect.branding.accentColor ?? prospect.branding.secondaryColor,
        } as CSSProperties}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
