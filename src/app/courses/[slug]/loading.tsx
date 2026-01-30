// src/app/courses/[slug]/loading.tsx
export default function Loading() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <article className="mx-auto w-full max-w-4xl px-6 py-12">
        <div className="h-6 w-48 rounded bg-slate-200" />

        <div className="mt-4 h-10 w-3/4 rounded bg-slate-200" />
        <div className="mt-3 h-4 w-full rounded bg-slate-200" />
        <div className="mt-2 h-4 w-5/6 rounded bg-slate-200" />

        <div className="mt-8 h-64 w-full rounded-2xl bg-slate-200" />

        <div className="mt-10 rounded-2xl border border-slate-200 p-6">
          <div className="h-5 w-40 rounded bg-slate-200" />
          <div className="mt-4 space-y-3">
            <div className="h-4 w-11/12 rounded bg-slate-200" />
            <div className="h-4 w-10/12 rounded bg-slate-200" />
            <div className="h-4 w-9/12 rounded bg-slate-200" />
            <div className="h-4 w-8/12 rounded bg-slate-200" />
          </div>
        </div>
      </article>
    </main>
  );
}