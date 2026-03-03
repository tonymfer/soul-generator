import { LoadingSpinner } from "@/components/ui/loading-spinner";

// ============================================================
// Global Loading Fallback — shown during route transitions
// ============================================================

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner dotCount={4} dotSize={10} />
    </div>
  );
}
