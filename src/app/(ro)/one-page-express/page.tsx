import { ExpressPage, expressMetadata } from "@/components/pages/ExpressPage";

export const metadata = expressMetadata("ro");

export default function Page() {
  return <ExpressPage lang="ro" />;
}
