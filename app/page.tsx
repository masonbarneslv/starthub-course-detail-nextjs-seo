import Link from "next/link";
import { getAllCourses } from "@/lib/courses";

export default async function HomePage() {
  const courses = await getAllCourses();

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-semibold">Course Detail Demo</h1>

        <ul className="mt-6 space-y-3">
          {courses.map((course) => (
            <li key={course.slug}>
              <Link
                href={`/courses/${course.slug}`}
                className="block rounded border px-4 py-3 hover:bg-slate-50"
              >
                <div className="font-medium">{course.name}</div>
                <div className="text-sm text-slate-600">
                  {course.provider.name}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}