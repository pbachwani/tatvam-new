import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import LenisProvider from "../components/LenisProvider";
import { ViewTransitions } from "next-view-transitions";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Tatvam",
  description: "Architecture Studio based in Jaipur",
};

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body>
          <LenisProvider>
            <Navbar />
            {children}
          </LenisProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
