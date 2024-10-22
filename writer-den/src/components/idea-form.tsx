import React from "react";
import { useState, useEffect } from "react";
import Modal from "./modal";
import { useModal } from "@/context/modal-context";
import { createIdea } from "@/services/ideaService";
import { getProjects } from "@/services/projectService";

interface Project {
  name: string;
  unique_id: string;
}

export default function IdeaForm() {
  const { isIdeaModalOpen, closeIdeaModal } = useModal();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Random");
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      const projectsData = await getProjects();
      setProjects(projectsData);
    }
    fetchProjects();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProject) {
      alert("Please select a project.");
      return;
    }

    const ideaData = {
      title,
      content,
      category: category.toUpperCase(),
      project_id: selectedProject,
    };

    try {
      await createIdea(ideaData);
      alert("Idea created successfully!");
      closeIdeaModal;
    } catch (error) {
      alert("Failed to create idea. Please try again.");
    }
  };

  return (
    <Modal title='New Idea' isOpen={isIdeaModalOpen} onClose={closeIdeaModal}>
      <div className='mt-10 flex flex-cols gap-6'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label
              htmlFor='title'
              className='block text-base font-medium leading-6 text-neutral-98'
            >
              Title
            </label>
            <div className='mt-2'>
              <input
                id='title'
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='block w-full rounded-md border-0 py-1.5 text-neutral-10 shadow-sm ring-1 ring-inset ring-neutral-30 placeholder:text-neutral-40 focus:ring-2 focus:ring-inset focus:ring-primary-60 sm:text-sm sm:eading-6'
              />
            </div>
          </div>

          <div>
            <label
              htmlFor='content'
              className='block text-base font-medium leading-6 text-neutral-98'
            >
              What's your idea?
            </label>
            <div className='mt-2'>
              <textarea
                id='content'
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className='block w-full rounded-md border-0 py-1.5 text-neutral-10 shadow-sm ring-1 ring-inset ring-neutral-30 placeholder:text-neutral-40 focus:ring-2 focus:ring-inset focus:ring-primary-60 sm:text-sm sm:eading-6'
              />
            </div>
          </div>
          <div className='mt-2 grid grid-cols-2 gap-x-6 gap-y-8'>
            <div>
              <label
                htmlFor='category'
                className='block text-base font-medium leading-6 text-neutral-98'
              >
                Category
              </label>
              <div className='mt-2'>
                <select
                  id='category'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className='block w-full rounded-md border-0 py-1.5 text-neutral-10 shadow-sm ring-1 ring-inset ring-neutral-70 placeholder:text-neutral-40 focus:ring-2 focus:ring-inset focus:ring-primary-40 sm:text-sm sm:leading-6'
                >
                  <option>Plot</option>
                  <option>Character</option>
                  <option>Theme</option>
                  <option>Setting</option>
                  <option>Research</option>
                  <option>Random</option>
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor='project'
                className='block text-base font-medium leading-6 text-neutral-98'
              >
                Project
              </label>
              <div className='mt-2'>
                <select
                  id='project'
                  value={selectedProject || ""}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className='block w-full rounded-md border-0 py-1.5 text-neutral-10 shadow-sm ring-1 ring-inset ring-neutral-70 placeholder:text-neutral-40 focus:ring-2 focus:ring-inset focus:ring-primary-40 sm:text-sm sm:leading-6'
                >
                  <option value=''>Select a poject</option>
                  {projects.map((project) => (
                    <option key={project.unique_id} value={project.unique_id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div>
            <button
              type='submit'
              className='flex w-full justify-center rounded-md bg-tertiary-60 px-3 py-1.5 text-base font-semibold leading-6 text-neutral-10 shadow-sm hover:bg-tertiary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiary-60'
            >
              Save idea
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
