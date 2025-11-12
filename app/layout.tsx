import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import BackToTop from "@/components/ui/BackToTop";
import FloatingConsultationCta from "@/components/ui/FloatingConsultationCta";

// Modern, minimal sans-serif
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Minimal monospaced font for headings or code blocks
const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "SPARKHOUSE",
  description: "Architectural and design consultancy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
        <Navbar />
        {children}
        <FloatingConsultationCta />
        <BackToTop />
        <Footer />
      </body>
    </html>
  );
}
