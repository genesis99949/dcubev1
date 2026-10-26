import { ServicePage, serviceMetadata } from "@/components/pages/ServicePage";

export const metadata = serviceMetadata("website", "ro");

export default function Page() {
  return <ServicePage serviceKey="website" lang="ro" />;
}
