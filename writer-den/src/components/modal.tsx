import React, { ReactNode } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import { useState } from "react";

interface Props {
  children: ReactNode;
  title: string;
}

export default function Modal({ children, title }: Props) {
  let [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogBackdrop className='fixed inset-0 bg-black/30' />
      <DialogPanel className='bg-secondary-10'>
        <div className='flex mx-auto min-h-full flex-1 flex-col justifiy-center max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8'>
          <DialogTitle className='text-base font-bold leading-7 text-neutral-98'>
            {title}
          </DialogTitle>
          {children}
        </div>
      </DialogPanel>
    </Dialog>
  );
}
