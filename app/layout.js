import { Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${inter.variable}`}
    >
      <body className="font-sans bg-[#0c0604] text-amber-50 antialiased">
        {children}
      </body>
    </html>
  );
}

export const metadata = {
  title: "Anshika Agrawal | Kathak Maestro - Jaipur Gharana",
  description:
    "Anshika Agrawal — Where Tradition Meets Timeless Grace. Celebrated Kathak virtuoso of the Jaipur Gharana.",
  keywords: [
    "Anshika Kathak",
    "anshikakathak",
    "Kathak dancer",
    "Aligarh",
    "Mumbai",
    "Prayag Sangeet Samiti",
    "Allahabad",
    "Delhi University",
    "Doordarshan",
    "SPIC MACAY",
    "Ganesh Acharya",
    "Rekha Ji",
  ],
  metadataBase: new URL("https://anshikakathak.com"),
  openGraph: {
    title: "Anshika Kathak",
    description: "Official website of Anshika Kathak",
    url: "https://anshikakathak.com",
    siteName: "Anshika Kathak",
    type: "website",
  },
  alternates: {
    canonical: "https://anshikakathak.com",
  },
};
