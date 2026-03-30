import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Engagely — Turn Every Visit Into a Conversation",
  description:
    "Interactive AI agent for B2B websites. Replace static pages with real-time conversational product experiences. 21x higher conversion than traditional websites.",
  keywords: [
    "AI agent",
    "interactive demo",
    "B2B sales",
    "conversational AI",
    "website widget",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
