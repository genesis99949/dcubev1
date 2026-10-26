import type { MetadataRoute } from "next";
import { DEFAULT_LANG, LANGS, localePath } from "@/content/i18n";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { servicePages } from "@/content/service-pages";

// Static export: written once at build time to out/sitemap.xml.
export const dynamic = "force-static";

const absolute = (path: string) => new URL(path, site.url).toString();

/** Every page in both languages, each pointing at its translation. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", ...Object.values(servicePages).map((page) => page.path), ...projects.map((p) => `/work/${p.slug}`), "/privacy"];
  return paths.flatMap((path) =>
    LANGS.map((lang) => ({
      url: absolute(localePath(lang, path)),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : path === "/privacy" ? 0.2 : 0.8,
      alternates: {
        languages: {
          ...Object.fromEntries(LANGS.map((l) => [l, absolute(localePath(l, path))])),
          "x-default": absolute(localePath(DEFAULT_LANG, path)),
        },
      },
    })),
  );
}
