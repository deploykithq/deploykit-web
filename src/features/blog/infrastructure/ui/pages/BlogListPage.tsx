import React from "react";

import { SiteFooter, SiteNavbar } from "@shared/components/site";

import { PostCard } from "@blog/infrastructure/ui/components/PostCard";

import { useBlog } from "@blog/infrastructure/ui/hooks/useBlog";
import { useT } from "@lib/i18n/useLocale";
import { useSeo } from "@lib/seo/useSeo";

import { LOCALES } from "@lib/i18n/locales";
import { absoluteUrl } from "@lib/seo/site";
import { blogPath, postPath } from "@blog/infrastructure/ui/utils/blogPaths";

export const BlogListPage: React.FC = () => {
  const t = useT();
  const { locale, posts } = useBlog();

  useSeo({
    title: t.blog.metaTitle,
    description: t.blog.description,
    locale,
    path: blogPath(locale),
    alternates: Object.fromEntries(LOCALES.map((l) => [l, blogPath(l)])),
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: t.blog.metaTitle,
        description: t.blog.description,
        url: absoluteUrl(blogPath(locale)),
        inLanguage: locale,
        blogPost: posts.map((post) => ({
          "@type": "BlogPosting",
          headline: post.title,
          url: absoluteUrl(postPath(locale, post.slug)),
          datePublished: post.date,
        })),
      },
    ],
  });

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <SiteNavbar />
      <main className="container mx-auto flex-1 px-4 pt-28 pb-20 sm:px-6 sm:pt-32 sm:pb-32">
        <header className="mb-10 sm:mb-14">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest">
            <span className="text-primary">[~]</span>
            <span className="text-muted-foreground">{t.blog.title.toLowerCase()}</span>
            <span aria-hidden className="h-px flex-1 bg-border" />
            <span className="hidden text-dim sm:inline">{t.blog.entries(posts.length)}</span>
          </div>
          <h1 className="mt-6 max-w-4xl font-mono text-3xl font-extrabold leading-tight tracking-tight text-bright sm:text-5xl">
            {t.blog.heading}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{t.blog.intro}</p>
        </header>

        {posts.length === 0 ? (
          <p className="border-y border-border py-10 font-mono text-sm text-dim">{t.blog.empty}</p>
        ) : (
          <ul className="border-y border-border">
            {posts.map((post, i) => (
              <PostCard key={post.key} post={post} index={i} />
            ))}
          </ul>
        )}
      </main>
      <SiteFooter screen="1:blog*" />
    </div>
  );
};
