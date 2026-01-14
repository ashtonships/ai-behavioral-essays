import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const essaysDirectory = path.join(process.cwd(), "essays");

const HIDDEN_SLUGS = ["how-i-use-ai"];

// Custom display order for essays (curated to hook readers early)
const ESSAY_ORDER = [
  "a-beginners-guide-to-ai",
  "intelligence-as-a-commodity",
  "maximizing-ai-utility-as-a-business-owner",
  "ai-for-local-service-businesses",
  "ai-and-attention-markets",
  "how-can-ai-help-in-relationships",
  "defensibility-and-moats-in-ai-work",
  "unit-economics-of-ai-implementation",
  "capital-allocation-for-ai-opportunities",
  "distribution-and-go-to-market-for-ai-services",
  "risk-management-for-ai-deployments",
  "measurement-and-attribution-for-ai-work",
  "claude-code-operational-manual",
  "multi-agent-network-orchestration-framework-for-perspective-triangulation",
  "data-monitoring-and-warehousing-for-ai-with-ai",
];

// Mapping for abbreviated wiki-link titles to full slugs
const TITLE_ALIASES: Record<string, string> = {
  "data monitoring and warehousing": "data-monitoring-and-warehousing-for-ai-with-ai",
  "data monitoring and warehousing for ai": "data-monitoring-and-warehousing-for-ai-with-ai",
  "multi-agent network orchestration": "multi-agent-network-orchestration-framework-for-perspective-triangulation",
  "multi agent network orchestration": "multi-agent-network-orchestration-framework-for-perspective-triangulation",
  "a beginners guide to ai": "a-beginners-guide-to-ai",
  "how ai can help in relationships": "how-can-ai-help-in-relationships",
};

export interface Essay {
  slug: string;
  title: string;
  description: string;
  readingTime: string;
  lastUpdated: string;
  content: string;
}

export interface EssayMeta {
  slug: string;
  title: string;
  description: string;
  readingTime: string;
  lastUpdated: string;
}

function generateSlug(filename: string): string {
  return filename
    .replace(/\.md$/, "")
    .toLowerCase()
    .replace(/[_\s]+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function extractTitle(content: string, filename: string): string {
  const h1Match = content.match(/^#\s+(.+)$/m);
  if (h1Match) {
    return h1Match[1].trim();
  }
  return filename.replace(/\.md$/, "").replace(/[_-]/g, " ");
}

function extractDescription(content: string): string {
  const lines = content.split("\n");
  let foundSeparator = false;
  let description = "";

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed === "---") {
      foundSeparator = true;
      continue;
    }

    if (foundSeparator && trimmed && !trimmed.startsWith("#") && !trimmed.startsWith("_")) {
      description = trimmed;
      break;
    }

    if (!foundSeparator && trimmed && !trimmed.startsWith("#") && !trimmed.startsWith("_")) {
      description = trimmed;
    }
  }

  description = description
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[\[([^\]]+)\]\]/g, "$1");

  if (description.length > 150) {
    description = description.slice(0, 147) + "...";
  }

  return description || "An essay on AI systems and implementation.";
}

function stripTitleFromContent(content: string): string {
  const lines = content.split("\n");
  let result: string[] = [];
  let skippedH1 = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!skippedH1 && trimmed.startsWith("# ")) {
      skippedH1 = true;
      const nextLine = lines[i + 1]?.trim();
      if (nextLine && nextLine.startsWith("_") && nextLine.endsWith("_")) {
        i++;
      }
      continue;
    }

    result.push(line);
  }

  return result.join("\n").replace(/^\n+/, "");
}

function titleToSlug(title: string): string {
  const normalized = title.toLowerCase().trim();

  // Check aliases first
  if (TITLE_ALIASES[normalized]) {
    return TITLE_ALIASES[normalized];
  }

  // Generate slug from title
  return normalized
    .replace(/[_\s]+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function convertWikiLinks(content: string): string {
  return content.replace(/\[\[([^\]]+)\]\]/g, (match, title) => {
    const slug = titleToSlug(title);

    // Don't link to hidden essays
    if (HIDDEN_SLUGS.includes(slug)) {
      return title; // Just show the text, no link
    }

    return `[${title}](/essays/${slug})`;
  });
}

export function getAllEssays(): EssayMeta[] {
  const filenames = fs.readdirSync(essaysDirectory);

  const essays = filenames
    .filter((name) => name.endsWith(".md"))
    .map((filename) => {
      const slug = generateSlug(filename);
      if (HIDDEN_SLUGS.includes(slug)) return null;

      const filePath = path.join(essaysDirectory, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { content } = matter(fileContent);
      const stats = readingTime(content);
      const fileStat = fs.statSync(filePath);

      return {
        slug,
        title: extractTitle(content, filename),
        description: extractDescription(content),
        readingTime: stats.text,
        lastUpdated: formatDate(fileStat.mtime),
      };
    })
    .filter((essay): essay is EssayMeta => essay !== null)
    .sort((a, b) => {
      const aIndex = ESSAY_ORDER.indexOf(a.slug);
      const bIndex = ESSAY_ORDER.indexOf(b.slug);
      // Essays not in the order list go to the end
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    });

  return essays;
}

export function getEssayBySlug(slug: string): Essay | null {
  if (HIDDEN_SLUGS.includes(slug)) {
    return null;
  }

  const filenames = fs.readdirSync(essaysDirectory);

  for (const filename of filenames) {
    if (generateSlug(filename) === slug) {
      const filePath = path.join(essaysDirectory, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { content } = matter(fileContent);
      const stats = readingTime(content);
      const fileStat = fs.statSync(filePath);

      return {
        slug,
        title: extractTitle(content, filename),
        description: extractDescription(content),
        readingTime: stats.text,
        lastUpdated: formatDate(fileStat.mtime),
        content: convertWikiLinks(stripTitleFromContent(content)),
      };
    }
  }

  return null;
}

export function getAllSlugs(): string[] {
  const filenames = fs.readdirSync(essaysDirectory);
  return filenames
    .filter((name) => name.endsWith(".md"))
    .map((filename) => generateSlug(filename))
    .filter((slug) => !HIDDEN_SLUGS.includes(slug));
}
