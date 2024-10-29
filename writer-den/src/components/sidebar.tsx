import React from "react";
import { HomeIcon } from "@heroicons/react/24/outline";
import NewProjectButton from "./new-project-button";

export default function SideBar() {
  return (
    <div className='flex flex-col justify-start items-stretch bg-primary-10 w-full p-4'>
      <div className='mb-2 p-4 border-b-2 border-neutral-98'>
        <h1 className='text-neutral-98 text-bold text-xl'>Writer's Den</h1>
      </div>
      <div className='mt-3 py-1.5 px-3 rounded-md h-8 hover:bg-neutral-50'>
        <a
          href='#'
          className='flex justify-start items-center text-sm font-semibold leading-6 text-neutral-98'
        >
          <HomeIcon
            aria-hidden='true'
            className='mr-1 h-5 w-5 text-neutral-98'
          />
          Home
        </a>
      </div>
      <NewProjectButton />
      <div className='mt-3 border-t-2 border-neutral-98'>
        <div className='my-1 py-1.5 px-3 rounded-md h-8 hover:bg-neutral-50'>
          <a
            href='#'
            className='text-sm font-semibold leading-6 text-neutral-98'
          >
            Character
          </a>
        </div>
        <div className='my-1 py-1.5 px-3 rounded-md h-8 hover:bg-neutral-50'>
          <a
            href='#'
            className='block text-sm font-semibold leading-6 text-neutral-98'
          >
            Plot
          </a>
        </div>
        <div className='my-1 py-1.5 px-3 rounded-md h-8 hover:bg-neutral-50'>
          <a
            href='#'
            className='block text-sm font-semibold leading-6 text-neutral-98'
          >
            Setting
          </a>
        </div>
        <div className='my-1 py-1.5 px-3 rounded-md h-8 hover:bg-neutral-50'>
          <a
            href='#'
            className='block text-sm font-semibold leading-6 text-neutral-98'
          >
            Theme
          </a>
        </div>
        <div className='my-1 py-1.5 px-3 rounded-md h-8 hover:bg-neutral-50'>
          <a
            href='#'
            className='block text-sm font-semibold leading-6 text-neutral-98'
          >
            Research
          </a>
        </div>
      </div>
    </div>
  );
}
