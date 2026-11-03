import type { Metadata } from "next";
import Link from "next/link";
import type React from "react";
import { CampaignGate } from "@/components/CampaignGate";
import { CampaignOpen } from "@/components/CampaignOpen";
import { EventLink } from "@/components/EventLink";
import { ExpressDialog } from "@/components/ExpressDialog";
import { ExpressForm } from "@/components/ExpressForm";
import { ExpressPrice } from "@/components/ExpressPrice";
import { HeadingText } from "@/components/HeadingText";
import { Starburst } from "@/components/Starburst";
import { StickyCta } from "@/components/StickyCta";
import { StructuredData } from "@/components/StructuredData";
import { TEMPLATE_EVENT } from "@/components/events";
import { blackFriday, expressPrices } from "@/content/blackFriday";
import { express, expressLive } from "@/content/express";
import { localePath, tr, type Lang } from "@/content/i18n";
import { formatPrice, packages, TIERS } from "@/content/packages";
import { pageMetadata } from "@/content/seo";
import { servicePageCopy, servicePages } from "@/content/service-pages";
import { site } from "@/content/site";
import { expressStructuredData } from "@/content/structured-data";
import styles from "./ServicePage.module.css";
import x from "./ExpressPage.module.css";

export const expressMetadata = (lang: Lang): Metadata => ({
  ...pageMetadata({ lang, path: express.path, title: tr(express.metaTitle, lang), description: tr(express.description, lang) }),
  // Out of search results until Express goes live (1 December); rebuild after that date to index it.
  ...(expressLive() ? {} : { robots: { index: false, follow: true } }),
});

/** The Black Friday landing page: short-lived, so never indexed and without language alternates of its own. */
export const blackFridayMetadata = (lang: Lang): Metadata => ({
  ...pageMetadata({ lang, path: blackFriday.path, title: tr(blackFriday.metaTitle, lang), description: tr(blackFriday.description, lang) }),
  robots: { index: false, follow: true },
});

/**
 * One-Page Express: the product page, built from src/content/express.ts. Laid out like the service pages,
 * dressed as a retro price sticker in red, yellow and black (Ramon's call for this page only).
 */
export function ExpressPage({ lang, campaign = false }: { lang: Lang; campaign?: boolean }) {
  const t = (text: { en: string; ro: string }) => tr(text, lang);
  // The lowest price (with your own domain) wherever the page says "from".
  const ownDomainPrice = formatPrice(expressPrices(campaign).priceOwnDomain[lang], lang);
  const fromPrice = `${t(site.pricing.from)} ${ownDomainPrice}`;
  const bf = blackFriday;
  const credit = campaign ? bf.upgradeCredit : express.upgradeCredit;
  // Copy may name the own-domain price as {price}, the Start upgrade credit as {credit} and an extra section as {section}.
  const fill = (text: string) =>
    text
      .replace("{price}", ownDomainPrice)
      .replace(/\{credit\}/g, formatPrice(credit[lang], lang))
      .replace("{section}", formatPrice(express.extraSection[lang], lang));
  const { includes, templates, process, compare, stickers } = express;
  const marquee = campaign ? bf.marquee : express.marquee;
  // The campaign promises a booked week instead of 48 hours (see blackFriday.timing).
  const timingFaq = express.faqs.find((faq) => faq.question.en === "When does the 48-hour period start?");
  const faqs = campaign ? [bf.faq, ...express.faqs.map((faq) => (faq === timingFaq ? bf.timing.faq : faq))] : express.faqs;
  const hasDemos = templates.items.some((item) => item.demos?.length);
  const websitePage = localePath(lang, `${servicePages.website.path}#pricing`);
  const [start, custom] = (["website-start", "website-custom"] as const).map((id) => packages.find((pkg) => pkg.id === id)!);

  const columns = [
    { key: "express", name: t(compare.express), price: ownDomainPrice, dark: true },
    { key: "start", name: `${t(TIERS.start)}`, price: start.price ? formatPrice(start.price[lang], lang) : "", dark: false },
    { key: "custom", name: `${t(TIERS.custom)}`, price: custom.price ? formatPrice(custom.price[lang], lang) : "", dark: false },
  ] as const;

  const page = (
    <main className={`${x.express} ${campaign ? x.blackFriday : ""}`}>
      <CampaignGate lang={lang} campaign={campaign} />
      {campaign ? null : <StructuredData data={expressStructuredData(lang)} />}
      {/* On the campaign page the strip and the hero sit on a black band ("night"). */}
      <div className={campaign ? x.night : undefined}>

      {/* Two identical groups slide left by half the track, so the loop has no seam. */}
      <div className={x.marquee} aria-hidden="true">
        <div className={x.marqueeTrack}>
          {[0, 1].map((group) => (
            <div key={group} className={x.marqueeGroup}>
              {[...marquee, ...marquee].map((phrase, i) => (
                <span key={i} className={x.marqueeItem}>
                  {t(phrase)}
                  <Starburst variant="seal" className={x.marqueeSeal}>!</Starburst>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className={`container ${styles.hero} ${x.hero}`} aria-labelledby="express-title">
        <nav className={styles.breadcrumb} aria-label={t(servicePageCopy.breadcrumb)}>
          <Link href={localePath(lang, "/")}>{t(servicePageCopy.home)}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{campaign ? `${express.name} · ${t(bf.breadcrumb)}` : express.name}</span>
        </nav>
        {campaign ? <p className={`${x.sticker} ${x.heroSticker}`}>{t(bf.hero.sticker)}</p> : null}
        <h1 id="express-title" className={`${styles.title} ${x.title} reveal`}>
          <HeadingText text={t(campaign ? bf.hero.title : express.hero.title)} />
        </h1>
        <p className={`lead ${styles.intro}`}>{t(campaign ? bf.hero.lead : express.hero.lead)}</p>
        <ExpressPrice lang={lang} campaign={campaign} />
        <div id="express-actions" className={styles.actions}>
          <a href="#contact" className="btn">{t(express.hero.primary)}</a>
          <a href={hasDemos ? "#templates" : "#includes"} className="more">
            {t(hasDemos ? express.hero.examples : express.hero.contents)}
          </a>
        </div>
        <p className={styles.audience}>
          {t(campaign ? bf.timing.condition : express.hero.condition)} {t(site.business.vat)}
        </p>
      </section>
      </div>

      {campaign ? (
        <section id="bonuses" className={`container ${styles.section}`} aria-labelledby="bonuses-title">
          <header className={styles.head}>
            <p className={x.sticker}>{t(bf.bonuses.sticker)}</p>
            <h2 id="bonuses-title" className="headline"><HeadingText text={t(bf.bonuses.title)} /></h2>
            <p className="lead">{t(bf.bonuses.lead)}</p>
          </header>
          <ol className={x.bonuses}>
            {bf.bonuses.items.map((item, i) => (
              <li key={item.title.en} className={`${x.bonus} rise`}>
                <Starburst variant="seal" className={x.bonusSeal} aria-hidden="true">{`+${i + 1}`}</Starburst>
                <h3>{fill(t(item.title))}</h3>
                <p>{fill(t(item.text))}</p>
              </li>
            ))}
          </ol>
          <div className={`${x.places} rise`}>
            <p className={x.placesLabel}>
              {t(bf.places.label).replace("{free}", String(bf.slots - bf.taken)).replace("{slots}", String(bf.slots))}
            </p>
            <ol className={x.placesGrid} aria-hidden="true">
              {Array.from({ length: bf.slots }, (_, i) => (
                <li key={i} className={i < bf.taken ? x.taken : undefined}>{i + 1}</li>
              ))}
            </ol>
            <p className={x.note}>{t(bf.places.note)}</p>
            <a href="#contact" className="btn">{t(bf.places.action)}</a>
          </div>
        </section>
      ) : null}

      <section id="includes" className={`container ${styles.section}`} aria-labelledby="includes-title">
        <header className={styles.head}>
          <p className={x.sticker}>{t(stickers.includes)}</p>
          <h2 id="includes-title" className="headline"><HeadingText text={t(includes.title)} /></h2>
          <p className="lead">{t(includes.lead)}</p>
        </header>
        <div className={x.includes}>
          {/* The page itself, drawn as its five sections between the menu and the footer. */}
          <div className={`${x.page} rise`}>
            <p className={x.frame}>{t(includes.menu)}</p>
            <ol className={x.blocks}>
              {includes.blocks.map((block, i) => (
                <li key={block.title.en} className={x.block}>
                  <span className={x.number} aria-hidden="true">{i + 1}.</span>
                  <h3>{t(block.title)}</h3>
                  <p>{t(block.text)}</p>
                </li>
              ))}
            </ol>
            <p className={x.frame}>{t(includes.footer)}</p>
          </div>
          <div className={x.side}>
            <div className={`${x.list} rise`}>
              <h3>{t(includes.alsoTitle)}</h3>
              <ul className={x.checks}>
                {includes.also.map((item) => <li key={item.en}>{t(item)}</li>)}
              </ul>
            </div>
            <div className={`${x.list} rise`}>
              <h3>{t(includes.excludedTitle)}</h3>
              <ul className={x.excluded}>
                {includes.excluded.map((item) => <li key={item.en}>{t(item)}</li>)}
              </ul>
              <p className={x.note}>{t(includes.excludedNote)}</p>
              <Link href={localePath(lang, "/#video")} className="more">{t(includes.videoLink)}</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="templates" className={`container ${styles.section}`} aria-labelledby="templates-title">
        <header className={styles.head}>
          <p className={x.sticker}>{t(stickers.templates)}</p>
          <h2 id="templates-title" className="headline"><HeadingText text={t(templates.title)} /></h2>
          <p className="lead">{t(templates.lead)}</p>
        </header>
        <ul className={x.templates}>
          {templates.items.map((item) => (
            <li key={item.id} className={`${x.template} rise`}>
              {item.demos?.length ? (
                <div className={x.demos}>
                  {item.demos.map((demo) => (
                    <a key={demo.href} href={demo.href} className={x.demo} target="_blank" rel="noreferrer">
                      {/* eslint-disable-next-line @next/next/no-img-element -- demo screenshots are added by hand, already sized */}
                      <img src={demo.image} width={demo.width} height={demo.height} alt={t(demo.alt)} loading="lazy" />
                      <span>{t(demo.label)} <span aria-hidden="true">↗</span></span>
                    </a>
                  ))}
                </div>
              ) : null}
              <h3>{t(item.name)}</h3>
              <p className={x.templateFor}>{t(item.for)}</p>
              <p className={x.focus}>
                <span>{t(templates.sectionsLabel)}</span> {t(item.focus)}
              </p>
              <div className={x.templateActions}>
                <EventLink event={TEMPLATE_EVENT} detail={item.id} href="#contact" className="btn">
                  {t(templates.choose)}
                </EventLink>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className={`container ${styles.section}`} aria-labelledby="process-title">
        <header className={styles.head}>
          <p className={x.sticker}>{t(stickers.process)}</p>
          <h2 id="process-title" className="headline"><HeadingText text={t(process.title)} /></h2>
        </header>
        <ol className={x.steps}>
          {process.steps.map((step, i) => (
            <li key={step.title.en} className={`${x.step} rise`}>
              <span className={x.stepNumber} aria-hidden="true">{i + 1}.</span>
              <h3>{t(step.title)}</h3>
              <p>{t(campaign && i === 2 ? bf.timing.build : step.text)}</p>
            </li>
          ))}
        </ol>
        <p className={x.processNote}>{t(campaign ? bf.timing.note : process.note)}</p>
      </section>

      <section className={`container ${styles.section}`} aria-labelledby="compare-title">
        <header className={styles.head}>
          <p className={x.sticker}>{t(stickers.compare)}</p>
          <h2 id="compare-title" className="headline"><HeadingText text={t(compare.title)} /></h2>
          <p className="lead">{fill(t(compare.lead))}</p>
        </header>
        <ul className={x.compare} style={{ "--rows": compare.rows.length } as React.CSSProperties}>
          {columns.map((column) => (
            <li key={column.key} className={`${x.column} ${column.dark ? x.dark : ""} rise`}>
              {column.dark ? <Starburst variant="seal" className={x.badge} aria-hidden="true">{campaign ? bf.timing.seal : "48h"}</Starburst> : null}
              <h3 className={x.columnName}>{column.name}</h3>
              <p className={x.columnPrice}>
                <span className={x.from}>{t(site.pricing.from)}</span> {column.price}
              </p>
              {compare.rows.map((row) => (
                <p key={row.label.en} className={x.row}>
                  <span>{t(row.label)}</span>
                  {t(campaign && column.key === "express" && row.label.en === "Timeline" ? bf.timing.compare : row[column.key])}
                </p>
              ))}
              {column.key === "express" ? (
                <a href="#contact" className="btn btn-light">{t(compare.action)}</a>
              ) : (
                <Link href={websitePage} className="more">{t(compare.seePackage)}</Link>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className={`container ${styles.section}`} aria-labelledby="faq-title">
        <header className={styles.head}>
          <p className={x.sticker}>{t(stickers.faq)}</p>
          <h2 id="faq-title" className="headline"><HeadingText text={t(express.faqTitle)} /></h2>
        </header>
        <div className={styles.faq}>
          {faqs.map((faq) => (
            <details key={faq.question.en}>
              <summary>{t(faq.question)}</summary>
              <p>{fill(t(faq.answer))}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="contact" className={styles.contact} aria-labelledby="contact-title">
        <div className={`container ${styles.contactInner}`}>
          <h2 id="contact-title" className="headline"><HeadingText text={t(campaign ? bf.contact.title : express.contact.title)} /></h2>
          <p className={`lead ${styles.contactText}`}>{t(express.contact.text)}</p>
          <ExpressForm lang={lang} campaign={campaign} />
          <p className={x.call}>
            {t(express.contact.call)} <a href={site.contact.phoneHref}>{site.contact.phone[lang]}</a>.
          </p>
        </div>
      </section>
      <aside className={`container ${styles.related}`}>
        <p>{t(express.more)}</p>
        <Link href={localePath(lang, servicePages.website.path)} className="more">{t(servicePages.website.title)}</Link>
      </aside>

      <StickyCta label={`${campaign ? `${t(bf.name)} · ` : ""}${express.name} · ${fromPrice}`} action={t(express.sticky)} watch="express-actions" />
      <ExpressDialog lang={lang} campaign={campaign} />
    </main>
  );
  if (!campaign) return page;

  // Before `start` the campaign page is only a placeholder hero on the black band.
  const soon = (
    <main className={`${x.express} ${x.blackFriday}`}>
      <div className={`${x.night} ${x.soon}`}>
        <section className={`container ${styles.hero} ${x.hero}`} aria-labelledby="express-title">
          <nav className={styles.breadcrumb} aria-label={t(servicePageCopy.breadcrumb)}>
            <Link href={localePath(lang, "/")}>{t(servicePageCopy.home)}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{`${express.name} · ${t(bf.breadcrumb)}`}</span>
          </nav>
          <p className={`${x.sticker} ${x.heroSticker}`}>{t(bf.hero.sticker)}</p>
          <h1 id="express-title" className={`${styles.title} ${x.title} reveal`}>
            <HeadingText text={t(bf.soon.title)} />
          </h1>
        </section>
      </div>
    </main>
  );
  return <CampaignOpen soon={soon}>{page}</CampaignOpen>;
}
