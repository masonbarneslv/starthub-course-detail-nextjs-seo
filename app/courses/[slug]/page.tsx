import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllCourses, getCourseBySlug } from "@/lib/courses";

type PageProps = {
  params: { slug: string };
};

// ✅ Helps performance: prebuild known slugs (SSG-style)
export async function generateStaticParams() {
  const courses = await getAllCourses();
  return courses.map((c) => ({ slug: c.slug }));
}

// ✅ Dynamic metadata (title, description, OG) based on mock course data
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const course = await getCourseBySlug(params.slug);

  if (!course) {
    return {
      title: "Course not found",
      description: "The requested course could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const title = `${course.name} | ${course.provider.name}`;
  const description = course.description;
  const canonicalPath = `/courses/${course.slug}`;

  return {
    title,
    description,