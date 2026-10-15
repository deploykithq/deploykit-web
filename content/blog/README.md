# Blog

Each post is a folder with one Markdown file per language:

```
content/blog/<post-key>/
├── en.md   → https://deploykit.es/blog/<slug>
└── es.md   → https://deploykit.es/es/blog/<slug>
```

Both languages are required: `yarn build` fails if one is missing. The folder name
links the translations together and never appears in a URL.

## Frontmatter

```yaml
---
title: "Post title (also the <title> and og:title)"
description: "150–160 characters: meta description, og:description and RSS summary."
slug: kebab-case-slug        # translated per language
date: 2026-10-15
updated: 2026-11-02          # optional, sets dateModified / lastmod
tags: [docker, tutorial]
author: DeployKit Team
cover: /blog/my-post.png     # optional og:image, put the file in public/blog/
draft: true                  # optional, visible in `yarn dev` only
---
```

## Writing

- `##` and `###` headings make up the table of contents.
- Fenced code blocks are highlighted at build time (` ```bash `, ` ```yaml `, ` ```ts `…).
- Link to the docs in the post's language: `/docs/cli` in `en.md`, `/es/docs/cli` in `es.md`.

`yarn build` writes each post's static HTML plus `sitemap.xml`, `rss.xml` and `es/rss.xml`.
