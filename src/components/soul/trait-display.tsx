"use client";

import { PixelCard } from "@/components/ui/pixel-card";
import { PixelBadge } from "@/components/ui/pixel-badge";
import { getMBTIType } from "@/lib/constants/mbti";
import type { TraitVector, AIEnhancement } from "@/lib/generators/types";

// ============================================================
// Korean labels for enum trait values
// ============================================================

const COMMUNICATION_STYLE_KO: Record<TraitVector["communication_style"], string> = {
  direct: "직접적",
  warm: "따뜻한",
  analytical: "분석적",
  expressive: "표현적",
};

const ENERGY_PATTERN_KO: Record<TraitVector["energy_pattern"], string> = {
  steady: "안정적",
  burst: "폭발적",
  reactive: "반응적",
  ambient: "은은한",
};

const DECISION_MODE_KO: Record<TraitVector["decision_mode"], string> = {
  logical: "논리적",
  intuitive: "직관적",
  consensus: "합의형",
  impulsive: "즉흥적",
};

const HUMOR_TYPE_KO: Record<TraitVector["humor_type"], string> = {
  dry: "건조한",
  pun: "말장난",
  sarcastic: "풍자적",
  wholesome: "힐링",
  absurd: "황당한",
};

const RESPONSE_STRUCTURE_KO: Record<TraitVector["response_structure"], string> = {
  organized: "체계적",
  "stream-of-consciousness": "의식의 흐름",
  mixed: "혼합형",
};

// ============================================================
// Numeric trait bar labels
// ============================================================

const NUMERIC_TRAIT_LABELS: { key: keyof TraitVector; label: string }[] = [
  { key: "verbosity", label: "수다 레벨" },
  { key: "emoji_density", label: "이모지 밀도" },
  { key: "formality_level", label: "격식 수준" },
  { key: "tangent_probability", label: "삼천포 확률" },
  { key: "enthusiasm_baseline", label: "열정 기본값" },
  { key: "empathy", label: "공감 능력" },
];

// ============================================================
// TraitBar — visual progress bar for 0-1 values
// ============================================================

function TraitBar({ label, value }: { label: string; value: number }) {
  const percentage = Math.round(value * 100);
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <span className="font-pixel-accent text-[11px] text-text-primary">{label}</span>
        <span className="font-pixel text-[8px] text-text-secondary">{percentage}%</span>
      </div>
      <div className="h-3 w-full bg-card-border pixel-border-sm relative overflow-hidden">
        <div
          className="h-full bg-accent-primary transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// ============================================================
// TraitDisplay — main component
// ============================================================

interface TraitDisplayProps {
  traitVector: TraitVector;
  aiEnhancement?: AIEnhancement;
}

export function TraitDisplay({ traitVector, aiEnhancement }: TraitDisplayProps) {
  const mbtiInfo = getMBTIType(traitVector.mbti);

  return (
    <PixelCard className="space-y-5">
      <h2 className="font-pixel text-sm text-accent-primary">
        성격 특성
      </h2>

      {/* MBTI Badge */}
      {mbtiInfo && (
        <div className="flex items-center gap-3">
          <PixelBadge variant="purple" className="text-[10px]">
            {mbtiInfo.emoji} {mbtiInfo.code}
          </PixelBadge>
          <span className="font-pixel-accent text-xs text-text-secondary">
            {mbtiInfo.nameKo}
          </span>
        </div>
      )}

      {/* ADHD indicator */}
      {traitVector.adhd !== "none" && (
        <PixelBadge variant="yellow" className="text-[9px]">
          ADHD: {traitVector.adhd.charAt(0).toUpperCase() + traitVector.adhd.slice(1)}
        </PixelBadge>
      )}

      {/* Enum traits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <span className="font-pixel text-[8px] text-text-secondary uppercase">소통 스타일</span>
          <PixelBadge variant="mint">
            {COMMUNICATION_STYLE_KO[traitVector.communication_style] ?? traitVector.communication_style}
          </PixelBadge>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-pixel text-[8px] text-text-secondary uppercase">에너지 패턴</span>
          <PixelBadge variant="pink">
            {ENERGY_PATTERN_KO[traitVector.energy_pattern] ?? traitVector.energy_pattern}
          </PixelBadge>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-pixel text-[8px] text-text-secondary uppercase">결정 방식</span>
          <PixelBadge variant="purple">
            {DECISION_MODE_KO[traitVector.decision_mode] ?? traitVector.decision_mode}
          </PixelBadge>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-pixel text-[8px] text-text-secondary uppercase">유머 타입</span>
          <PixelBadge variant="yellow">
            {HUMOR_TYPE_KO[traitVector.humor_type] ?? traitVector.humor_type}
          </PixelBadge>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-pixel text-[8px] text-text-secondary uppercase">응답 구조</span>
          <PixelBadge variant="default">
            {RESPONSE_STRUCTURE_KO[traitVector.response_structure] ?? traitVector.response_structure}
          </PixelBadge>
        </div>
      </div>

      {/* Numeric traits — visual bars */}
      <div className="space-y-3 pt-2">
        {NUMERIC_TRAIT_LABELS.map(({ key, label }) => {
          const value = traitVector[key];
          if (typeof value !== "number") return null;
          return <TraitBar key={key} label={label} value={value} />;
        })}
      </div>

      {/* AI Enhancement details */}
      {aiEnhancement && (
        <div className="space-y-4 pt-3 border-t-2 border-card-border">
          <h3 className="font-pixel text-[10px] text-accent-pink">
            AI 강화 특성
          </h3>

          {/* Speaking quirks */}
          {aiEnhancement.speaking_quirks.length > 0 && (
            <div className="space-y-1">
              <span className="font-pixel text-[8px] text-text-secondary uppercase">
                말버릇
              </span>
              <div className="flex flex-wrap gap-1.5">
                {aiEnhancement.speaking_quirks.map((quirk, i) => (
                  <PixelBadge key={i} variant="pink" className="text-[8px]">
                    {quirk}
                  </PixelBadge>
                ))}
              </div>
            </div>
          )}

          {/* Catchphrases */}
          {aiEnhancement.catchphrases.length > 0 && (
            <div className="space-y-1">
              <span className="font-pixel text-[8px] text-text-secondary uppercase">
                캐치프레이즈
              </span>
              <div className="flex flex-wrap gap-1.5">
                {aiEnhancement.catchphrases.map((phrase, i) => (
                  <PixelBadge key={i} variant="purple" className="text-[8px]">
                    &ldquo;{phrase}&rdquo;
                  </PixelBadge>
                ))}
              </div>
            </div>
          )}

          {/* Interests */}
          {aiEnhancement.interests.length > 0 && (
            <div className="space-y-1">
              <span className="font-pixel text-[8px] text-text-secondary uppercase">
                관심사
              </span>
              <div className="flex flex-wrap gap-1.5">
                {aiEnhancement.interests.map((interest, i) => (
                  <PixelBadge key={i} variant="mint" className="text-[8px]">
                    {interest}
                  </PixelBadge>
                ))}
              </div>
            </div>
          )}

          {/* Pet peeves */}
          {aiEnhancement.pet_peeves.length > 0 && (
            <div className="space-y-1">
              <span className="font-pixel text-[8px] text-text-secondary uppercase">
                싫어하는 것
              </span>
              <div className="flex flex-wrap gap-1.5">
                {aiEnhancement.pet_peeves.map((peeve, i) => (
                  <PixelBadge key={i} variant="yellow" className="text-[8px]">
                    {peeve}
                  </PixelBadge>
                ))}
              </div>
            </div>
          )}

          {/* Unique perspective */}
          {aiEnhancement.unique_perspective && (
            <div className="space-y-1">
              <span className="font-pixel text-[8px] text-text-secondary uppercase">
                고유 관점
              </span>
              <p className="font-pixel-accent text-xs text-text-primary leading-relaxed">
                {aiEnhancement.unique_perspective}
              </p>
            </div>
          )}
        </div>
      )}
    </PixelCard>
  );
}
