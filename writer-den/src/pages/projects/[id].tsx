import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import RootLayout from "@/components/root-layout";
import ProjectForm from "@/components/project-form";
import IdeaForm from "@/components/idea-form";
import IdeasList from "@/components/list-ideas";
import { useModal } from "@/context/modal-context";

interface Project {
  unique_id: string;
  name: string;
  main_genre: string;
  mix_genre: string;
  created_at: string;
}
export default function ProjectPage() {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const { isIdeaModalOpen, isProjectModalOpen } = useModal();

  useEffect(() => {
    async function fetchProject() {
      if (id) {
        const response = await fetch(
          `http://localhost:8000/ideasrecording/projects/${id}`
        );
        const data = await response.json();
        setProject(data);
        setLoading(false);
      }
    }
    fetchProject();
  }, [id]);

  if (loading)
    return <p className='text-base text-neutral-98'>Loading project</p>;
  if (!project)
    return <p className='text-base text-neutral-98'>Project not found</p>;

  return (
    <RootLayout>
      <div className='flex flex-col col-span-4 p-4 bg-neutral-10 min-h-screen'>
        <h1 className='text-3xl text-neutral-98 font-bold'>{project.name}</h1>
        <p className='text-xl text-neutral-98'>
          {project.main_genre} / {project.mix_genre}
        </p>
        <p className='text-sm text-neutral-90'>
          Created on: {new Date(project.created_at).toLocaleDateString()}
        </p>
        <IdeasList projectId={id as string} />
      </div>

      {isIdeaModalOpen && <IdeaForm />}
      {isProjectModalOpen && <ProjectForm />}
    </RootLayout>
  );
}
