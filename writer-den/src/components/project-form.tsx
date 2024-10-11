import React from "react";
import Modal from "./modal";
export default function ProjectForm() {
  return (
    <Modal title={"Create new project"}>
      <form>
        <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8'>
          <div className='sm:col-span-full'>
            <label
              htmlFor='project-title'
              className='block text-sm font-medium leading-6 text-neutral-98'
            >
              Title
            </label>
            <div className='mt-2'>
              <input
                id='project-title'
                name='project-title'
                type='text'
                className='block w-full rounded-md border-0 py-1.5 text-primary-10 shadow-sm ring-1 ring-inset ring-neutral-70 placeholder:text-neutral-40 focus:ring-2 focus:ring-inset focus:ring-primary-40 sm:text-sm sm:leading-6'
              />
            </div>
          </div>

          <div className='sm:col-span-full'>
            <label
              htmlFor='country'
              className='block text-sm font-medium leading-6 text-neutral-98'
            >
              Main Genre
            </label>
            <div className='mt-2'>
              <select
                id='main-genre'
                name='main-genre'
                className='block w-full rounded-md border-0 py-1.5 text-primary-10 shadow-sm ring-1 ring-inset ring-neutral-70 placeholder:text-neutral-40 focus:ring-2 focus:ring-inset focus:ring-primary-40 sm:text-sm sm:leading-6'
              >
                <option>Sci-Fi</option>
                <option>Romance</option>
                <option>Fantasy</option>
                <option>Mistery</option>
                <option>Comedy</option>
                <option>Action</option>
                <option>Drama</option>
              </select>
            </div>
          </div>

          <div className='sm:col-span-full'>
            <label
              htmlFor='country'
              className='block text-sm font-medium leading-6 text-neutral-98'
            >
              Other Genre
            </label>
            <div className='mt-2'>
              <select
                id='other-genre'
                name='other-genre'
                className='block w-full rounded-md border-0 py-1.5 text-primary-10 shadow-sm ring-1 ring-inset ring-neutral-70 placeholder:text-neutral-40 focus:ring-2 focus:ring-inset focus:ring-primary-40 sm:text-sm sm:leading-6'
              >
                <option>None</option>
                <option>Sci-Fi</option>
                <option>Romance</option>
                <option>Fantasy</option>
                <option>Mistery</option>
                <option>Comedy</option>
                <option>Action</option>
                <option>Drama</option>
              </select>
            </div>
          </div>

          <button
            type='submit'
            className='flex w-full justify-center rounded-md bg-tertiary-60 px-3 py-1.5 text-sm font-semibold leading-6 text-neutral-10 shadow-sm hover:bg-tertiary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiary-60'
          >
            Save project
          </button>
        </div>
      </form>
    </Modal>
  );
}
