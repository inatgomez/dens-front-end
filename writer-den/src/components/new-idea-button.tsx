import React from "react";
import { Button } from "@headlessui/react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

export default function NewIdeaButton() {
  return (
    <div className='flex lg:flex-1 justify-start mt-3'>
      <Button className='flex justify-between items-center rounded-md bg-primary-80 py-1.5 px-3 text-sm/6 font-semibold text-neutral-10 shadow-inner shadow-primary-60 focus:outline-none data-[hover]:bg-primary-70 data-[open]:bg-primary-70 data-[focus]:outline-1 data-[focus]:outline-primary-80 h-12'>
        <PlusCircleIcon aria-hidden='true' className='mr-1 h-6 w-6' />
        New Note
      </Button>
    </div>
  );
}
