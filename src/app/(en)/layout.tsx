import type React from "react";
import { RootShell } from "@/components/RootShell";
import { rootMetadata } from "@/content/seo";

// Root layout of the English site (/en). Each language has its own root layout so <html lang> is right.
export const metadata = rootMetadata("en");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
