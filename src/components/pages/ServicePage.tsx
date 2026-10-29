import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { HeadingText } from "@/components/HeadingText";
import { PricingSection, ProcessSteps } from "@/components/PricingSection";
import { StructuredData } from "@/components/StructuredData";
import { WorkTiles } from "@/components/WorkTiles";
import { express, linkExpress } from "@/content/express";
import { localePath, tr, type Lang } from "@/content/i18n";
import { formatPrice, packages } from "@/content/packages";
import { projects } from "@/content/projects";
import { pageMetadata } from "@/content/seo";
import { servicePageCopy as copy, servicePages, type ServicePageKey } from "@/content/service-pages";
import { site } from "@/content/site";
import { serviceStructuredData } from "@/content/structured-data";
import styles from "./ServicePage.module.css";

export const serviceMetadata = (key: ServicePageKey, lang: Lang) => {
  const page = servicePages[key];
  return pageMetadata({ lang, path: page.path, title: tr(page.metaTitle, lang), description: tr(page.description, lang) });
};

export function ServicePage({ serviceKey, lang }: { serviceKey: ServicePageKey; lang: Lang }) {
  const page = servicePages[serviceKey];
  const t = (text: { en: string; ro: string }) => tr(text, lang);
  const start = packages.find((pkg) => pkg.service === page.service && pkg.tier === "start")!;
  const examples = projects.filter((project) => project.services.includes(page.service));
  const other = servicePages[serviceKey === "website" ? "store" : "website"];

  return (
    <main>
      <StructuredData data={serviceStructuredData(serviceKey, lang)} />
      <section className={`container ${styles.hero}`} aria-labelledby="service-title">
        <nav className={styles.breadcrumb} aria-label={t(copy.breadcrumb)}>
          <Link href={localePath(lang, "/")}>{t(copy.home)}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{t(page.title)}</span>
        </nav>
        <p className="eyebrow">{site.name}</p>
        <h1 id="service-title" className={`${styles.title} reveal`}>{t(page.title)}</h1>
        <p className={`lead ${styles.intro}`}>{t(page.intro)}</p>
        {start.price ? <p className={styles.starting}>{t(copy.price)} {formatPrice(start.price[lang], lang)}</p> : null}
        <div className={styles.actions}>
          <a href="#contact" className="btn">{t(copy.quote)}</a>
          <a href="#pricing" className="more">{t(copy.prices)}</a>
        </div>
        <p className={styles.audience}>{t(page.audience)}</p>
      </section>

      <section className={`container ${styles.section}`} aria-labelledby="benefits-title">
        <header className={styles.head}>
          <h2 id="benefits-title" className="headline"><HeadingText text={t(page.benefitsTitle)} /></h2>
        </header>
        <div className={styles.benefits}>
          {page.benefits.map((benefit) => (
            <div key={benefit.title.en} className={`${styles.benefit} rise`}>
              <h3>{t(benefit.title)}</h3>
              <p>{t(benefit.text)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`container ${styles.section}`} aria-labelledby="examples-title">
        <header className={styles.head}>
          <h2 id="examples-title" className="headline"><HeadingText text={t(page.examplesTitle)} /></h2>
          <p className="lead">{t(page.examplesText)}</p>
        </header>
        {examples.length ? <WorkTiles lang={lang} projects={examples} /> : (
          <div className={styles.siteExample}>
            <p className="eyebrow">{site.name}</p>
            <p className={styles.exampleTitle}>{t(site.offer)}</p>
            <Link href={localePath(lang, "/")} className="btn">{t(copy.ownSite)}</Link>
          </div>
        )}
      </section>

      <section id="pricing" className={`container ${styles.section}`} aria-labelledby="pricing-title">
        <header className={styles.head}>
          <h2 id="pricing-title" className="headline"><HeadingText text={t(copy.packages)} /></h2>
        </header>
        <PricingSection lang={lang} service={page.service} />
      </section>

      <section className={`container ${styles.section}`} aria-labelledby="process-title">
        <header className={styles.head}>
          <h2 id="process-title" className="headline"><HeadingText text={t(copy.process)} /></h2>
        </header>
        <ProcessSteps lang={lang} />
      </section>

      <section className={`container ${styles.section}`} aria-labelledby="faq-title">
        <header className={styles.head}>
          <h2 id="faq-title" className="headline"><HeadingText text={t(copy.faq)} /></h2>
        </header>
        <div className={styles.faq}>
          {page.faqs.map((faq) => (
            <details key={faq.question.en}>
              <summary>{t(faq.question)}</summary>
              <p>{t(faq.answer)}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={`container ${styles.about}`} aria-labelledby="about-title">
        <h2 id="about-title" className="headline"><HeadingText text={t(copy.about)} /></h2>
        <p className="lead">{t(copy.aboutText)}</p>
        <Link href={localePath(lang, "/#work")} className="more">{t(copy.portfolio)}</Link>
      </section>

      <section id="contact" className={styles.contact} aria-labelledby="contact-title">
        <div className={`container ${styles.contactInner}`}>
          <h2 id="contact-title" className="headline"><HeadingText text={t(site.contact.headline)} /></h2>
          <p className={`lead ${styles.contactText}`}>{t(site.contact.text)}</p>
          <ContactForm key={page.service} lang={lang} defaultService={page.service} />
        </div>
      </section>
      <aside className={`container ${styles.related}`}>
        <p>{t(copy.otherService)}</p>
        <Link href={localePath(lang, other.path)} className="more">{t(other.title)}</Link>
        {serviceKey === "website" && linkExpress ? (
          <>
            <p>{t(express.related)}</p>
            <Link href={localePath(lang, express.path)} className="more">{express.name}</Link>
          </>
        ) : null}
      </aside>
    </main>
  );
}
