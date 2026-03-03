"use client";

import { useState, useTransition } from "react";
import { Heart } from "lucide-react";
import { TerminalButton } from "@/components/ui/terminal-button";
import { toggleLike } from "@/actions/like";
import { useMessages } from "@/lib/i18n";

// ============================================================
// LikeButton — real like toggle with optimistic UI
// ============================================================

interface LikeButtonProps {
  soulId: string;
  initialLiked: boolean;
  initialCount: number;
}

export function LikeButton({
  soulId,
  initialLiked,
  initialCount,
}: LikeButtonProps) {
  const m = useMessages();
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    // Optimistic update
    const prevLiked = liked;
    const prevCount = count;

    setLiked(!liked);
    setCount(liked ? count - 1 : count + 1);

    startTransition(async () => {
      const result = await toggleLike(soulId);

      if (result.error) {
        // Revert on error
        setLiked(prevLiked);
        setCount(prevCount);
        return;
      }

      // Sync with server state
      setLiked(result.liked);
      setCount(result.likesCount);
    });
  };

  return (
    <TerminalButton
      variant={liked ? "primary" : "ghost"}
      size="sm"
      onClick={handleClick}
      disabled={isPending}
      className="gap-1.5"
    >
      <Heart
        size={12}
        fill={liked ? "currentColor" : "none"}
        className={liked ? "" : ""}
      />
      <span>{m.common.like} {count}</span>
    </TerminalButton>
  );
}
