import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Button,
  Input,
} from "@headlessui/react";
import {
  BellIcon,
  UserCircleIcon,
  PlusCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
  return (
    <div className='bg-neutral-10'>
      <nav
        aria-label='Global'
        className='flex items-center justify-between p-6 lg:px-8 mx-auto h-16'
      >
        <div className='flex lg:flex-1'>
          <Button className='flex justify-between items-center rounded-md bg-primary-80 py-1.5 px-3 text-sm/6 font-semibold text-neutral-10 shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-primary-70 data-[open]:bg-primary-70 data-[focus]:outline-1 data-[focus]:outline-primary-80'>
            <PlusCircleIcon aria-hidden='true' className='mr-1 h-6 w-6' />
            New Note
          </Button>
        </div>
        <div className='flex justify-center items-center'>
          <MagnifyingGlassIcon
            aria-hidden='true'
            className='mr-2 h-10 w-10 text-neutral-98'
          />
          <Input
            name='search'
            type='text'
            className='mt-3 block w-full rounded-2xl border-2 bg-neutral-30 py-1.5 px-3 text-sm/6 text-neutral-98 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-neutral-98'
          />
        </div>
        <div className='flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
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
              <MenuButton className='relative flex'>
                <span className='absolute -inset-1.5' />
                <span className='sr-only'>Open user menu</span>
                <UserCircleIcon
                  aria-hidden='true'
                  className='h-10 w-10 text-neutral-98'
                />
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
      </nav>
    </div>
  );
}
