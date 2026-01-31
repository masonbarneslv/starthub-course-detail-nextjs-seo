import Link from "next/link";
import Image from "next/image";
import { getAllCourses } from "@/lib/courses";

export default async function CoursesPage() {
  const courses = await getAllCourses();

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <article className="mx-auto w-full max-w-5xl px-6 py-12">
        <header className="mb-10">
          <h1 className="text-5xl font-serif leading-[1.05] tracking-tight">
            Course Catalog
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-slate-700">
            Select a course to view the SEO-optimized course detail page.
          </p>
        </header>

        <ul className="space-y-10">
          {courses.map((c) => (
            <li key={c.slug} className="border-t border-slate-200 pt-8">
              {/* ✅ CLICKABLE TEXT (this fixes “just photos”) */}
              <Link href={`/courses/${c.slug}`} className="group inline-block">
                <h2 className="text-2xl font-semibold tracking-tight group-hover:underline">
                  {c.name}
                </h2>
              </Link>

              <p className="mt-1 text-sm font-medium text-slate-500">
                {c.provider.name}
              </p>

              <p className="mt-4 max-w-3xl text-slate-700">
                {c.description}
              </p>

              {/* Optional: keep the photo, but now it’s NOT “photo-only” */}
              <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
                <div className="relative h-[220px] w-full">
                  <Image
                    src={c.imageUrl}
                    alt={c.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 1024px"
                  />
                </div>
              </div>

              <div className="mt-5">
                <Link
                  href={`/courses/${c.slug}`}
                  className="text-purple-700 underline underline-offset-2"
                >
                  View course →
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </article>
    </main>
  );
}