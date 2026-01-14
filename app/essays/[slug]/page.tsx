import { notFound } from "next/navigation";
import Link from "next/link";
import { getEssayBySlug, getAllSlugs } from "@/lib/essays";
import { Markdown } from "./markdown";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const essay = getEssayBySlug(slug);

  if (!essay) {
    return { title: "Not Found" };
  }

  return {
    title: `${essay.title} | Ashton MacDonald`,
    description: essay.description,
  };
}

export default async function EssayPage({ params }: Props) {
  const { slug } = await params;
  const essay = getEssayBySlug(slug);

  if (!essay) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <Link
        href="/"
        className="inline-flex items-center text-zinc-400 hover:text-zinc-100 transition-colors text-sm mb-10"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to essays
      </Link>

      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-100 mb-4">
          {essay.title}
        </h1>
        <p className="text-zinc-500 text-sm">
          {essay.readingTime} · Updated {essay.lastUpdated}
        </p>
      </header>

      <article className="prose-custom">
        <Markdown content={essay.content} />
      </article>
    </div>
  );
}
