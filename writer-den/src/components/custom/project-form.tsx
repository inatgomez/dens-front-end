import React, { useState } from "react";
import Modal from "./modal";
import { useModal } from "@/context/modal-context";
import { createProject } from "@/services/projectService";
export default function ProjectForm() {
  const { isProjectModalOpen, closeProjectModal } = useModal();

  const [name, setName] = useState("");
  const [mainGenre, setMainGenre] = useState("Sci-Fi");
  const [otherGenre, setOtherGenre] = useState("None");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const projectData = {
      name,
      main_genre: mainGenre.toUpperCase(),
      mix_genre: otherGenre === "None" ? "" : otherGenre.toUpperCase(),
    };

    try {
      await createProject(projectData);
      alert("Project created succesfully!");
      closeProjectModal();
    } catch (error) {
      alert("Failed to create project. Please try again.");
    }
  };

  return (
    <Modal
      title='New Project'
      isOpen={isProjectModalOpen}
      onClose={closeProjectModal}
    >
      <form onSubmit={handleSubmit}>
        <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8'>
          <div className='sm:col-span-full'>
            <label
              htmlFor='project-title'
              className='block text-base font-medium leading-6 text-neutral-98'
            >
              Project Name
            </label>
            <div className='mt-2'>
              <input
                id='name'
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='block w-full rounded-md border-0 py-1.5 text-neutral-10 shadow-sm ring-1 ring-inset ring-neutral-70 placeholder:text-neutral-40 focus:ring-2 focus:ring-inset focus:ring-primary-40 sm:text-sm sm:leading-6'
                required
              />
            </div>
          </div>

          <div className='sm:col-span-full'>
            <label
              htmlFor='main-genre'
              className='block text-base font-medium leading-6 text-neutral-98'
            >
              Main Genre
            </label>
            <div className='mt-2'>
              <select
                id='main-genre'
                value={mainGenre}
                onChange={(e) => setMainGenre(e.target.value)}
                className='block w-full rounded-md border-0 py-1.5 text-neutral-10 shadow-sm ring-1 ring-inset ring-neutral-70 placeholder:text-neutral-40 focus:ring-2 focus:ring-inset focus:ring-primary-40 sm:text-sm sm:leading-6'
              >
                <option>Romance</option>
                <option>Mistery</option>
                <option>Sci-Fi</option>
                <option>Fantasy</option>
                <option>Action</option>
                <option>Drama</option>
                <option>Detective</option>
                <option>Horror</option>
                <option>Coming of age</option>
                <option>Comedy</option>
              </select>
            </div>
          </div>

          <div className='sm:col-span-full'>
            <label
              htmlFor='other-genre'
              className='block text-base font-medium leading-6 text-neutral-98'
            >
              Other Genre
            </label>
            <div className='mt-2'>
              <select
                id='other-genre'
                value={otherGenre}
                onChange={(e) => setOtherGenre(e.target.value)}
                className='block w-full rounded-md border-0 py-1.5 text-neutral-10 shadow-sm ring-1 ring-inset ring-neutral-70 placeholder:text-neutral-40 focus:ring-2 focus:ring-inset focus:ring-primary-40 sm:text-sm sm:leading-6'
              >
                <option>Romance</option>
                <option>Mistery</option>
                <option>Sci-Fi</option>
                <option>Fantasy</option>
                <option>Action</option>
                <option>Drama</option>
                <option>Detective</option>
                <option>Horror</option>
                <option>Coming of age</option>
                <option>Comedy</option>
                <option>None</option>
              </select>
            </div>
          </div>

          <button
            type='submit'
            className='flex w-full justify-center rounded-md bg-tertiary-60 px-3 py-1.5 text-base font-semibold leading-6 text-neutral-10 shadow-sm hover:bg-tertiary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiary-60'
          >
            Save project
          </button>
        </div>
      </form>
    </Modal>
  );
}
