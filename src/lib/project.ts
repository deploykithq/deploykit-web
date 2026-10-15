export { GITHUB_REPO, GITHUB_URL } from "@lib/github";

/** Última release de DeployKit en GitHub, leída en el build; `null` si GitHub no respondió. */
export const DEPLOYKIT_VERSION: string | null = __DEPLOYKIT_VERSION__;
