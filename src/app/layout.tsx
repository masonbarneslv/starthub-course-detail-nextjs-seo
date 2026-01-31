import type { Metadata } from "next";

export const metadata: Metadata = {
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
      <body>{children}</body>
    </html>
  );
}