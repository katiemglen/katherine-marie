import type { Metadata } from "next";
import "./globals.css";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import LeafDecoration from "@/components/LeafDecoration";

export const metadata: Metadata = {
  title: "Katherine Marie — Adventures in Living",
  description: "Two road trips. Thousands of miles. Endless stories.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ConvexClientProvider>
          <LeafDecoration />
          <Navigation />
          <main className="relative z-10">{children}</main>
          <Footer />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
