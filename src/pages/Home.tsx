// import { ADToBS } from "bikram-sambat-js";
import { useGetFestivals } from '../hooks/useGetFestivals';
import { Day } from '../types/day';
import EventList from "../components/Main/EventList";
import { useMemo } from "react";
import Calendar from "../components/Main/Calendar";
import { useCalendar } from "../context/CalendarContext";
import DateSet from "../components/DateSet/DateSet";
import { toNepaliNumber } from '../utils/ConvertToNepaliNumber';


const Home = () => {

    const { currentNepaliDate, selectedYearMonth } = useCalendar();
    const { data, isLoading } = useGetFestivals(selectedYearMonth?.year, selectedYearMonth?.month);


    const festivals: Day[] = useMemo(() => {
        return (data?.days ?? []).filter((day: Day) => {
            return day.h && !!day.f
        })
    }, [data?.days])



    return (
        < >
            <div className="w-full max-w-7xl mx-auto px-2 lg:px-8 py-8" >

                {isLoading ? <p>Loading...</p> : (
                    <div className="mb-4">
                        <h3 className='text-3xl pr-4 leading-8 font-semibold text-gray-900'>Today's Date:</h3>
                        <h5 className="text-2xl pr-4 leading-8 font-semibold text-gray-900">{ data?.metadata?.np + ", " + toNepaliNumber(currentNepaliDate?.day)}</h5>
                        <h5 className="text-l leading-8 font-semibold text-gray-900">{new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</h5>
                    </div>
                )}

                <DateSet />
                <br /><br />

                {isLoading ? <p>Loading...</p> : (
                    // renderCalendar(data?.days)
                    <>
                        <Calendar dayArray={data?.days} monthMeta={data?.metadata} />
                        <br /><br />
                        <EventList dayArray={festivals} monthMeta={data?.metadata} />
                    </>
                )}
            </div>

        </>
    );

}

// const renderCalendar = (monthData: Day[]) => {
//     return (
//         <div className="grid grid-cols-7 gap-2">
//             {DAYS_OF_WEEK.map((day, index) => (
//                 <div key={index} className="border border-gray-300 p-2">
//                     <div className={"text-center text-gray-800  " + (index == 6 ? ' text-red-300' : '')}>{day?.initial}</div>
//                 </div>
//             ))}
//             {monthData.map((day, index) => (
//                 <div key={index} className="border border-gray-300 p-2">
//                     <div className={"text-center text-gray-800 " + (day.h ? ' text-red-300' : '')}>{day.n}</div>
//                     {day.f && <div className={"text-sm text-gray-800 " + (day.h ? ' text-red-300' : '')}>{day.f}</div>}
//                 </div>
//             ))}
//         </div>
//     );
// };

export default Home