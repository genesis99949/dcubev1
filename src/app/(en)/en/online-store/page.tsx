import { ServicePage, serviceMetadata } from "@/components/pages/ServicePage";

export const metadata = serviceMetadata("store", "en");

export default function Page() {
  return <ServicePage serviceKey="store" lang="en" />;
}
