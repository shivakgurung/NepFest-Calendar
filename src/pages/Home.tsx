import { ADToBS } from "bikram-sambat-js";
import { useGetFestivals } from '../hooks/useGetFestivals';
import { Day } from '../types/day';
import EventList from "../components/Main/EventList";
import { useMemo, useState } from "react";
import Calendar from "../components/Main/Calendar";
import { NEPALI_MONTHS_OF_YEAR } from "../lib/constant";


const Home = () => {
    const [selectedYearMonth, setSelectedYearMonth] = useState({
        year: 2081,
        month: 11,
    });
    const currentBSDate = ADToBS(new Date().toISOString().split("T")[0]);
    const currentNepaliYear = parseInt(currentBSDate.split("-")[0]);
    const currentNepaliMonth = parseInt(currentBSDate.split("-")[1]);
    const currentNepaliDay = parseInt(currentBSDate.split("-")[2]);
    console.log(`date : ${currentBSDate}, nep year: ${currentNepaliYear}, nep month: ${currentNepaliMonth}, nep Day: ${currentNepaliDay}`)


    const { data, isLoading } = useGetFestivals(selectedYearMonth?.year, selectedYearMonth?.month);


    const festivals: Day[] = useMemo(() => {
        return (data?.days ?? []).filter((day: Day) => {
            return day.h && !!day.f
        })
    }, [data?.days])

    // Generate years from 2000 to 2100
    const years = useMemo(() => Array.from({ length: 21 }, (_, i) => 2080 + i), []);

    return (
        < >
            <div className="w-full max-w-7xl mx-auto px-2 lg:px-8 py-8" >
                {/* <h2 className="text-2xl text-gray-800 font-bold underline">
                    Nepalese Festivals
                </h2> */}
                {/* <h2 className="text-gray-800">Nepali Festivals for {currentNepaliYear}, Month {currentNepaliMonth}</h2> */}

                <form className="max-w-sm mx-auto flex">
                    {/* <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-900 ">Year</label> */}
                    <select id="year"
                        defaultValue={selectedYearMonth?.year}
                        onChange={(e) =>
                            setSelectedYearMonth(prev => ({ ...prev, year: Number(e.target.value) }))
                        }
                        className=" mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block p-2.5 overflow-y-scroll scrollbar-hide">
                        {years.map((year) => (
                            <option
                                key={year}
                                value={year}

                                className={year === selectedYearMonth?.year ? "bg-blue-400" : ""}
                            >
                                {year}
                            </option>
                        ))}
                    </select>

                    {/* <label htmlFor="month" className="block mb-2 text-sm font-medium text-gray-900 ">Month</label> */}
                    <select
                        defaultValue={selectedYearMonth?.month}
                        onChange={(e) =>
                            setSelectedYearMonth(prev => ({ ...prev, month: Number(e.target.value) }))
                        }
                        id="month" className="mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block p-2.5">

                        {NEPALI_MONTHS_OF_YEAR?.map((month, i) => {
                            return (
                                <option
                                    className={i == selectedYearMonth?.month - 1 ? "bg-blue-400" : ""} value={i + 1} >{month}</option>

                            )
                        })}
                    </select>

                </form>
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