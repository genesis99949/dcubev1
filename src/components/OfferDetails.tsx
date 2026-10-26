import { tr, type L, type Lang } from "@/content/i18n";
import styles from "./OfferDetails.module.css";

export function OfferDetails({ lang, title, items }: {
  lang: Lang;
  title: L;
  items: readonly { question: L; answer: L }[];
}) {
  return (
    <div className={styles.details}>
      <h3>{tr(title, lang)}</h3>
      {items.map((item) => (
        <details key={item.question.en}>
          <summary>{tr(item.question, lang)}</summary>
          <p>{tr(item.answer, lang)}</p>
        </details>
      ))}
    </div>
  );
}
