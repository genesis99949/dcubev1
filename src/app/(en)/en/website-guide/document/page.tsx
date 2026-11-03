import { GuideDocument, guideDocumentMetadata } from "@/components/pages/GuidePage";

export const metadata = guideDocumentMetadata("en");

export default function Page() {
  return <GuideDocument lang="en" />;
}
