import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { alternates } from "@/content/seo";

export const metadata: Metadata = { alternates: alternates("en", "/") };

export default function Page() {
  return <HomePage lang="en" />;
}
