import { ProjectPage, projectMetadata, projectStaticParams, type ProjectPageProps } from "@/components/pages/ProjectPage";

export const generateStaticParams = projectStaticParams;

export const generateMetadata = (props: ProjectPageProps) => projectMetadata("en", props);

export default function Page(props: ProjectPageProps) {
  return <ProjectPage lang="en" {...props} />;
}
