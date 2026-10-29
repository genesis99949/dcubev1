import { localePath, tr, type Lang } from "./i18n";
import type { Project } from "./projects";
import { SERVICES } from "./services";
import { site } from "./site";
import { ui } from "./ui";
import { mediaLabels } from "./video";
import { servicePageCopy, servicePages, type ServicePageKey } from "./service-pages";
import { packages } from "./packages";
import { express } from "./express";

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
  knowsAbout: [...SERVICES.map((service) => tr(service.label, lang)), ...Object.values(mediaLabels).map((label) => tr(label, lang))],
});

const website = {
  "@type": "WebSite",
  "@id": websiteId,
  url: absolute("/"),
  name: site.name,
  inLanguage: ["ro", "en"],
  publisher: { "@id": personId },
};

export const serviceStructuredData = (key: ServicePageKey, lang: Lang) => {
  const page = servicePages[key];
  const url = absolute(localePath(lang, page.path));
  return {
    "@context": "https://schema.org",
    "@graph": [
      person(lang), website,
      {
        "@type": "WebPage", "@id": `${url}#webpage`, url,
        name: tr(page.title, lang), description: tr(page.description, lang), inLanguage: lang,
        isPartOf: { "@id": websiteId }, breadcrumb: { "@id": `${url}#breadcrumb` },
        mainEntity: {
          "@type": "Service", "@id": `${url}#service`, url,
          name: tr(page.title, lang), description: tr(page.description, lang),
          provider: { "@id": personId }, areaServed: { "@type": "Country", name: "Romania" },
          offers: packages.filter((pkg) => pkg.service === page.service).map((pkg) => ({
            "@type": "Offer", name: tr(pkg.name, lang), description: tr(pkg.for, lang), url: `${url}#pricing`,
            ...(pkg.price ? {
              priceSpecification: { "@type": "PriceSpecification", minPrice: pkg.price[lang], priceCurrency: lang === "ro" ? "RON" : "EUR" },
            } : {}),
          })),
        },
      },
      {
        "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: tr(servicePageCopy.home, lang), item: absolute(localePath(lang, "/")) },
          { "@type": "ListItem", position: 2, name: tr(page.title, lang), item: url },
        ],
      },
    ],
  };
};

/** One-Page Express: one Service with its single Offer. No FAQPage markup (Google shows it only for gov/health sites). */
export const expressStructuredData = (lang: Lang) => {
  const url = absolute(localePath(lang, express.path));
  const description = tr(express.description, lang);
  return {
    "@context": "https://schema.org",
    "@graph": [
      person(lang), website,
      {
        "@type": "WebPage", "@id": `${url}#webpage`, url,
        name: express.name, description, inLanguage: lang,
        isPartOf: { "@id": websiteId }, breadcrumb: { "@id": `${url}#breadcrumb` },
        mainEntity: {
          "@type": "Service", "@id": `${url}#service`, url,
          name: express.name, serviceType: tr(express.metaTitle, lang), description,
          provider: { "@id": personId }, areaServed: { "@type": "Country", name: "Romania" },
          offers: {
            "@type": "Offer", name: express.name, url: `${url}#contact`,
            priceSpecification: { "@type": "PriceSpecification", minPrice: express.priceOwnDomain[lang], priceCurrency: lang === "ro" ? "RON" : "EUR" },
          },
        },
      },
      {
        "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: tr(servicePageCopy.home, lang), item: absolute(localePath(lang, "/")) },
          { "@type": "ListItem", position: 2, name: express.name, item: url },
        ],
      },
    ],
  };
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
