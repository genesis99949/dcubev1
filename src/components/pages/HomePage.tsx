import type React from "react";
import { ContactForm } from "@/components/ContactForm";
import { HeroDevices } from "@/components/HeroDevices";
import { HeadingText } from "@/components/HeadingText";
import { RollingDot } from "@/components/RollingDot";
import { PricingSection, ProcessSteps } from "@/components/PricingSection";
import { ScrollStatement } from "@/components/ScrollStatement";
import { ServicesSection } from "@/components/ServicesSection";
import { ToolsMarquee } from "@/components/ToolsMarquee";
import { WorkTiles } from "@/components/WorkTiles";
import { VideoPricing } from "@/components/VideoPricing";
import { StructuredData } from "@/components/StructuredData";
import { tr, type Lang } from "@/content/i18n";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { videoCopy } from "@/content/video";
import { homeStructuredData } from "@/content/structured-data";
import styles from "./HomePage.module.css";

const delay = (seconds: number) => ({ "--d": seconds }) as React.CSSProperties;

/** The homepage, in either language (app/(ro)/page.tsx at / and app/(en)/en/page.tsx at /en). */
export function HomePage({ lang }: { lang: Lang }) {
  const t = (text: { en: string; ro: string }) => tr(text, lang);
  const mailto = `mailto:${site.contact.email}`;
  return (
    <main>
      <StructuredData data={homeStructuredData(lang)} />

      {/* Hero — one line, one sentence, two actions, and real projects on a laptop and a phone */}
      <section className={`container ${styles.hero}`} aria-labelledby="hero-title">
        <p className={`${styles.brand} reveal`}>
          {site.owner.name}
          <span className={styles.owner}>{t(site.owner.role)}</span>
        </p>
        <h1 id="hero-title" className={`${styles.title} reveal`} style={delay(0.08)}>
          {t(site.offer)}
          <RollingDot />
        </h1>
        <p className={`lead ${styles.heroText} reveal`} style={delay(0.16)}>
          {t(site.hero.text)}
        </p>
        <div className={`${styles.actions} reveal`} style={delay(0.24)}>
          <a href="#contact" className="btn">
            {t(site.hero.primary)}
          </a>
          <a href="#work" className="more">
            {t(site.hero.secondary)}
          </a>
        </div>
        <div className={`${styles.devices} reveal`} style={delay(0.4)}>
          <HeroDevices lang={lang} />
        </div>
      </section>

      {/* Work */}
      <section id="work" className={`container ${styles.section}`} aria-labelledby="work-title">
        <header className={styles.head}>
          <h2 id="work-title" className="headline">
            <HeadingText text={t(site.work.headline)} />
          </h2>
          <p className="lead">{t(site.work.text)}</p>
        </header>
        <WorkTiles lang={lang} projects={projects} />
      </section>

      {/* Services — the two offers, side by side */}
      <section id="services" className={`container ${styles.section}`} aria-labelledby="services-title">
        <header className={styles.head}>
          <h2 id="services-title" className="headline">
            <HeadingText text={t(site.services.headline)} />
          </h2>
          <p className="lead">{t(site.services.text)}</p>
        </header>
        <ServicesSection lang={lang} />
      </section>

      {/* The tools and platforms — a full-width, endlessly moving logo strip */}
      <ToolsMarquee lang={lang} />

      {/* How I work */}
      <section id="process" className={`container ${styles.section}`} aria-labelledby="process-title">
        <header className={styles.head}>
          <h2 id="process-title" className="headline">
            <HeadingText text={t(site.process.headline)} />
          </h2>
        </header>
        <ProcessSteps lang={lang} />
      </section>

      {/* Packages */}
      <section id="pricing" className={`container ${styles.section}`} aria-labelledby="pricing-title">
        <header className={styles.head}>
          <h2 id="pricing-title" className="headline">
            <HeadingText text={t(site.pricing.headline)} />
          </h2>
        </header>
        <PricingSection lang={lang} />
      </section>

      <section id="video" className={`container ${styles.section}`} aria-labelledby="video-title">
        <header className={styles.head}>
          <h2 id="video-title" className="headline"><HeadingText text={t(videoCopy.headline)} /></h2>
          <p className="lead">{t(videoCopy.text)}</p>
        </header>
        <VideoPricing lang={lang} />
      </section>

      {/* About */}
      <section id="about" className={`container ${styles.about}`} aria-label={t(site.aboutLabel)}>
        <p className="eyebrow">{t(site.aboutLabel)}</p>
        <ScrollStatement text={t(site.about)} />
      </section>

      {/* Contact */}
      <section id="contact" className={styles.contact} aria-labelledby="contact-title">
        <div className={`container ${styles.contactInner}`}>
          <h2 id="contact-title" className={`headline ${styles.contactTitle}`}>
            <HeadingText text={t(site.contact.headline)} />
          </h2>
          <p className={`lead ${styles.contactText}`}>{t(site.contact.text)}</p>
          <ContactForm lang={lang} />
          {site.contact.email ? (
            <a href={mailto} className={`more ${styles.email}`}>
              {site.contact.email}
            </a>
          ) : null}
          {site.contact.socials.length > 0 ? (
            <ul className={styles.socials}>
              {site.contact.socials.map((social) => (
                <li key={social.href}>
                  <a href={social.href} className="link" target="_blank" rel="noreferrer">
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>
    </main>
  );
}
