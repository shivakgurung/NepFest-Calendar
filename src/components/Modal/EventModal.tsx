import { useMemo, useState, useEffect } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { MIN_YEAR, NEPALI_MONTHS_OF_YEAR } from '../../lib/constant';
import { BSDateProps } from '../../types/BSDate';
import { handleAddMyEvent, handleUpdateMyEvent } from '../../utils/HandleMyEvents';

interface EventModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    eventData?: { date: string; text: string }; // Existing event data for edit mode
}

export default function EventModal({ isOpen, setIsOpen, eventData }: EventModalProps) {
    const [BS, setBS] = useState<BSDateProps>({ year: 2000, month: 1, day: 1 });
    const [text, setText] = useState<string>('');

    useEffect(() => {
        if (eventData) {
            const [year, month, day] = eventData.date.split('-').map(Number);
            setBS({ year, month, day });
            setText(eventData.text);
        } else {
            setBS({ year: 2000, month: 1, day: 1 });
            setText('');
        }
    }, [eventData]);

    const years = useMemo(() => Array.from({ length: 100 }, (_, i) => MIN_YEAR + i), []);
    const days = useMemo(() => Array.from({ length: 32 }, (_, i) => 1 + i), []);

    const handleClose = () => {
        setIsOpen(false)
    }
    const handleOpen = () => {
        setIsOpen(true)
    }

    const handleSubmit = () => {
        if (!text) return;
        const eventDate = `${BS.year}-${String(BS.month).padStart(2, '0')}-${String(BS.day).padStart(2, '0')}`;

        if (eventData) {
            handleUpdateMyEvent(eventData.date, eventData.text, eventDate, text); // Updating event
        } else {
            handleAddMyEvent(eventDate, text); // Adding event
        }
        setText('')
        handleClose();
    };

    return (
        <>
            {!eventData ? (<button className="bg-indigo-600 hover:bg-indigo-700 text-gray-200 p-2 rounded-lg" onClick={handleOpen}>Add Event</button>) : (<span
                onClick={handleOpen}
                className={"text-indigo-600 data-focus:bg-gray-100 data-focus:text-gray-900  block px-4 py-2 text-sm   data-focus:outline-hidden"}
            >
                Update Event
            </span>)}
            <Dialog open={isOpen} onClose={handleClose} className="relative z-10 bg--gray-200">
                <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
                <div className="fixed inset-0 z-10 flex items-center justify-center">
                    <DialogPanel className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
                        <DialogTitle className="text-lg font-semibold text-gray-800">
                            {eventData ? 'Edit Event' : 'Add Event'}
                        </DialogTitle>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 ">Date</label>
                            <div className="flex gap-2 mt-1">
                                <select className='text-gray-600 border border-gray-500 rounded' value={BS.year} onChange={(e) => setBS({ ...BS, year: Number(e.target.value) })}>
                                    {years.map((year) => <option key={year} value={year}>{year}</option>)}
                                </select>
                                <select
                                className='text-gray-600 border border-gray-500 rounded'
                                 value={BS.month} onChange={(e) => setBS({ ...BS, month: Number(e.target.value) })}>
                                    {NEPALI_MONTHS_OF_YEAR.map((month, i) => <option key={i} value={i + 1}>{month}</option>)}
                                </select>
                                <select
                                className='text-gray-600 border border-gray-500 rounded'
                                 value={BS.day} onChange={(e) => setBS({ ...BS, day: Number(e.target.value) })}>
                                    {days.map((day) => <option key={day} value={day}>{day}</option>)}
                                </select>
                            </div>

                            <label className="block mt-3 text-sm font-medium text-gray-700">Event Description</label>
                            <textarea 
                            className='text-gray-600 border border-gray-500 rounded w-full p-2'
                            onKeyDown={(e) => e.stopPropagation()}
                            defaultValue={text} onChange={(e) => {
                                // e.preventDefault();
                                setText(e.target.value)
                            }} ></textarea>
                        </div>

                        <div className="mt-4 flex justify-end">
                            <button onClick={handleSubmit} disabled={!text} className="disabled:opacity-50 bg-indigo-600 text-white px-4 py-2 rounded">
                                {eventData ? 'Update Event' : 'Add Event'}
                            </button>
                            <button onClick={handleClose} className="ml-2 bg-gray-400 px-4 py-2 rounded">Cancel</button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
}
