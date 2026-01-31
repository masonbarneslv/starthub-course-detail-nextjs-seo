import Link from "next/link";
import { getAllCourses } from "@/lib/courses";

export default async function CoursesPage() {
  const courses = await getAllCourses();

  return (
    <main className="relative min-h-screen bg-white text-slate-900">
      {/* If you have ANY background/overlay layer, keep it NON-clickable */}
      <div className="pointer-events-none absolute inset-0" />

      {/* Content layer is above everything */}
      <article className="relative z-10 mx-auto w-full max-w-4xl px-6 py-12">
        <header className="mb-8">
          <h1 className="text-5xl font-serif leading-[1.05] tracking-tight">
            Course Catalog
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-slate-700">
            Select a course to view the SEO-optimized course detail page.
          </p>
        </header>

        <ul className="space-y-5">
          {courses.map((c) => (
            <li key={c.slug} className="list-disc pl-6">
              <Link
                href={`/courses/${c.slug}`}
                className="inline-block text-purple-700 underline underline-offset-2"
              >
                {c.name}
              </Link>

              <div className="text-base text-slate-700">{c.provider.name}</div>
            </li>
          ))}
        </ul>
      </article>
    </main>
  );
}