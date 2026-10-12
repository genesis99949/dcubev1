import type React from "react";
import { RootShell } from "@/components/RootShell";
import { rootMetadata } from "@/content/seo";

// Root layout of the Romanian site (/ro). Each language has its own root layout so <html lang> is right.
export const metadata = rootMetadata("ro");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="ro">{children}</RootShell>;
}
