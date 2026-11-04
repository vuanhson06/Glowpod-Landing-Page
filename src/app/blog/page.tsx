import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader } from "@/components/ui";
import { formatPostDate, posts } from "@/data/posts";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Blog"
        title="Notes on shade, technology and ownership"
        intro="Plain-language articles on choosing foundation, how GlowPod works, and what it takes to own a refill-based device."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <article key={post.slug} className="flex flex-col rounded-3xl bg-white/60 p-6 ring-1 ring-charcoal/5">
            <p className="text-xs font-semibold tracking-wide text-sage-dark uppercase">{post.pillar}</p>
            <h2 className="mt-2 text-lg font-semibold">
              <Link href={`/blog/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal/70">{post.excerpt}</p>
            <div className="mt-5 flex items-center justify-between text-xs text-charcoal/60">
              <span>
                {formatPostDate(post.date)} · {post.readMinutes} min read
              </span>
              <Link href={`/blog/${post.slug}`} className="font-semibold text-rose-dark underline" aria-label={`Read: ${post.title}`}>
                Read
              </Link>
            </div>
          </article>
        ))}
      </div>
    </Container>
  );
}
