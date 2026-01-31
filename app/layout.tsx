import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://starthub-course-detail-nextjs-seo.vercel.app"),
  title: {
    default: "StartHub Academy",
    template: "%s | StartHub Academy",
  },
  description:
    "SEO-optimized course pages built with Next.js, SSR, Open Graph, and JSON-LD structured data.",
  openGraph: {
    type: "website",
    siteName: "StartHub Academy",
  },
  twitter: {
    card: "summary_large_image",
  },
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