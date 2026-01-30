// src/lib/courses.ts

export type Course = {
  slug: string;
  name: string;
  description: string;
  providerName: string;
  imageUrl: string;
};

/**
 * Mock course data.
 * In a real app this would come from an API or database,
 * but for this task we intentionally mock it.
 */
const COURSES: Course[] = [
  {
    slug: "startup-seo-foundations",
    name: "Startup SEO Foundations",
    description:
      "Learn the fundamentals of technical SEO, on-page strategy, and performance best practices for modern web applications.",
    providerName: "StartHub Academy",
    imageUrl:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "nextjs-for-marketing-sites",
    name: "Next.js for High-Performance Marketing Sites",
    description:
      "Build fast, SEO-friendly marketing pages using Next.js App Router, server-side rendering, metadata APIs, and structured data.",
    providerName: "StartHub Academy",
    imageUrl:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "schema-rich-snippets",
    name: "Schema & Rich Snippets for Growth",
    description:
      "Implement JSON-LD schema markup to improve search appearance, enable rich snippets, and help Google better understand your content.",
    providerName: "StartHub Academy",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
  },
];

/**
 * Fetch a single course by slug.
 * Simulates a real async data request.
 */
export async function getCourseBySlug(slug: string): Promise<Course | null> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 150));

  return COURSES.find((course) => course.slug === slug) ?? null;
}

/**
 * Fetch all courses.
 * Used for the homepage list.
 */
export async function getAllCourses(): Promise<Course[]> {
  return COURSES;
}