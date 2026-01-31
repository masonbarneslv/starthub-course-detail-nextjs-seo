import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  // Helps OG/canonical become absolute if needed.
  // If you don’t have a real domain yet, leaving example.com is okay.
  metadataBase: new URL("https://example.com"),
  title: "StartHub Courses",
  description: "SEO-optimized course detail pages built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}