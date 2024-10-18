import React from "react";
import { Button } from "@headlessui/react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useModal } from "@/context/modal-context";

export default function NewProjectButton() {
  const { openProjectModal } = useModal();

  return (
    <div className='mt-3 py-1.5 px-3 rounded-md h-8 hover:bg-neutral-50'>
      <Button
        onClick={openProjectModal}
        className='flex justify-between items-center text-sm font-semibold leading-6 text-neutral-98'
      >
        <PlusCircleIcon
          aria-hidden='true'
          className='mr-1 h-5 w-5 text-neutral-98'
        />
        New Project
      </Button>
    </div>
  );
}
