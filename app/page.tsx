import Link from "next/link";
import { getAllCourses } from "@/lib/course

export default async function HomePage() {
  const courses = await getAllCourses();

  return (
    <main className="min-h-screen">
      <div className="mx-auto w-full max-w-3xl px-6 py-12">
        <header className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight">
            Course Detail Demo
          </h1>
          <p className="mt-2 text-slate-600">
            Click a course to view an SEO-optimized SSR detail page with dynamic
            metadata, Open Graph tags, and JSON-LD schema.
          </p>
        </header>

        <section aria-label="Courses">
          <ul className="space-y-3">
            {courses.map((course) => (
              <li key={course.slug}>
                <Link
                  href={`/courses/${course.slug}`}
                  className="block rounded-xl border border-slate-200 px-5 py-4 hover:bg-slate-50"
                >
                  <div className="font-medium">{course.name}</div>
                  <div className="mt-1 text-sm text-slate-600">
                    Provider: {course.provider.name} •{" "}
                    <span className="font-mono">/{course.slug}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-12 text-sm text-slate-500">
          Built with Next.js App Router • SSR + dynamic metadata + JSON-LD
        </footer>
      </div>
    </main>
  );
}