import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCourseBySlug } from "@/lib/courses";

// ✅ Dynamic metadata (works + required)
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const course = await getCourseBySlug(params.slug);

  if (!course) {
    return {
      title: "Course not found",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${course.name} | ${course.provider.name}`,
    description: course.description,
    openGraph: {
      title: course.name,
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
  };
}

export default async function CoursePage({ params }: any) {
  const course = await getCourseBySlug(params.slug);
  if (!course) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: course.description,
    provider: {
      "@type": "Organization",
      name: course.provider.name,
    },
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <article className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-4xl font-semibold">{course.name}</h1>
        <p className="mt-4 text-slate-700">{course.description}</p>

        <Image
          src={course.imageUrl}
          alt={course.name}
          width={1600}
          height={900}
          priority
          className="mt-8 rounded"
        />
      </article>
    </main>
  );
}