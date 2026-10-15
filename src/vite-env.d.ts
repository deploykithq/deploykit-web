/// <reference types="vite/client" />

/** Lo inyecta `scripts/vite-plugin-version.ts`. */
declare const __DEPLOYKIT_VERSION__: string | null;

declare module "virtual:blog-posts" {
  import type { PostI } from "@blog/domain/models/PostI";

  const posts: PostI[];
  export default posts;
}
