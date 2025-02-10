import { useEffect, useState } from "react";
import { LocalEvent } from "../types/LocalEvent";
import Event from "../components/Main/Event";
import { getPersonalEvents } from "../utils/HandleMyEvents";



const MyEvents = () => {

    const [myEvents, setMyEvents] = useState<LocalEvent[]>([]);

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

                    </div>                <h3>No personal events found</h3>
                </div>) : (
                    <div className=" w-full flex-col ">
                        <h2 className="font-semibold text-indigo-900 text-2xl mb-4 w-full pb-2 text-start border-b border-b-indigo-900">My Events</h2>                    <div className="flex-col gap-2 w-full ">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {myEvents?.map((event: LocalEvent, i: number) => {
                                    return (
                                        
                                            <div key={event?.text.substring(0,5) + event?.date} className="w-full my-2 p-6 rounded-xl border-indigo-100 border bg-white">
                                                {/* <div key={festival?.name_np} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 "> */}
                                                {/* <h5 className="mb-2 text-xl font-bold tracking-tight text-indigo-900 ">{event?.text}</h5>
                                                    <p className="font-normal text-gray-700 ">{event?.date}</p> */}
                                                <Event date={event?.date} text={event?.text} isShowOptions={true}/>

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
