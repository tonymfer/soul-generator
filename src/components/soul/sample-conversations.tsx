"use client";

import { useState } from "react";
import { PixelCard } from "@/components/ui/pixel-card";
import { PixelButton } from "@/components/ui/pixel-button";
import { ChevronDown, ChevronUp, MessageCircle } from "lucide-react";

// ============================================================
// SampleConversations — chat bubble display for conversations
// ============================================================

interface Message {
  role: string;
  content: string;
}

interface SampleConversationsProps {
  conversations: Message[][];
}

function ChatBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] p-3 ${
          isUser
            ? "bg-text-primary/5 text-text-primary ml-8"
            : "bg-accent-primary/10 text-text-primary pixel-border-sm mr-8"
        }`}
      >
        <span className="block font-pixel text-[7px] uppercase mb-1 text-text-secondary">
          {isUser ? "User" : "Agent"}
        </span>
        <p className="font-pixel-accent text-[11px] leading-relaxed whitespace-pre-wrap break-words">
          {message.content}
        </p>
      </div>
    </div>
  );
}

function ConversationSection({
  conversation,
  index,
}: {
  conversation: Message[];
  index: number;
}) {
  const [isExpanded, setIsExpanded] = useState(index === 0);

  return (
    <div className="space-y-2">
      <PixelButton
        variant="ghost"
        size="sm"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        className="w-full justify-between gap-2"
      >
        <span className="flex items-center gap-1.5">
          <MessageCircle size={12} />
          대화 {index + 1}
        </span>
        {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
      </PixelButton>

      {isExpanded && (
        <div className="space-y-2 pl-2 animate-fade-in-up">
          {conversation.map((message, i) => (
            <ChatBubble key={i} message={message} />
          ))}
        </div>
      )}
    </div>
  );
}

export function SampleConversations({ conversations }: SampleConversationsProps) {
  if (!conversations || conversations.length === 0) return null;

  return (
    <PixelCard className="space-y-4">
      <h2 className="font-pixel text-sm text-accent-primary">
        샘플 대화
      </h2>

      <div className="space-y-3">
        {conversations.map((conversation, i) => (
          <ConversationSection
            key={i}
            conversation={conversation}
            index={i}
          />
        ))}
      </div>
    </PixelCard>
  );
}
