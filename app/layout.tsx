import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Poppins, Inter } from "next/font/google";
import { AppContextProvider } from "@/context/AppContext";
import AppLayout from "@/components/AppLayout";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LensCraft Studio | Premium Wedding Photography & Films",
  description: "Capturing India's most beautiful wedding stories with luxury editorial styling, candid authenticity, and cinematic excellence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-primary-bg text-text-primary">
        <AppContextProvider>
          <AppLayout>{children}</AppLayout>
        </AppContextProvider>
      </body>
    </html>
  );
}
