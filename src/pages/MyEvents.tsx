import { useEffect, useState } from "react";
import { LocalEvent } from "../types/LocalEvent";
import Event from "../components/Main/Event";
import { getMyEvents, getPersonalEvents } from "../utils/HandleMyEvents";



const MyEvents = () => {

    const [myEvents, setMyEvents] = useState<LocalEvent[]>([]);
    const [searchValue, setSearchValue] = useState<string>('')

    useEffect(() => {
        setMyEvents(getMyEvents(searchValue))
    }, [searchValue])

    useEffect(() => {
        setMyEvents(getPersonalEvents());
    }, []);

    useEffect(() => {
        const syncEvents = () => {
            setMyEvents(getPersonalEvents());
        };

        // Listen for localStorage changes
        window.addEventListener("storage", syncEvents);

        return () => {
            window.removeEventListener("storage", syncEvents);
        };
    }, []);


    return (
        <div className="min-h-[80vh] flex justify-center items-start max-w-7xl mx-auto px-2 lg:px-8 py-8">



            <div className="col-span-12 md:col-span-5 w-full">

                {!myEvents ? (<div className="flex-col">
                    <div className="flex justify-center">
                        <img src="/empty-box.svg" alt="empty box to show no personal event" className="h-16 w-16 text-center " />

                    </div>  <h3>No personal events found</h3>
                </div>) : (
                    <div className=" w-full flex-col ">
                        <div >
                            <div className=" flex-col  pb-2 mb-6 sm:flex-row  sm:justify-between">
                                <div className="flex items-end ">
                                    <h2 className=" font-semibold text-indigo-900 text-2xl pb-2  w-full  text-start ">My Events</h2>
                                </div>
                                <div className="flex min-w-[320px]">
                                    <form className="w-full">
                                        <div className="relative w-full">
                                            <div className="w-full absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                                </svg>
                                            </div>
                                            <input
                                                onChange={(e) => setSearchValue(e.target.value)}
                                                type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 " placeholder="Search personal events" required />
                                            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2 ">Search</button>
                                        </div>
                                    </form>
                                </div>

                            </div>
                            {/* <div className="flex-col gap-2 w-full ">
                            </div> */}
                            {searchValue && (<h6 className="text-gray-500 text-start">Results</h6>)}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {myEvents?.map((event: LocalEvent) => {
                                    return (

                                        <div key={event?.text.substring(0, 5) + event?.date} className="w-full my-2 p-6 rounded-xl border-indigo-100 border bg-white">
                                            {/* <div key={festival?.name_np} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 "> */}
                                            {/* <h5 className="mb-2 text-xl font-bold tracking-tight text-indigo-900 ">{event?.text}</h5>
                                                    <p className="font-normal text-gray-700 ">{event?.date}</p> */}
                                            <Event date={event?.date} text={event?.text} isShowOptions={true} />

                                        </div>


                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyEvents;
