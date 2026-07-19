import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Lions Football Club — Interactive Concept Preview",
  description: "A personalized Onzio club website and admin concept for Lions Football Club.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
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
