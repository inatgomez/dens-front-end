import React, { useState, useEffect } from "react";
import { getProjects } from "@/services/projectService";
import Link from "next/link";

interface Project {
  unique_id: string;
  name: string;
  main_genre: string;
  mix_genre: string;
  created_at: string;
  message?: string;
}

export default function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const data = await getProjects();
      setProjects(data);
      setLoading(false);
    }
    fetchProjects();
  }, []);

  if (loading) return <p className='text-base text-neutral-98'>Loading...</p>;

  return (
    <div className='bg-slate-800 min-h-screen'>
      <div className='mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8'>
        <h2 className='text-xl text-slate-50 font-bold'>Projects</h2>

        <div className='mt-4 grid grid-cols-6 gap-x-6 gap-y-10 xl:gap-x-8'>
          {projects.map((project) => (
            <Link
              key={project.unique_id || project.message}
              href={`/projects/${project.unique_id}`}
              className='group'
            >
              <div className='max-h-40 max-w-sm overflow-hidden rounded-lg bg-violet-700 shadow-sm shadow-violet-900 p-4'>
                <h2 className='text-xl text-slate-50'>
                  {project.name || project.message}
                </h2>
                {project.main_genre && (
                  <p className='text-base text-slate-50'>
                    {project.main_genre}, {project.mix_genre}
                  </p>
                )}
                {project.created_at && (
                  <p className='text-sm text-slate-50'>
                    Created on:
                    {new Date(project.created_at).toLocaleDateString()}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
