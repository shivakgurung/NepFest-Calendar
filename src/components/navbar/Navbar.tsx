import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'
import EventModal from '../Modal/EventModal'
import { useState } from 'react'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Festivals', href: '/festivals' },
  { name: 'My Events', href: '/my-events' },
  { name: 'Date Converter', href: '/convert-date' },
]



export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <Disclosure as="nav" className="border-b w-full border-gray-300 pb-4 ">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <img className="h-24 w-auto" src="/NepaliCalendarLogo.png" alt="Your Company" />
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-6 mt-[35px]">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <EventModal isOpen={isOpen} setIsOpen={setIsOpen}  />
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={close}
              className="block rounded-md px-3 py-2 text-base font-medium"
            >
              <DisclosureButton>
                {item.name}
              </DisclosureButton>
            </NavLink>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
