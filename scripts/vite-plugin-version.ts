import type { Plugin } from "vite";

const TIMEOUT_MS = 5000;

const fetchJson = async (url: string): Promise<unknown> => {
  const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
  // Sin token la API permite 60 peticiones/hora por IP; en CI conviene pasar GITHUB_TOKEN.
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const res = await fetch(url, { headers, signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
};

/** Tag de la última release publicada o, si el repo no tiene releases, el tag más reciente. */
const latestVersion = async (repo: string): Promise<string> => {
  try {
    const release = (await fetchJson(`https://api.github.com/repos/${repo}/releases/latest`)) as { tag_name?: string };
    if (release.tag_name) return release.tag_name;
  } catch {
    // Sin releases (404) se prueba con los tags.
  }
  const tags = (await fetchJson(`https://api.github.com/repos/${repo}/tags?per_page=1`)) as { name: string }[];
  if (!tags[0]) throw new Error("the repository has no tags");
  return tags[0].name;
};

/**
 * Expone `__DEPLOYKIT_VERSION__` con la última versión publicada en GitHub, resuelta al arrancar
 * Vite. `DEPLOYKIT_VERSION` en el entorno la fija sin consultar la API. Si GitHub no responde,
 * queda en `null` y el footer omite la versión en lugar de mostrar una antigua.
 */
export const versionPlugin = (repo: string): Plugin => ({
  name: "deploykit-version",
  async config() {
    let version: string | null = process.env.DEPLOYKIT_VERSION || null;
    if (!version) {
      try {
        version = await latestVersion(repo);
      } catch (error) {
        console.warn(`[version] could not read the latest release of ${repo}: ${(error as Error).message}`);
      }
    }
    return { define: { __DEPLOYKIT_VERSION__: JSON.stringify(version) } };
  },
});
