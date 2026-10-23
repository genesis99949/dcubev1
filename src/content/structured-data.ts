import { localePath, tr, type Lang } from "./i18n";
import type { Project } from "./projects";
import { SERVICES } from "./services";
import { site } from "./site";
import { ui } from "./ui";

const absolute = (path: string) => new URL(path, site.url).toString();
const personId = absolute("/#person");
const websiteId = absolute("/#website");

const person = (lang: Lang) => ({
  "@type": "Person",
  "@id": personId,
  name: site.owner.name,
  url: absolute("/"),
  jobTitle: tr(site.owner.role, lang),
  sameAs: site.contact.socials.map((social) => social.href),
  knowsAbout: SERVICES.map((service) => tr(service.label, lang)),
});

const website = {
  "@type": "WebSite",
  "@id": websiteId,
  url: absolute("/"),
  name: site.name,
  inLanguage: ["ro", "en"],
  publisher: { "@id": personId },
};

/** A personal portfolio: describe the person without inventing business premises or reviews. */
export const homeStructuredData = (lang: Lang) => {
  const url = absolute(localePath(lang, "/"));
  return {
    "@context": "https://schema.org",
    "@graph": [
      person(lang),
      website,
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: tr(site.offer, lang),
        description: tr(site.tagline, lang),
        inLanguage: lang,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
      },
    ],
  };
};

export const projectStructuredData = (project: Project, lang: Lang) => {
  const url = absolute(localePath(lang, `/work/${project.slug}`));
  const { cover } = project;
  const image = cover.kind === "video" ? cover.poster : cover.kind === "image" ? cover.src : undefined;
  return {
    "@context": "https://schema.org",
    "@graph": [
      person(lang),
      website,
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: tr(project.seo.title, lang),
        description: tr(project.seo.description, lang),
        inLanguage: lang,
        isPartOf: { "@id": websiteId },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        mainEntity: {
          "@type": "CreativeWork",
          "@id": `${url}#project`,
          name: project.title,
          description: tr(project.seo.description, lang),
          url,
          inLanguage: lang,
          creator: { "@id": personId },
          ...(image ? { image: absolute(image) } : {}),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: tr(ui.work.allWork, lang), item: absolute(localePath(lang, "/")) },
          { "@type": "ListItem", position: 2, name: project.title, item: url },
        ],
      },
    ],
  };
};
