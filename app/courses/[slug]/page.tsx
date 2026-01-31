import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllCourses, getCourseBySlug } from "@/lib/courses";

/* -------------------------------------
   Pre-build known course slugs
------------------------------------- */
export async function generateStaticParams() {
  const courses = await getAllCourses();
  return courses.map((course) => ({
    slug: course.slug,
  }));
}

/* -------------------------------------
   Dynamic metadata (SEO + Open Graph)
------------------------------------- */
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const course = await getCourseBySlug(params.slug);

  if (!course) {
    return {
      title: "Course not found",
      description: "The requested course could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const title = `${course.name} | ${course.provider.name}`;

  return {
    title,
    description: course.description,
    openGraph: {
      title,
      description: course.description,
      type: "website",
      images: [
        {
          url: course.imageUrl,
          width: 1200,
          height: 630,
          alt: course.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: course.description,
      images: [course.imageUrl],
    },
  };
}

/* -------------------------------------
   Course detail page
------------------------------------- */
export default async function CoursePage(
  { params }: { params: { slug: string } }
) {
  const course = await getCourseBySlug(params.slug);
  if (!course) notFound();

  /* JSON-LD structured data */
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: course.description,
    provider: {
      "@type": "Organization",
      name: course.provider.name,
      ...(course.provider.url ? { sameAs: course.provider.url } : {}),
    },
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseSchema),
        }}
      />

      <article className="mx-auto w-full max-w-4xl px-6 py-12">
        <header className="mb-8">
          <p className="text-sm font-medium text-slate-500">
            {course.provider.name}
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            {course.name}
          </h1>
          <p className="mt-4 max-w-2xl text-slate-700">
            {course.description}
          </p>
        </header>

        {/* Image with capped height for better mobile UX */}
        <section aria-label="Course image">
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <Image
              src={course.imageUrl}
              alt={course.name}
              width={1600}
              height={900}
              priority
              className="h-auto w-full object-cover max-h-[420px]"
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>
        </section>
      </article>
    </main>
  );
}