import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Button,
} from "@headlessui/react";
import { BellIcon, UserIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  return (
    <Disclosure as='nav' className='bg-primary-10'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-16 items-center justify-between'>
          <Button className='rounded-md bg-primary-80 py-1.5 px-3 text-sm/6 font-semibold text-neutral-10 shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-primary-70 data-[open]:bg-primary-70 data-[focus]:outline-1 data-[focus]:outline-primary-80'>
            New Note
          </Button>
          <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
            <button
              type='button'
              className='relative rounded-full bg-neutral-30 p-1 text-neutral-98 hover:text-neutral-98 focus:outline-none focus:ring-2 focus:ring-neutral-98 focus:ring-offset-2 focus:ring-offset-neutral-50'
            >
              <span className='absolute -inset-1.5' />
              <span className='sr-only'>View notifications</span>
              <BellIcon aria-hidden='true' className='h-6 w-6' />
            </button>

            {/* Profile dropdown */}
            <Menu as='div' className='relative ml-3'>
              <div>
                <MenuButton className='relative flex rounded-full bg-neutral-30 text-neutral-98 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-98 focus:ring-offset-2 focus:ring-offset-neutral-50'>
                  <span className='absolute -inset-1.5' />
                  <span className='sr-only'>Open user menu</span>
                  <UserIcon aria-hidden='true' className='h-8 w-8' />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-neutral-98 py-1 shadow-lg ring-1 ring-primary-20 ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in'
              >
                <MenuItem>
                  <a
                    href='#'
                    className='block px-4 py-2 text-sm text-neutral-10 data-[focus]:bg-neutral-90'
                  >
                    Your Profile
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href='#'
                    className='block px-4 py-2 text-sm text-neutral-10 data-[focus]:bg-neutral-90'
                  >
                    Settings
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href='#'
                    className='block px-4 py-2 text-sm text-neutral-10 data-[focus]:bg-neutral-90'
                  >
                    Sign out
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
