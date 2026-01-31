export type Course = 
  slug: string;
  name: string;
  description: string;
  provider: {
    name: string;
    url?: string;
  };
  imageUrl: string;
};

const COURSES: Course[] = [
  {
    slug: "nextjs-seo",
    name: "Next.js SEO Engineering",
    description:
      "Build fast, SEO-optimized pages with SSR, dynamic metadata, Open Graph, and JSON-LD structured data.",
    provider: {
      name: "StartHub Academy",
      url: "https://starthub.example.com",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "web-performance",
    name: "Web Performance Fundamentals",
    description:
      "Learn Core Web Vitals, Lighthouse optimization, caching strategies, and performance-first UI patterns.",
    provider: {
      name: "StartHub Academy",
      url: "https://starthub.example.com",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80",
  },
];

// Mock “fetch”
export async function getAllCourses(): Promise<Course[]> {
  return COURSES;
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  return COURSES.find((c) => c.slug === slug) ?? null;
}