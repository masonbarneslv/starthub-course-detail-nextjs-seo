
        <section className="mb-10" aria-label="Course image">
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <Image
              src={course.imageUrl}
              alt={course.name}
              width={1600}
              height={900}
              priority
              className="h-auto w-full object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>
        </section>

        <section aria-label="Course outcomes" className="grid gap-6">
          <div className="rounded-2xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold">What you’ll learn</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
              <li>SEO-friendly server-side rendering patterns</li>
              <li>Dynamic metadata + Open Graph tags</li>
              <li>JSON-LD structured data for rich results</li>
              <li>Performance-first Next.js App Router fundamentals</li>
            </ul>
          </div>
        </section>
      </article>
    </main>
  );
}