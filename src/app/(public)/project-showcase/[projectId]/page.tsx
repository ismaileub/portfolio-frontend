/* eslint-disable @typescript-eslint/no-explicit-any */

import ProjectDetailsCard from "@/components/modules/projectShowcase/ProjectDetailsCard";
import { getProjectById } from "@/services/PostServices";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const { projectId } = await params;
  const project = await getProjectById(projectId);

  return {
    title: project?.title,
    description: project?.content,
  };
};

const ProjectDetailsPage = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const { projectId } = await params;
  const project = await getProjectById(projectId);

  return <ProjectDetailsCard project={project} />;
};

export default ProjectDetailsPage;
