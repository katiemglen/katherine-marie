import type { Metadata } from "next";
import "./globals.css";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Katherine Marie | Travel Stories",
  description: "Follow Katie and Chad on epic road trips across America.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-jungle-pattern min-h-screen">
        <ConvexClientProvider>
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
