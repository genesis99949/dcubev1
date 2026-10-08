import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="container"
      style={{ minHeight: "70dvh", display: "grid", alignContent: "center", justifyItems: "center", gap: 20, textAlign: "center" }}
    >
      <p className="eyebrow">404</p>
      <h1 className="headline">
        Nothing here<span className="dot" aria-hidden />
      </h1>
      <Link href="/" className="more">
        Back to Dcube
      </Link>
    </main>
  );
}
