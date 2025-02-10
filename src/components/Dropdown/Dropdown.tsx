import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { LocalEvent } from '../../types/LocalEvent';
import { FC, useState } from 'react';
import DeleteConfirmationModal from '../Modal/DeleteConfirmation';
import EventModal from '../Modal/EventModal';

interface OptionProps {
    options: string[];
}
type DropdownProps = OptionProps & LocalEvent;

const Dropdown: FC<DropdownProps> = ({ options, date, text }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [editEvent] = useState({
        date, 
        text
    });


    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white p-1 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                    </svg>

                </MenuButton>
            </div>

            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
                <div className="py-1">
                    {options?.map((option) => {
                        return (
                            <MenuItem key={option}>
                                {
                                    option == "Delete" ? (
                                        // <span
                                        // onClick={()=>{handleDeleteMyEvent(date, text)}}
                                        // className={"text-red-600 data-focus:bg-red-100 data-focus:text-red-900  block px-4 py-2 text-sm   data-focus:outline-hidden"}
                                        // >
                                        //     {option}
                                        // </span>
                                        <DeleteConfirmationModal date={date} text={text} />
                                    ) : (
                                        <EventModal
                                            isOpen={isOpen}
                                            setIsOpen={setIsOpen}
                                            eventData={editEvent}
                                        />
                                        // <span
                                        //     // onClick={handleUpdate}
                                        //     className={"text-indigo-600 data-focus:bg-gray-100 data-focus:text-gray-900  block px-4 py-2 text-sm   data-focus:outline-hidden"}
                                        // >
                                        //     {option}
                                        // </span>
                                    )
                                }

                            </MenuItem>
                        )
                    })}
                </div>
            </MenuItems>
        </Menu>
    )
}

export default Dropdown