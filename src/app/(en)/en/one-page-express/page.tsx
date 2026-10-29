import { ExpressPage, expressMetadata } from "@/components/pages/ExpressPage";

export const metadata = expressMetadata("en");

export default function Page() {
  return <ExpressPage lang="en" />;
}
