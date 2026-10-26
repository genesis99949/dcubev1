import { ServicePage, serviceMetadata } from "@/components/pages/ServicePage";

export const metadata = serviceMetadata("website", "en");

export default function Page() {
  return <ServicePage serviceKey="website" lang="en" />;
}
