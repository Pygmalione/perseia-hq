import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Geist_Mono } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Imperialska Galeria Persei",
  description: "Ciepła, kuratorska galeria cyfrowa zbudowana według standardów kwietnia 2026.",
};

/**
 * Renders the application's root HTML layout and applies global font variables and base layout classes.
 *
 * @param children - The React nodes to be rendered inside the document body.
 * @returns The root `<html>` element containing a `<body>` that wraps `children` with global font and layout classes.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
