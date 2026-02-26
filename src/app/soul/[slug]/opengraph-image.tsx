import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ABTI Soul";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// ============================================================
// Dynamic OG Image for Soul Pages
// Uses next/og ImageResponse to render a pixel-themed card.
// ============================================================

interface SoulData {
  title: string;
  tagline: string | null;
  tags: string[];
  personality_data: Record<string, unknown> | null;
}

async function fetchSoul(slug: string): Promise<SoulData | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) return null;

  try {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/souls?slug=eq.${encodeURIComponent(slug)}&is_public=eq.true&select=title,tagline,tags,personality_data&limit=1`,
      {
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data?.[0] ?? null;
  } catch {
    return null;
  }
}

function extractMBTI(personalityData: Record<string, unknown> | null): string | null {
  if (!personalityData) return null;
  const traitVector = personalityData.traitVector as Record<string, unknown> | undefined;
  if (!traitVector?.mbti) return null;
  return String(traitVector.mbti);
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const soul = await fetchSoul(slug);

  const title = soul?.title ?? "ABTI Soul";
  const tagline = soul?.tagline ?? "나만의 AI 에이전트 소울";
  const mbti = soul ? extractMBTI(soul.personality_data) : null;
  const tags = soul?.tags?.slice(0, 3) ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #faf5ff 0%, #f0fdf4 50%, #faf5ff 100%)",
          fontFamily: "Inter, sans-serif",
          position: "relative",
        }}
      >
        {/* Decorative corner accents */}
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            width: 60,
            height: 60,
            borderLeft: "4px solid #a78bfa",
            borderTop: "4px solid #a78bfa",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 24,
            right: 24,
            width: 60,
            height: 60,
            borderRight: "4px solid #f472b6",
            borderBottom: "4px solid #f472b6",
            display: "flex",
          }}
        />

        {/* Main card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            padding: "40px 60px",
            maxWidth: 900,
          }}
        >
          {/* Avatar emoji placeholder */}
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: 0,
              background: "rgba(167, 139, 250, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 48,
              border: "3px solid #1e1b4b",
              boxShadow: "0 4px 0 0 #1e1b4b",
            }}
          >
            &#x1F52E;
          </div>

          {/* Soul title */}
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: "#1e1b4b",
              textAlign: "center",
              lineHeight: 1.3,
              display: "flex",
            }}
          >
            {title.length > 30 ? title.slice(0, 30) + "..." : title}
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 22,
              color: "#6b7280",
              textAlign: "center",
              lineHeight: 1.5,
              display: "flex",
            }}
          >
            {tagline && tagline.length > 60
              ? tagline.slice(0, 60) + "..."
              : tagline}
          </div>

          {/* Badges row */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 12,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {mbti && (
              <div
                style={{
                  background: "rgba(167, 139, 250, 0.2)",
                  color: "#a78bfa",
                  padding: "6px 16px",
                  fontSize: 16,
                  fontWeight: 700,
                  border: "2px solid #a78bfa",
                  display: "flex",
                }}
              >
                {mbti}
              </div>
            )}
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  background: "rgba(244, 114, 182, 0.2)",
                  color: "#f472b6",
                  padding: "6px 16px",
                  fontSize: 16,
                  fontWeight: 600,
                  border: "2px solid #f472b6",
                  display: "flex",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* ABTI Branding */}
        <div
          style={{
            position: "absolute",
            bottom: 30,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#a78bfa",
              display: "flex",
            }}
          >
            ABTI
          </div>
          <div
            style={{
              fontSize: 14,
              color: "#6b7280",
              display: "flex",
            }}
          >
            Agent Behavior Type Indicator
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
