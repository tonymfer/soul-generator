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
  const tagline = soul?.tagline ?? "Discover Your AI Soul";
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
          background: "linear-gradient(160deg, #0a0a0f 0%, #12121e 40%, #0e0e1a 100%)",
          fontFamily: "Inter, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Scanline overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 3px)",
            display: "flex",
          }}
        />

        {/* Terminal header dots */}
        <div
          style={{
            position: "absolute",
            top: 28,
            left: 36,
            display: "flex",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              background: "#f472b6",
              display: "flex",
            }}
          />
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              background: "#facc15",
              display: "flex",
            }}
          />
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              background: "#34d399",
              display: "flex",
            }}
          />
        </div>

        {/* Decorative corner accents with glow */}
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            width: 70,
            height: 70,
            borderLeft: "4px solid #7c6ef6",
            borderTop: "4px solid #7c6ef6",
            display: "flex",
            opacity: 0.7,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            width: 70,
            height: 70,
            borderRight: "4px solid #f472b6",
            borderBottom: "4px solid #f472b6",
            display: "flex",
            opacity: 0.7,
          }}
        />

        {/* Subtle ambient glow - top left */}
        <div
          style={{
            position: "absolute",
            top: -80,
            left: -80,
            width: 300,
            height: 300,
            borderRadius: 150,
            background: "radial-gradient(circle, rgba(124,110,246,0.12) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        {/* Subtle ambient glow - bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: -80,
            right: -80,
            width: 300,
            height: 300,
            borderRadius: 150,
            background: "radial-gradient(circle, rgba(244,114,182,0.1) 0%, transparent 70%)",
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
            gap: 22,
            padding: "40px 60px",
            maxWidth: 920,
          }}
        >
          {/* Avatar area */}
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: 0,
              background: "rgba(124, 110, 246, 0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 56,
              border: "3px solid #7c6ef6",
              boxShadow: "0 0 20px rgba(124,110,246,0.3), 0 4px 0 0 #7c6ef6",
            }}
          >
            &#x1F52E;
          </div>

          {/* Soul title */}
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: "#e0e0e0",
              textAlign: "center",
              lineHeight: 1.2,
              display: "flex",
              textShadow: "0 0 30px rgba(124,110,246,0.3)",
            }}
          >
            {title.length > 28 ? title.slice(0, 28) + "..." : title}
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 22,
              color: "#9999b3",
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
              gap: 14,
              flexWrap: "wrap",
              justifyContent: "center",
              marginTop: 4,
            }}
          >
            {mbti && (
              <div
                style={{
                  background: "rgba(124, 110, 246, 0.2)",
                  color: "#c4b5fd",
                  padding: "10px 24px",
                  fontSize: 20,
                  fontWeight: 700,
                  border: "2px solid #7c6ef6",
                  letterSpacing: "0.08em",
                  display: "flex",
                  boxShadow: "0 0 12px rgba(124,110,246,0.25)",
                }}
              >
                {mbti}
              </div>
            )}
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  background: "rgba(244, 114, 182, 0.12)",
                  color: "#f472b6",
                  padding: "8px 18px",
                  fontSize: 16,
                  fontWeight: 600,
                  border: "2px solid rgba(244, 114, 182, 0.5)",
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
            bottom: 28,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: "#a78bfa",
                display: "flex",
                textShadow: "0 0 20px rgba(124,110,246,0.5)",
                letterSpacing: "0.12em",
              }}
            >
              ABTI
            </div>
            <div
              style={{
                fontSize: 14,
                color: "#666680",
                display: "flex",
              }}
            >
              Agent Behavior Type Indicator
            </div>
          </div>
          <div
            style={{
              fontSize: 13,
              color: "#7c6ef6",
              display: "flex",
              letterSpacing: "0.05em",
            }}
          >
            What&apos;s your ABTI?
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
