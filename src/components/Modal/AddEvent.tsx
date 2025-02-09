import { useMemo, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { NEPALI_MONTHS_OF_YEAR } from '../../lib/constant';
import { BSDateProps } from '../../types/BSDate';




export default function AddEvent() {
    const [open, setOpen] = useState(false)
    const [BS, setBS] = useState<BSDateProps>({
        year: 2000,
        month: 1,
        day: 1,
    });
    const [text, setText] = useState<string>('')

    const years = useMemo(() => Array.from({ length: 21 }, (_, i) => 2080 + i), []);
    const days = useMemo(() => Array.from({ length: 32 }, (_, i) => 1 + i), []);

    const handleBSChange = (field: string, value: number) => {
        setBS((prev) => ({ ...prev, [field]: value }));
    };

        const handleAddEvent = () => {
            if (!text) return; // Prevent empty events
        
            // Convert BS date to a sortable format (YYYY-MM-DD)
            const eventDate = `${BS.year}-${String(BS.month).padStart(2, '0')}-${String(BS.day).padStart(2, '0')}`;
        
            // Retrieve existing events from localStorage
            const storedEvents: Event[] = JSON.parse(localStorage.getItem("events") || "[]");
        
            // Add new event
            const updatedEvents = [...storedEvents, { date: eventDate, text }];
            // console.log(`Updated Events `, updatedEvents)
        
            // Sort events by date (chronologically)
            updatedEvents.sort((a, b) => a.date.localeCompare(b.date));
        
            // Save back to localStorage
            localStorage.setItem("events", JSON.stringify(updatedEvents));
        
            // Close modal & reset input
            setOpen(false);
            setText("");
        };
        
        

    return (
        <div>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-gray-200 p-2 rounded-lg" onClick={()=> setOpen(true)}>Add Event</button>
            <Dialog open={open} onClose={setOpen} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
                                <div className="sm:flex ">
                                    <div className="mx-auto  flex size-12 shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:size-10">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                        </svg>

                                    </div>
                                    <div className="mt-3 text-center flex-1  sm:mt-0 sm:ml-4 sm:text-left">
                                        <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                            Add an Event                  </DialogTitle>
                                        <div className="mt-4 w-full ">
                                            <h6 className="block mb-2 text-sm font-medium text-gray-600 dark:text-white">Date</h6>

                                            <form className="flex gap-x-2 mb-3">
                                                <select
                                                    id="year"
                                                    value={BS.year}
                                                    onChange={(e) => handleBSChange("year", Number(e.target.value))}
                                                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
                                                >
                                                    {years.map((year) => (
                                                        <option key={year} value={year}>{year}</option>
                                                    ))}
                                                </select>

                                                <select
                                                    value={BS.month}
                                                    onChange={(e) => handleBSChange("month", Number(e.target.value))}
                                                    id="month"
                                                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
                                                >
                                                    {NEPALI_MONTHS_OF_YEAR.map((month, i) => (
                                                        <option key={i} value={i + 1}>{month}</option>
                                                    ))}
                                                </select>

                                                <select
                                                    id="day"
                                                    value={BS.day}
                                                    onChange={(e) => handleBSChange("day", Number(e.target.value))}
                                                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
                                                >
                                                    {days.map((day) => (
                                                        <option key={day} value={day}>{day}</option>
                                                    ))}
                                                </select>
                                            </form>

                                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-600 dark:text-white">Text</label>
                                            <textarea onChange={(e) => { setText(e.target.value) }} id="message" rows={2} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write event info here"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="button"
                                    onClick={handleAddEvent}
                                    disabled={!text}
                                    className="disabled:opacity-30 inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                                >
                                    Add Event
                                </button>
                                <button
                                    type="button"
                                    data-autofocus
                                    onClick={() => setOpen(false)}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                    Cancel
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>

    )
}
