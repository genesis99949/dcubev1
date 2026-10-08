import type React from "react";
import { HeroCube } from "@/components/HeroCube";
import { ScrollStatement } from "@/components/ScrollStatement";
import { ServicesScroll } from "@/components/ServicesScroll";
import { WorkTiles } from "@/components/WorkTiles";
import { projects } from "@/content/projects";
import { SERVICES } from "@/content/services";
import { site } from "@/content/site";
import styles from "./page.module.css";

const delay = (seconds: number) => ({ "--d": seconds }) as React.CSSProperties;

// Which projects involved each service — listed under each face in the services section.
const projectsByService = Object.fromEntries(
  SERVICES.map((s) => [
    s.name,
    projects.filter((p) => p.services.includes(s.name)).map((p) => ({ slug: p.slug, title: p.title })),
  ]),
);

const mailto = `mailto:${site.contact.email}`;

export default function Home() {
  return (
    <main>
      {/* Hero — one line, one sentence, two actions, and the cube as the product */}
      <section className={`container ${styles.hero}`} aria-labelledby="hero-title">
        <p className={`${styles.brand} reveal`}>
          {site.name}
          <span className="dot" aria-hidden />
          <span className={styles.owner}>{site.owner.name}</span>
        </p>
        <h1 id="hero-title" className={`${styles.title} reveal`} style={delay(0.08)}>
          {site.hero.headline}
        </h1>
        <p className={`lead ${styles.heroText} reveal`} style={delay(0.16)}>
          {site.hero.text}
        </p>
        <div className={`${styles.actions} reveal`} style={delay(0.24)}>
          <a href="#contact" className="btn">
            {site.hero.primary}
          </a>
          <a href="#work" className="more">
            {site.hero.secondary}
          </a>
        </div>
        <div className={`${styles.cube} reveal`} style={delay(0.4)}>
          <HeroCube />
        </div>
      </section>

      {/* Work */}
      <section id="work" className={`container ${styles.section}`} aria-labelledby="work-title">
        <header className={styles.head}>
          <h2 id="work-title" className="headline">
            {site.work.headline}
          </h2>
          <p className="lead">{site.work.text}</p>
        </header>
        <WorkTiles projects={projects} />
      </section>

      {/* Services — the cube stays pinned and turns as the six faces scroll past */}
      <section id="services" className={`container ${styles.section}`} aria-labelledby="services-title">
        <header className={styles.head}>
          <h2 id="services-title" className="headline">
            {site.services.headline}
          </h2>
          <p className="lead">{site.services.text}</p>
        </header>
        <ServicesScroll projectsByService={projectsByService} />
      </section>

      {/* About */}
      <section id="about" className={`container ${styles.about}`} aria-label="About">
        <p className="eyebrow">About {site.name}</p>
        <ScrollStatement text={site.about} />
      </section>

      {/* Contact */}
      <section id="contact" className={styles.contact} aria-labelledby="contact-title">
        <div className={`container ${styles.contactInner}`}>
          <h2 id="contact-title" className={`headline ${styles.contactTitle}`}>
            {site.contact.headline}
          </h2>
          <p className={`lead ${styles.contactText}`}>{site.contact.text}</p>
          {site.contact.email ? (
            <>
              <a href={mailto} className="btn btn-light">
                {site.contact.action}
              </a>
              <a href={mailto} className={`more ${styles.email}`}>
                {site.contact.email}
              </a>
            </>
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
