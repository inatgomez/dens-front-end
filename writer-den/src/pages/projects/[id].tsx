import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Layout from "@/components/custom/layout";
import IdeasList from "@/components/custom/list-ideas";

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
    <Layout>
      <div className='flex flex-col col-span-4 items-center p-4 min-h-screen'>
        <h1 className='text-3xl text-slate-50 font-bold'>{project.name}</h1>
        <p className='text-xl text-slate-50'>
          {project.main_genre} / {project.mix_genre}
        </p>
        <IdeasList projectId={id as string} />
      </div>
    </Layout>
  );
}
