"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";
import Navbar from "./components/landing/Navbar";
import Footer from "./components/landing/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/Admin");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {!isAdmin && <Navbar />}
        {children}
        {!isAdmin && <Footer />}
      </body>
    </html>
  );
}
