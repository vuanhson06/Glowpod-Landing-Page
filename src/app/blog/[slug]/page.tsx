import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink, Container } from "@/components/ui";
import { formatPostDate, getPost, posts } from "@/data/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = posts.filter((p) => p.slug !== post.slug);

  return (
    <Container>
      <article className="mx-auto max-w-2xl pt-10 sm:pt-14">
        <nav aria-label="Breadcrumb" className="text-sm text-charcoal/60">
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>{" "}
          / {post.pillar}
        </nav>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{post.title}</h1>
        <p className="mt-3 text-sm text-charcoal/60">
          {formatPostDate(post.date)} · {post.readMinutes} min read · GlowPod team
        </p>

        <div className="mt-8 space-y-8 text-lg leading-relaxed text-charcoal/85">
          {post.sections.map((section, i) => (
            <section key={section.heading ?? i}>
              {section.heading && <h2 className="mb-3 text-xl font-semibold text-charcoal">{section.heading}</h2>}
              <div className="space-y-4">
                {section.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-rose-light/60 p-6">
          <p className="font-semibold">See the device these articles are about</p>
          <p className="mt-1 text-sm text-charcoal/70">GlowPod Blend: scan, confirm and dispense a measured foundation blend at home.</p>
          <ButtonLink href="/shop" className="mt-4">
            Visit the shop
          </ButtonLink>
        </div>

        <aside className="mt-12 border-t border-charcoal/10 pt-8">
          <h2 className="font-semibold">More articles</h2>
          <ul className="mt-4 space-y-3">
            {others.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="text-rose-dark underline">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </article>
    </Container>
  );
}
