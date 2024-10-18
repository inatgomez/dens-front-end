import React, { useState, useEffect } from "react";
import { getProjects } from "@/services/projectService";

interface Project {
  unique_id: string;
  name: string;
  main_genre: string;
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
    <div className='bg-neutral-10 min-h-screen'>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <h2 className='text-neutral-98 font-bold'>Fiction</h2>

        <div className='mt-4 grid grid-cols-6 gap-x-6 gap-y-10 xl:gap-x-8'>
          {projects.map((project) => (
            <a
              key={project.unique_id || project.message}
              href='#'
              className='group'
            >
              <div className='max-h-40 max-w-sm overflow-hidden rounded-lg bg-primary-50/70 shadow-sm shadow-primary-70 p-4'>
                <h2 className='text-xl text-neutral-98'>
                  {project.name || project.message}
                </h2>
                {project.main_genre && (
                  <p className='text-base text-neutral-98'>
                    Genre: {project.main_genre}
                  </p>
                )}
                {project.created_at && (
                  <p className='text-sm text-neutral-90'>
                    Created on:
                    {new Date(project.created_at).toLocaleDateString()}
                  </p>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
