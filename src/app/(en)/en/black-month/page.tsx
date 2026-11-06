import { blackFridayMetadata, ExpressPage } from "@/components/pages/ExpressPage";

export const metadata = blackFridayMetadata("en");

export default function Page() {
  return <ExpressPage lang="en" campaign />;
}
