import Link from "next/link";
import { PixelCard } from "@/components/ui/pixel-card";
import { PixelButton } from "@/components/ui/pixel-button";

// ============================================================
// Custom 404 Page — Pixel themed "Not Found"
// ============================================================

export default function NotFound() {
  return (
    <div className="min-h-screen gradient-pastel flex items-center justify-center px-4">
      <PixelCard className="max-w-md w-full text-center py-12 space-y-6">
        {/* Big 404 */}
        <p className="font-pixel text-4xl sm:text-5xl text-accent-primary">
          404
        </p>

        {/* Kawaii sad face */}
        <p className="text-4xl" role="img" aria-label="sad face">
          (&#xB4;;&#x3C9;;&#x60;)
        </p>

        {/* Message */}
        <p className="font-pixel text-xs sm:text-sm text-text-primary">
          이 페이지를 찾을 수 없어요
        </p>

        <p className="font-pixel-accent text-[10px] text-text-secondary">
          주소를 다시 확인해주세요
        </p>

        {/* Home button */}
        <Link href="/">
          <PixelButton variant="primary" size="md">
            홈으로 돌아가기
          </PixelButton>
        </Link>
      </PixelCard>
    </div>
  );
}
