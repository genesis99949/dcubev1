import { blackFridayMetadata, ExpressPage } from "@/components/pages/ExpressPage";

export const metadata = blackFridayMetadata("ro");

export default function Page() {
  return <ExpressPage lang="ro" campaign />;
}
