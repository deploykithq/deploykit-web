import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import { NotFound } from "@shared/components/not-found";
import { SiteFooter, SiteNavbar } from "@shared/components/site";

import { PostBody } from "@blog/infrastructure/ui/components/PostBody";
import { PostCard } from "@blog/infrastructure/ui/components/PostCard";
import { PostMeta } from "@blog/infrastructure/ui/components/PostMeta";
import { PostToc } from "@blog/infrastructure/ui/components/PostToc";

import { useBlog } from "@blog/infrastructure/ui/hooks/useBlog";
import { useT } from "@lib/i18n/useLocale";
import { useSeo } from "@lib/seo/useSeo";

import { absoluteUrl, SITE_NAME } from "@lib/seo/site";
import { blogPath, formatPostDate, postPath } from "@blog/infrastructure/ui/utils/blogPaths";

import type { LocaleT } from "@lib/i18n/locales";
import type { SeoMetaI } from "@lib/seo/seo.types";

export const BlogPostPage: React.FC = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const t = useT();
  const { locale, getPost, getTranslations, getRelated } = useBlog();

  const post = useMemo(() => getPost(slug), [getPost, slug]);

  // Los slugs traducidos cambian según el locale, así que el cambio de idioma y hreflang necesitan las rutas reales.
  const alternates = useMemo(() => {
    if (!post) return undefined;
    const translations = getTranslations(post.key);
    return Object.fromEntries(
      Object.entries(translations).map(([l, p]) => [l, postPath(l as LocaleT, p.slug)]),
    ) as Partial<Record<LocaleT, string>>;
  }, [post, getTranslations]);

  const related = useMemo(() => (post ? getRelated(post) : []), [post, getRelated]);

  const path = postPath(locale, slug);
  const meta: SeoMetaI = post
    ? {
        title: `${post.title} — ${SITE_NAME}`,
        description: post.description,
        locale,
        path,
        alternates,
        type: "article",
        image: post.cover ?? undefined,
        publishedTime: post.date,
        modifiedTime: post.updated ?? post.date,
        tags: post.tags,
        jsonLd: [
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: post.updated ?? post.date,
            inLanguage: locale,
            keywords: post.tags.join(", "),
            author: { "@type": "Person", name: post.author },
            publisher: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") },
            image: absoluteUrl(post.cover ?? "/og-image.png"),
            mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(path) },
            url: absoluteUrl(path),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: t.blog.title, item: absoluteUrl(blogPath(locale)) },
              { "@type": "ListItem", position: 2, name: post.title, item: absoluteUrl(path) },
            ],
          },
        ],
      }
    : { title: t.notFound.title, description: t.notFound.message, locale, path, noindex: true };

  useSeo(meta);

  if (!post) return <NotFound />;

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <SiteNavbar alternates={alternates} />
      <main className="container mx-auto flex-1 px-4 pt-28 pb-20 sm:px-6 sm:pt-32 sm:pb-32">
        <nav aria-label="breadcrumb" className="font-mono text-xs uppercase tracking-widest text-dim">
          <Link to={blogPath(locale)} className="hover:text-primary">
            {t.blog.title.toLowerCase()}
          </Link>{" "}
          <span aria-hidden>/</span> <span className="text-muted-foreground">{post.slug}</span>
        </nav>

        <article className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
          <div className="min-w-0">
            <header className="border-b border-border pb-8">
              <h1 className="max-w-3xl font-mono text-3xl font-extrabold leading-tight tracking-tight text-bright sm:text-5xl">
                {post.title}
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{post.description}</p>
              <PostMeta post={post} className="mt-6" />
              <p className="mt-2 font-mono text-xs text-dim">
                — {post.author}
                {post.updated && (
                  <>
                    {" · "}
                    {t.blog.updated} <time dateTime={post.updated}>{formatPostDate(post.updated, locale)}</time>
                  </>
                )}
              </p>
            </header>

            <div className="mt-10 max-w-3xl">
              <PostBody html={post.html} />
            </div>

            <Link
              to={blogPath(locale)}
              className="mt-16 inline-block font-mono text-sm text-muted-foreground hover:text-primary"
            >
              {t.blog.allPosts}
            </Link>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <PostToc toc={post.toc} />
            </div>
          </aside>
        </article>

        {related.length > 0 && (
          <section className="mt-20" aria-labelledby="related-heading">
            <h2 id="related-heading" className="mb-4 font-mono text-xs uppercase tracking-widest text-dim">
              {t.blog.related}/
            </h2>
            <ul className="border-y border-border">
              {related.map((other, i) => (
                <PostCard key={other.key} post={other} index={i} />
              ))}
            </ul>
          </section>
        )}
      </main>
      <SiteFooter screen="1:blog*" alternates={alternates} />
    </div>
  );
};
