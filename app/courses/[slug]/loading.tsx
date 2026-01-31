export default function LoadingCourse() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto w-full max-w-4xl px-6 py-12">
        <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />
        <div className="mt-4 h-10 w-2/3 animate-pulse rounded bg-slate-200" />
        <div className="mt-6 h-4 w-full animate-pulse rounded bg-slate-200" />
        <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-slate-200" />
        <div className="mt-10 h-[320px] w-full animate-pulse rounded-2xl border border-slate-200 bg-slate-100" />
      </div>
    </main>
  );
}