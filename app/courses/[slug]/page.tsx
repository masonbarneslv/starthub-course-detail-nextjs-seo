import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllCourses, getCourseBySlug } from "@/lib/courses";

export async function generateStaticParams() {
  const courses = await getAllCourses();
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
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

export default async function CoursePage({
  params,
}: {
  params: { slug: string };
}) {
  const course = await getCourseBySlug(params.slug);
  if (!course) notFound();

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
        <header className="mb-8">
          <p className="text-base text-slate-700">{course.provider.name}</p>

          <h1 className="mt-6 font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl">
            {course.name}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-800">
            {course.description}
          </p>
        </header>

        <section aria-label="Course image" className="mt-10">
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