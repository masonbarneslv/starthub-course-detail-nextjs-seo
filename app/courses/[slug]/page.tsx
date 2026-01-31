import { getAllCourses } from "@/lib/courses";

export default async function CoursesPage() {
  const courses = await getAllCourses();

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Put content on a very high z-index so nothing can cover it */}
      <article className="relative z-[9999] mx-auto w-full max-w-4xl px-6 py-12">
        <header className="mb-8">
          <h1 className="text-5xl font-serif leading-[1.05] tracking-tight">
            Course Catalog
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-slate-700">
            Select a course to view the SEO-optimized course detail page.
          </p>
        </header>

        <ul className="space-y-6">
          {courses.map((c) => (
            <li key={c.slug} className="list-disc pl-6">
              {/* Plain anchor = guaranteed navigation */}
              <a
                href={`/courses/${c.slug}`}
                className="inline-block text-purple-700 underline underline-offset-2"
              >
                {c.name}
              </a>

              <div className="text-base text-slate-700">{c.provider.name}</div>
            </li>
          ))}
        </ul>
      </article>
    </main>
  );
}