import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCourseBySlug } from "@/lib/courses";

type PageProps = {
  params: { slug: string
};

// ✅ Dynamic metadata (title, description, OG) based on course data
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const course = await getCourseBySlug(params.slug);

  if (!course) {
    return {
      title: "Course not found",
      description: "The requested course could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const title = `${course.name} | ${course.provider.name}`;
  const description = course.description;
  const canonicalPath = `/courses/${course.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonicalPath,
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
      description,
      images: [course.imageUrl],
    },
  };
}

export default async function CoursePage({ params }: PageProps) {
  const course = await getCourseBySlug(params.slug);
  if (!course) notFound();

  // ✅ JSON-LD structured data for Course (Schema.org)
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
      {/* ✅ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />

      <article className="mx-auto w-full max-w-4xl px-6 py-12">
        <header className="mb-8">
          <p className="text-sm font-medium text-slate-500">
            {course.provider.name}
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            {course.name}
          </h1>
          <p className="mt-4 max-w-2xl text-slate-700">{course.description}</p>
        </header>

        <section className="mb-10">
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <Image
              src={course.imageUrl}
              alt={course.name}
              width={1600}
              height={900}
              priority
              className="h-auto w-full object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>
        </section>

        <section className="grid gap-6">
          <div className="rounded-2xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold">What you’ll learn</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
              <li>SEO-friendly server-side rendering patterns</li>
              <li>Dynamic metadata + Open Graph tags</li>
              <li>JSON-LD structured data for rich results</li>
              <li>Performance-first Next.js App Router fundamentals</li>
            </ul>
          </div>
        </section>
      </article>
    </main>
  );
}