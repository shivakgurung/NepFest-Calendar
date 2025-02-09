// import { ADToBS } from "bikram-sambat-js";
import { useGetMonthData } from '../hooks/useGetMonthData';
import { Day } from '../types/day';
import EventList from "../components/Main/EventList";
import { useMemo, useState } from "react";
import Calendar from "../components/Main/Calendar";
import { useCalendar } from "../context/CalendarContext";
import DateSet from "../components/DateSet/DateSet";
import { toNepaliNumber } from '../utils/ConvertToNepaliNumber';
import { NEPALI_MONTHS_OF_YEAR } from '../lib/constant';
import ToggleView from '../components/Toggle/Toggle';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';


const Home = () => {

    const { currentNepaliDate, selectedYearMonth } = useCalendar();
    const { data, isLoading } = useGetMonthData(selectedYearMonth?.year, selectedYearMonth?.month);
    const [isShowCalendar, setIsShowCalendar] = useState<boolean>(true)

    const festivals: Day[] = useMemo(() => {
        return (data?.days ?? []).filter((day: Day) => {
            return day.h && !!day.f
        })
    }, [data?.days])



    return (
        < >
            <div className="w-full max-w-7xl mx-auto px-2 lg:px-8 py-8" >

                {isLoading ? (<LoadingSpinner/>) : (
                    <div className="mb-4">
                        <h3 className='text-3xl pr-4 leading-8 font-semibold text-gray-900  mb-2 underline'>Today's Date</h3>
                        <h5 className="text-2xl pr-4 leading-8 font-semibold text-gray-900">{NEPALI_MONTHS_OF_YEAR[currentNepaliDate?.month - 1] + " " + toNepaliNumber(currentNepaliDate?.year) + ", " + toNepaliNumber(currentNepaliDate?.day)}</h5>
                        <h5 className="text-l leading-8 font-semibold text-gray-900">{new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</h5>
                    </div>
                )}
                <br />
                <div className="flex justify-center gap-x-0 sm:gap-x-4 lg:gap-x-10  w-full">
                    <DateSet />
                    <ToggleView isShowCalendar={isShowCalendar} setIsShowCalendar={setIsShowCalendar} />
                </div>
                <br />

                {isLoading ? (<LoadingSpinner/>) : (
                    // renderCalendar(data?.days)
                    <>
                        {isShowCalendar ? <Calendar dayArray={data?.days} monthMeta={data?.metadata} /> : <EventList dayArray={festivals} monthMeta={data?.metadata} />}
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