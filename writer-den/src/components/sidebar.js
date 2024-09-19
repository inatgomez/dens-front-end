import { Button } from "@headlessui/react";
import { HomeIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

export default function SideBar() {
  return (
    <div className='flex flex-col justify-start items-stretch bg-neutral-10 w-full p-4'>
      <div className='mb-2 p-4 border-b-2 border-neutral-98'>
        <h1 className='text-neutral-98 text-bold text-xl'>Writer's Den</h1>
      </div>
      <div className='flex justify-start mt-3'>
        <Button className='flex justify-between items-center rounded-md py-1.5 px-3 text-sm/6 font-semibold text-neutral-98 data-[hover]:bg-neutral-50 data-[open]:bg-neutral-70 data-[focus]:outline-1 data-[focus]:outline-neutral-98 h-8'>
          <HomeIcon
            aria-hidden='true'
            className='mr-1 h-5 w-5 text-neutral-98'
          />
          Home
        </Button>
      </div>
      <div className='flex justify-start mt-3'>
        <Button className='flex justify-between items-center rounded-md py-1.5 px-3 text-sm/6 font-semibold text-neutral-98 data-[hover]:bg-neutral-50 data-[open]:bg-neutral-50 data-[focus]:outline-1 data-[focus]:outline-neutral-98 h-8'>
          <PlusCircleIcon
            aria-hidden='true'
            className='mr-1 h-5 w-5 text-neutrtal-98'
          />
          New Project
        </Button>
      </div>
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
