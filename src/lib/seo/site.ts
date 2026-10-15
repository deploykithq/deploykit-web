export const SITE_URL = "https://deploykit.es";

export const SITE_NAME = "DeployKit";

export const DEFAULT_OG_IMAGE = "/og-image.png";

export const absoluteUrl = (path: string): string =>
  /^https?:\/\//.test(path) ? path : `${SITE_URL}${path === "/" ? "" : path}`;
