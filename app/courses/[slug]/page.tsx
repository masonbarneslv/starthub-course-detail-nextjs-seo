import Link from "next/link";
import { getAllCourses } from "@/lib/courses";

export default async function CoursesPage() {
  const courses = await getAllCourses();

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <article className="mx-auto w-full max-w-4xl px-6 py-12">
        {/* ✅ PAGE TITLE */}
        <header className="mb-8">
          <h1 className="text-4xl font-semibold tracking-tight">
            Course Catalog
          </h1>

          <p className="mt-4 max-w-2xl text-slate-700">
            Select a course to view the SEO-optimized course detail page.
          </p>
        </header>

        {/* ✅ COURSE LIST */}
        <ul className="space-y-4">
          {courses.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/courses/${c.slug}`}
                className="text-blue-700 underline underline-offset-2 hover:text-blue-900"
              >
                {c.name}
              </Link>
              <div className="text-sm text-slate-500">
                {c.provider?.name}
              </div>
            </li>
          ))}
        </ul>
      </article>
    </main>
  );
}