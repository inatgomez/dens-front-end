import Link from "next/link";
import { useGetProjectsQuery } from "@/redux/features/projectApiSlice";

export default function ProjectsList() {
  const { data: projects = [], isLoading: projectsLoading } =
    useGetProjectsQuery();

  if (projectsLoading) {
    return (
      <div className='flex justify-center my-8'>
        <span>Loading projects...</span>
      </div>
    );
  }

  return (
    <div className='bg-slate-800 min-h-screen'>
      <div className='mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8'>
        <h2 className='text-xl text-slate-50 font-bold'>Projects</h2>

        <div className='mt-4 grid grid-cols-6 gap-x-6 gap-y-10 xl:gap-x-8'>
          {projects.map((project) => (
            <Link
              key={project.unique_id || project.message}
              href={`/notes/projects/${project.unique_id}`}
              className='group'
            >
              <div className='max-h-40 max-w-sm overflow-hidden rounded-lg bg-violet-700 shadow-sm shadow-violet-900 p-4'>
                <h2 className='text-xl text-slate-50'>
                  {project.name || project.message}
                </h2>
                {project.main_genre && (
                  <p className='text-base text-slate-50'>
                    {project.main_genre.charAt(0).toUpperCase() +
                      project.main_genre.slice(1).toLowerCase()}
                    ,{" "}
                    {project.mix_genre.charAt(0).toUpperCase() +
                      project.mix_genre.slice(1).toLowerCase()}
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
