// app/layout.tsx
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/Providers";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Aggregator - Multiple AI Services in One Chat",
  description: "Access OpenAI, Anthropic, Google and other AI models all from a single, unified interface.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}