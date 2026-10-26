import Image from "next/image";
import Link from "next/link";
import { localePath, tr, type Lang } from "@/content/i18n";
import { formatPrice } from "@/content/packages";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { mediaLabels, mediaOffers, videoCopy } from "@/content/video";
import { EventLink } from "./EventLink";
import { PACKAGE_EVENT } from "./events";
import { OfferDetails } from "./OfferDetails";
import { HeadingText } from "./HeadingText";
import { ProcessSteps } from "./PricingSection";
import mediaStyles from "./VideoPricing.module.css";
import styles from "./PricingSection.module.css";

export function VideoPricing({ lang }: { lang: Lang }) {
  const examples = projects.flatMap((project) => project.sections.flatMap((section) =>
    (section.videoAds ?? []).map((ad) => ({ slug: project.slug, ad })),
  )).slice(0, 2);
  return (
    <>
      <div className={mediaStyles.examples}>
        <h3 className={mediaStyles.subtitle}>{tr(videoCopy.examplesTitle, lang)}</h3>
        <ul>
          {examples.map(({ slug, ad }) => (
            <li key={ad.id}>
              <Link href={localePath(lang, `/work/${slug}#${ad.id}-title`)} className={mediaStyles.example}>
                <Image src={ad.video.poster} width={ad.video.width} height={ad.video.height} alt={tr(ad.video.alt, lang)} sizes="96px" />
                <div>
                  <h4>{tr(ad.title, lang)}</h4>
                  <p>{tr(ad.format, lang)}</p>
                  <span className="more">{tr(videoCopy.exampleAction, lang)}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <ul className={styles.grid}>
        {mediaOffers.filter((offer) => offer.kind === "video").map((offer, i) => (
          <li key={offer.id} className={`${styles.card} ${i === 1 ? styles.featured : ""}`}>
            <h3 className={styles.name}>{tr(offer.name, lang)}</h3>
            <p className={styles.for}>{tr(offer.description, lang)}</p>
            <p className={styles.price}>{formatPrice(offer.price[lang], lang)}</p>
            <ul className={styles.includes}>
              {videoCopy.includes.map((item) => <li key={item.en}>{tr(item, lang)}</li>)}
            </ul>
            <EventLink event={PACKAGE_EVENT} detail={offer.id} href="#contact" className={`btn ${i === 1 ? "btn-light" : ""} ${styles.action}`}>
              {tr(videoCopy.action, lang)}
            </EventLink>
          </li>
        ))}
      </ul>
      <ul className={styles.voiceovers}>
        {mediaOffers.filter((offer) => offer.kind !== "video").map((offer) => (
          <li key={offer.id} className={styles.voiceover}>
            <div className={styles.voiceoverText}>
              <h3 className={styles.name}>{tr(mediaLabels[offer.kind], lang)}</h3>
              <p>{tr(offer.name, lang)}</p>
              <p className={styles.for}>{tr(offer.description, lang)}</p>
            </div>
            <p className={styles.price}>{formatPrice(offer.price[lang], lang)}</p>
            <EventLink event={PACKAGE_EVENT} detail={offer.id} href="#contact" className="btn">
              {tr(offer.kind === "voiceover-ai" ? videoCopy.aiVoiceoverAction : videoCopy.voiceoverAction, lang)}
            </EventLink>
          </li>
        ))}
      </ul>
      <div className={`${styles.extras} ${styles.mediaNotes}`}>
        <p className={styles.payment}>{tr(videoCopy.note, lang)}</p>
        <p className={styles.payment}>{tr(site.business.vat, lang)}</p>
      </div>
      <OfferDetails lang={lang} title={videoCopy.detailsTitle} items={videoCopy.details} />
      <div className={mediaStyles.process}>
        <h3 className={mediaStyles.processTitle}><HeadingText text={tr(videoCopy.processTitle, lang)} /></h3>
        <ProcessSteps lang={lang} steps={videoCopy.steps} headingLevel={4} />
      </div>
    </>
  );
}
