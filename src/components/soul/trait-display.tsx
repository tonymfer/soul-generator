"use client";

import { PixelCard } from "@/components/ui/pixel-card";
import { PixelBadge } from "@/components/ui/pixel-badge";
import { getMBTIType } from "@/lib/constants/mbti";
import { useLocale, useMessages } from "@/lib/i18n";
import type { TraitVector, AIEnhancement } from "@/lib/generators/types";

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
  const m = useMessages();
  const locale = useLocale();

  const commLabels = m.traits.communication;
  const energyLabels = m.traits.energy;
  const decisionLabels = m.traits.decision;
  const humorLabels = m.traits.humor;
  const structureLabels = m.traits.structure;

  const numericTraits: { key: keyof TraitVector; label: string }[] = [
    { key: "verbosity", label: m.traits.verbosity },
    { key: "emoji_density", label: m.traits.emojiDensity },
    { key: "formality_level", label: m.traits.formalityLevel },
    { key: "tangent_probability", label: m.traits.tangentProbability },
    { key: "enthusiasm_baseline", label: m.traits.enthusiasmBaseline },
    { key: "empathy", label: m.traits.empathy },
  ];

  return (
    <PixelCard className="space-y-5">
      <h2 className="font-pixel text-sm text-accent-primary">
        {m.traits.sectionTitle}
      </h2>

      {mbtiInfo && (
        <div className="flex items-center gap-3">
          <PixelBadge variant="purple" className="text-[10px]">
            {mbtiInfo.emoji} {mbtiInfo.code}
          </PixelBadge>
          <span className="font-pixel-accent text-xs text-text-secondary">
            {locale === "ko" ? mbtiInfo.nameKo : mbtiInfo.nameEn}
          </span>
        </div>
      )}

      {traitVector.adhd !== "none" && (
        <PixelBadge variant="yellow" className="text-[9px]">
          ADHD: {traitVector.adhd.charAt(0).toUpperCase() + traitVector.adhd.slice(1)}
        </PixelBadge>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <span className="font-pixel text-[8px] text-text-secondary uppercase">{m.traits.communicationStyle}</span>
          <PixelBadge variant="mint">
            {commLabels[traitVector.communication_style] ?? traitVector.communication_style}
          </PixelBadge>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-pixel text-[8px] text-text-secondary uppercase">{m.traits.energyPattern}</span>
          <PixelBadge variant="pink">
            {energyLabels[traitVector.energy_pattern] ?? traitVector.energy_pattern}
          </PixelBadge>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-pixel text-[8px] text-text-secondary uppercase">{m.traits.decisionMode}</span>
          <PixelBadge variant="purple">
            {decisionLabels[traitVector.decision_mode] ?? traitVector.decision_mode}
          </PixelBadge>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-pixel text-[8px] text-text-secondary uppercase">{m.traits.humorType}</span>
          <PixelBadge variant="yellow">
            {humorLabels[traitVector.humor_type] ?? traitVector.humor_type}
          </PixelBadge>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-pixel text-[8px] text-text-secondary uppercase">{m.traits.responseStructure}</span>
          <PixelBadge variant="default">
            {structureLabels[traitVector.response_structure] ?? traitVector.response_structure}
          </PixelBadge>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        {numericTraits.map(({ key, label }) => {
          const value = traitVector[key];
          if (typeof value !== "number") return null;
          return <TraitBar key={key} label={label} value={value} />;
        })}
      </div>

      {aiEnhancement && (
        <div className="space-y-4 pt-3 border-t-2 border-card-border">
          <h3 className="font-pixel text-[10px] text-accent-pink">
            {m.traits.aiEnhancement}
          </h3>

          {aiEnhancement.speaking_quirks.length > 0 && (
            <div className="space-y-1">
              <span className="font-pixel text-[8px] text-text-secondary uppercase">
                {m.traits.speakingQuirks}
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

          {aiEnhancement.catchphrases.length > 0 && (
            <div className="space-y-1">
              <span className="font-pixel text-[8px] text-text-secondary uppercase">
                {m.traits.catchphrases}
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

          {aiEnhancement.interests.length > 0 && (
            <div className="space-y-1">
              <span className="font-pixel text-[8px] text-text-secondary uppercase">
                {m.traits.interests}
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

          {aiEnhancement.pet_peeves.length > 0 && (
            <div className="space-y-1">
              <span className="font-pixel text-[8px] text-text-secondary uppercase">
                {m.traits.petPeeves}
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

          {aiEnhancement.unique_perspective && (
            <div className="space-y-1">
              <span className="font-pixel text-[8px] text-text-secondary uppercase">
                {m.traits.uniquePerspective}
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
