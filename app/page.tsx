import Link from "next/link";
import { getAllEssays } from "@/lib/essays";

export default function Home() {
  const essays = getAllEssays();

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <header className="mb-16">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-100 mb-3">
          Essays
        </h1>
        <p className="text-zinc-400 text-lg">
          On AI behavioral systems, constraint engineering, and evaluation frameworks.
        </p>
      </header>

      <div className="space-y-10">
        {essays.map((essay) => (
          <article key={essay.slug}>
            <Link
              href={`/essays/${essay.slug}`}
              className="group block"
            >
              <h2 className="text-xl font-medium text-zinc-100 group-hover:text-zinc-300 transition-colors mb-2">
                {essay.title}
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-2">
                {essay.description}
              </p>
              <span className="text-zinc-500 text-sm">
                {essay.readingTime} · Updated {essay.lastUpdated}
              </span>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
