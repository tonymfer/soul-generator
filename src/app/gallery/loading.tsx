// ============================================================
// Gallery Loading — Skeleton grid of soul cards
// ============================================================

function SkeletonCard() {
  return (
    <div className="p-4 bg-card-bg terminal-border rounded-md">
      <div className="flex flex-col items-center gap-3">
        {/* Avatar skeleton */}
        <div className="w-16 h-16 shimmer-bg opacity-20 rounded" />
        {/* Title skeleton */}
        <div className="w-24 h-3 shimmer-bg opacity-20 rounded" />
        {/* Tagline skeleton */}
        <div className="w-32 h-2 shimmer-bg opacity-20 rounded" />
        {/* Tags skeleton */}
        <div className="flex gap-1">
          <div className="w-12 h-4 shimmer-bg opacity-20 rounded" />
          <div className="w-12 h-4 shimmer-bg opacity-20 rounded" />
        </div>
        {/* Stats skeleton */}
        <div className="w-20 h-2 shimmer-bg opacity-20 rounded mt-2" />
      </div>
    </div>
  );
}

export default function GalleryLoading() {
  return (
    <div className="min-h-screen">
      {/* Header skeleton */}
      <header className="sticky top-0 z-10 bg-bg-primary/80 backdrop-blur-sm border-b-2 border-card-border">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="w-16 h-3 shimmer-bg opacity-20 rounded" />
          <div className="w-10 h-4 shimmer-bg opacity-20 rounded" />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Title skeleton */}
        <div className="text-center space-y-2">
          <div className="w-32 h-5 shimmer-bg opacity-20 rounded mx-auto" />
          <div className="w-48 h-3 shimmer-bg opacity-20 rounded mx-auto" />
        </div>

        {/* Filter skeleton */}
        <div className="h-12 shimmer-bg opacity-10 rounded" />

        {/* Grid of skeleton cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </main>
    </div>
  );
}
