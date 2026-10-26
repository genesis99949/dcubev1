import { ServicePage, serviceMetadata } from "@/components/pages/ServicePage";

export const metadata = serviceMetadata("store", "ro");

export default function Page() {
  return <ServicePage serviceKey="store" lang="ro" />;
}
