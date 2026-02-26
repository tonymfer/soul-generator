// ============================================================
// Soul Detail Loading — Skeleton layout
// ============================================================

export default function SoulDetailLoading() {
  return (
    <div className="min-h-screen gradient-pastel">
      {/* Header skeleton */}
      <header className="sticky top-0 z-10 bg-bg-primary/80 backdrop-blur-sm border-b-2 border-card-border">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="w-16 h-3 shimmer-bg opacity-20 rounded" />
          <div className="w-10 h-4 shimmer-bg opacity-20 rounded" />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Avatar + Title skeleton */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-24 h-24 shimmer-bg opacity-20 rounded" />
          <div className="w-40 h-5 shimmer-bg opacity-20 rounded" />
          <div className="w-56 h-3 shimmer-bg opacity-20 rounded" />
          <div className="flex gap-2">
            <div className="w-14 h-5 shimmer-bg opacity-20 rounded" />
            <div className="w-14 h-5 shimmer-bg opacity-20 rounded" />
          </div>
          <div className="w-32 h-2 shimmer-bg opacity-20 rounded" />
        </div>

        {/* Traits skeleton */}
        <div className="p-6 bg-card-bg pixel-border space-y-4">
          <div className="w-24 h-4 shimmer-bg opacity-20 rounded" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-1">
              <div className="w-20 h-2 shimmer-bg opacity-20 rounded" />
              <div className="w-full h-3 shimmer-bg opacity-10 rounded" />
            </div>
          ))}
        </div>

        {/* Content skeleton */}
        <div className="p-6 bg-card-bg pixel-border space-y-3">
          <div className="w-24 h-4 shimmer-bg opacity-20 rounded" />
          <div className="w-full h-2 shimmer-bg opacity-10 rounded" />
          <div className="w-3/4 h-2 shimmer-bg opacity-10 rounded" />
          <div className="w-5/6 h-2 shimmer-bg opacity-10 rounded" />
          <div className="w-2/3 h-2 shimmer-bg opacity-10 rounded" />
        </div>
      </main>
    </div>
  );
}
