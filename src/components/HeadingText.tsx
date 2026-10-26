import styles from "./HeadingText.module.css";

/** Replace a heading's final full stop with the wordmark square, keeping its spoken text. */
export function HeadingText({ text }: { text: string }) {
  if (!text.endsWith(".")) return text;

  const sentence = text.slice(0, -1);
  const lastWordStart = sentence.lastIndexOf(" ") + 1;

  return (
    <>
      {sentence.slice(0, lastWordStart)}
      <span className={styles.ending}>
        {sentence.slice(lastWordStart)}
        <span className="mark" aria-hidden="true" />
        <span className="visually-hidden">.</span>
      </span>
    </>
  );
}
