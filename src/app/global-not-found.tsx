import type { Metadata } from "next";
import Link from "next/link";
import { RootShell } from "@/components/RootShell";
import { tr } from "@/content/i18n";
import { ui } from "@/content/ui";

// 404 for any unknown URL. With one root layout per language there is no shared layout to
// render it in, so this page brings its own document (in Romanian first, then English).
export const metadata: Metadata = { title: "404" };

export default function GlobalNotFound() {
  return (
    <RootShell lang="ro">
      <main
        className="container"
        style={{ minHeight: "70dvh", display: "grid", alignContent: "center", justifyItems: "center", gap: 20, textAlign: "center" }}
      >
        <p className="eyebrow">404</p>
        <h1 className="headline">
          {tr(ui.notFound.title, "ro")}
          <span className="dot" aria-hidden />
        </h1>
        <p className="lead" lang="en">
          {tr(ui.notFound.title, "en")}.
        </p>
        <p style={{ display: "flex", gap: 28 }}>
          <Link href="/" className="more">
            {tr(ui.notFound.back, "ro")}
          </Link>
          <Link href="/en" className="more" lang="en">
            {tr(ui.notFound.back, "en")}
          </Link>
        </p>
      </main>
    </RootShell>
  );
}
