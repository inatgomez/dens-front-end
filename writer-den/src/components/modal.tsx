import React, { ReactNode } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";

interface Props {
  children: ReactNode;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ children, title, isOpen, onClose }: Props) {
  return (
    <Dialog open={isOpen} onClose={onClose} className='relative z-50'>
      <DialogBackdrop className='fixed inset-0 bg-neutral-10/70' />

      <div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
        <DialogPanel
          className='bg-secondary-50 rounded-lg border border-secondary-10 shadow-sm shadow-secondary-80 max-w-lg space-y-4'
          onClick={(e) => e.stopPropagation()}
        >
          <div className='flex mx-auto min-h-full flex-1 flex-col justifiy-center max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8'>
            <DialogTitle className='text-xl font-bold text-center leading-7 text-neutral-98'>
              {title}
            </DialogTitle>
            {children}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
