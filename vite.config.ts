import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";

import { blogPlugin } from "./scripts/vite-plugin-blog";
import { versionPlugin } from "./scripts/vite-plugin-version";
import { GITHUB_REPO } from "./src/lib/github";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), blogPlugin(), versionPlugin(GITHUB_REPO), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@landing": path.resolve(__dirname, "./src/features/landing"),
      "@docs": path.resolve(__dirname, "./src/features/docs"),
      "@blog": path.resolve(__dirname, "./src/features/blog"),
      "@shared": path.resolve(__dirname, "./src/shared"),
      "@lib": path.resolve(__dirname, "./src/lib"),
    },
  },
}));
