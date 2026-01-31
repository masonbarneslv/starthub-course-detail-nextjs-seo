import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllCourses, getCourseBySlug } from "@/lib/courses";

/* -------------------------------------
   Pre-build known course slugs
------------------------------------- */
export async function generateStaticParams() {
  const courses = await getAllCourses();
  return courses.map((c) => ({ slug: c.slug }));
}

/* -------------------------------------
   Helper: params can be object OR Promise in some builds
------------------------------------- */
async function getSlug(params: any): Promise<string | undefined> {
  const resolved = await Promise.resolve(params);
  return resolved?.slug;
}

/* -------------------------------------
   Dynamic metadata (SEO + Open Graph)
------------------------------------- */
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const slug = await getSlug(params);
  const course = slug ? await getCourseBySlug(slug) : null;

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
export default async function CoursePage({ params }: any) {
  const slug = await getSlug(params);
  const course = slug ? await getCourseBySlug(slug) : null;

  if (!course) notFound();

  // ✅ JSON-LD structured data for Course
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

      <article className="mx-auto w-full max-w-5xl px-6 py-12">
        {/* ✅ COURSE TITLE + TEXT (THIS IS THE IMPORTANT PART) */}
        <header className="mb-10">
          <p className="text-sm font-medium text-slate-500">
            {course.provider.name}
          </p>

          <h1 className="mt-3 font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl">
            {course.name}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-800">
            {course.description}
          </p>
        </header>

        {/* COURSE IMAGE */}
        <section aria-label="Course image">
          <div className="relative h-[420px] w-full overflow-hidden">
            <Image
              src={course.imageUrl}
              alt={course.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1024px"
            />
          </div>
        </section>
      </article>
    </main>
  );
}