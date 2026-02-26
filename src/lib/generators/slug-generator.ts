// ============================================================
// Slug Generator
// Generates URL-friendly slugs from soul names
// ZERO framework dependencies
// ============================================================

// ---------------------------------------------------------------------------
// Adjective pools for slug generation
// ---------------------------------------------------------------------------

const ADJECTIVES_EN = [
  "gentle",
  "bold",
  "witty",
  "calm",
  "bright",
  "swift",
  "keen",
  "warm",
  "sharp",
  "cool",
  "fierce",
  "kind",
  "wild",
  "quiet",
  "vivid",
  "clever",
  "brave",
  "dreamy",
  "chill",
  "hyper",
  "cosmic",
  "pixel",
  "neon",
  "fuzzy",
  "turbo",
  "mega",
  "ultra",
  "nano",
  "zen",
  "spark",
] as const;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Simple deterministic hash for a string.
 * Returns a positive integer.
 */
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Romanize basic Korean characters (very simplified).
 * For non-ASCII characters that aren't Korean, strips them.
 * For Korean, produces a simple phonetic approximation.
 */
function romanizeSimple(str: string): string {
  // Korean initial consonant sounds (ㄱ through ㅎ)
  const initials = [
    "g",
    "kk",
    "n",
    "d",
    "tt",
    "r",
    "m",
    "b",
    "pp",
    "s",
    "ss",
    "",
    "j",
    "jj",
    "ch",
    "k",
    "t",
    "p",
    "h",
  ];
  // Korean vowel sounds (ㅏ through ㅣ)
  const vowels = [
    "a",
    "ae",
    "ya",
    "yae",
    "eo",
    "e",
    "yeo",
    "ye",
    "o",
    "wa",
    "wae",
    "oe",
    "yo",
    "u",
    "weo",
    "we",
    "wi",
    "yu",
    "eu",
    "ui",
    "i",
  ];
  // Korean final consonant sounds (none, ㄱ through ㅎ)
  const finals = [
    "",
    "k",
    "kk",
    "ks",
    "n",
    "nj",
    "nh",
    "d",
    "l",
    "lk",
    "lm",
    "lb",
    "ls",
    "lt",
    "lp",
    "lh",
    "m",
    "b",
    "bs",
    "s",
    "ss",
    "ng",
    "j",
    "ch",
    "k",
    "t",
    "p",
    "h",
  ];

  let result = "";

  for (const char of str) {
    const code = char.charCodeAt(0);

    // Korean syllable block range: 0xAC00 - 0xD7A3
    if (code >= 0xac00 && code <= 0xd7a3) {
      const offset = code - 0xac00;
      const initialIndex = Math.floor(offset / (21 * 28));
      const vowelIndex = Math.floor((offset % (21 * 28)) / 28);
      const finalIndex = offset % 28;

      result +=
        (initials[initialIndex] ?? "") +
        (vowels[vowelIndex] ?? "") +
        (finals[finalIndex] ?? "");
    }
    // ASCII alphanumeric - keep as-is
    else if (
      (code >= 0x41 && code <= 0x5a) || // A-Z
      (code >= 0x61 && code <= 0x7a) || // a-z
      (code >= 0x30 && code <= 0x39) // 0-9
    ) {
      result += char.toLowerCase();
    }
    // Space or hyphen -> hyphen
    else if (char === " " || char === "-" || char === "_") {
      result += "-";
    }
    // Everything else is stripped
  }

  return result;
}

/**
 * Normalize a string into a URL-friendly slug.
 */
function slugify(str: string): string {
  return romanizeSimple(str)
    .replace(/-+/g, "-") // collapse multiple hyphens
    .replace(/^-|-$/g, "") // trim leading/trailing hyphens
    .toLowerCase();
}

// ---------------------------------------------------------------------------
// Main export: generateSlug
// ---------------------------------------------------------------------------

/**
 * Generates a URL-friendly slug from a soul name.
 * Format: `{adjective}-{slugified-name}` using a deterministic adjective
 * based on the name hash.
 *
 * @param name - The soul/agent name (can be Korean or English)
 * @returns A URL-friendly slug string
 *
 * @example
 * generateSlug("테스트봇") // "bright-teseuteubos"
 * generateSlug("Alex") // "cool-alex"
 */
export function generateSlug(name: string): string {
  const base = slugify(name);

  // Pick an adjective deterministically from the name
  const hash = simpleHash(name);
  const adjective = ADJECTIVES_EN[hash % ADJECTIVES_EN.length];

  // If the base is empty (e.g., only special characters), use a numeric fallback
  if (!base) {
    return `${adjective}-soul-${hash % 10000}`;
  }

  return `${adjective}-${base}`;
}

/**
 * Generates a slug with a numeric suffix for uniqueness.
 * Useful when the base slug is already taken.
 *
 * @param name - The soul/agent name
 * @param index - A numeric index for uniqueness
 * @returns A URL-friendly slug with numeric suffix
 */
export function generateSlugWithIndex(name: string, index: number): string {
  const base = slugify(name);

  if (!base) {
    return `soul-${index}`;
  }

  return `${base}-${index}`;
}
