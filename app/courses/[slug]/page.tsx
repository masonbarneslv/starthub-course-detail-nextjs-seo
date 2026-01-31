import type { Metadata } from "next";
import Image from "next/image";
import { getAllCourses, getCourseBySlug } from "@/lib/courses";

// Prebuild known slugs (good for performance)
export async function generateStaticParams() {
  const courses = await getAllCourses();
  return courses.map((c) => ({ slug: c.slug }));
}

// Resolve params whether Next passes object or Promise (covers Next 15 typing weirdness)
async function resolveParams(params: any) {
  return await Promise.resolve(params);
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const p = await resolveParams(params);
  const slug = p?.slug;

  const course = slug ? await getCourseBySlug(slug) : null;

  if (!course) {
    return {
      title: "Course not found",
      description: `No course found for slug: ${String(slug)}`,
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
      images: [{ url: course.imageUrl, width: 1200, height: 630, alt: course.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: course.description,
      images: [course.imageUrl],
    },
  };
}

export default async function CoursePage({ params }: any) {
  const p = await resolveParams(params);
  const slug = p?.slug;

  const all = await getAllCourses();
  const course = slug ? await getCourseBySlug(slug) : null;

  // ✅ TEMP DEBUG VIEW instead of 404
  if (!course) {
    return (
      <main className="min-h-screen bg-white text-slate-900">
        <article className="mx-auto w-full max-w-3xl px-6 py-12">
          <h1 className="text-2xl font-semibold">Debug: Course not found</h1>
          <p className="mt-2 text-slate-700">
            The route exists, but <code>getCourseBySlug()</code> returned null.
          </p>

          <div className="mt-6 rounded border border-slate-200 p-4">
            <div className="text-sm text-slate-600">Resolved params:</div>
            <pre className="mt-2 overflow-auto rounded bg-slate-50 p-3 text-sm">
{JSON.stringify(p, null, 2)}
            </pre>

            <div className="mt-4 text-sm text-slate-600">Resolved slug:</div>
            <pre className="mt-2 overflow-auto rounded bg-slate-50 p-3 text-sm">
{String(slug)}
            </pre>

            <div className="mt-4 text-sm text-slate-600">Available slugs:</div>
            <pre className="mt-2 overflow-auto rounded bg-slate-50 p-3 text-sm">
{JSON.stringify(all.map((c) => c.slug), null, 2)}
            </pre>
          </div>

          <p className="mt-6 text-slate-700">
            If <strong>slug is undefined</strong>, your route param is not being read.
            If slug is correct but not in the list, your homepage links/slugs don’t match.
            If the list is empty, your mock data isn’t being loaded in production.
          </p>
        </article>
      </main>
    );
  }

  // ✅ JSON-LD schema (still included)
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />

      <article className="mx-auto w-full max-w-4xl px-6 py-12">
        <header className="mb-8">
          <p className="text-sm font-medium text-slate-500">{course.provider.name}</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">{course.name}</h1>
          <p className="mt-4 max-w-2xl text-slate-700">{course.description}</p>
        </header>

        <section aria-label="Course image">
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
      </article>
    </main>
  );
}