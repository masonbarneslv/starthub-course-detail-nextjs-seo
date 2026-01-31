export type Course = {
  slug: string;
  name: string;
  description: string;
  providerName: string;
  imageUrl: string;
};

const courses: Course[] = [
  {
    slug: "seo-nextjs-foundations",
    name: "SEO Next.js Foundations",
    description: "Learn SSR, metadata, OG tags, and JSON-LD in Next.js App Router.",
    providerName: "StartHub Academy",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80"
  },
  {
    slug: "technical-seo-for-devs",
    name: "Technical SEO for Developers",
    description: "Core Web Vitals, structured data, and performance-first patterns.",
    providerName: "StartHub Academy",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80"
  }
];

export async function getAllCourses(): Promise<Course[]> {
  return courses;
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  return courses.find((c) => c.slug === slug) ?? null;
}