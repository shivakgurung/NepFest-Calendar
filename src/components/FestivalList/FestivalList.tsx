import { ADToBS } from "bikram-sambat-js";
import { useGetFestivals } from '../../hooks/useGetFestivals';
import { Day } from '../../types/day';
import { DAYS_OF_WEEK } from "../../lib/constant";
import EventList from "../Main/EventList";
import { useMemo } from "react";


const FestivalList = () => {
    const currentBSDate = ADToBS(new Date().toISOString().split("T")[0]);
    const currentNepaliYear = parseInt(currentBSDate.split("-")[0]);
    const currentNepaliMonth = parseInt(currentBSDate.split("-")[1]);
    // console.log(`date : ${currentBSDate}, nep year: ${currentNepaliYear}, nep month: ${currentNepaliMonth}`)

    const { data, isLoading } = useGetFestivals(currentNepaliYear, currentNepaliMonth); 
    
    const festivals: Day[] = useMemo(()=>{
        return (data?.days ?? []).filter((day:Day)=> {
            return day.h && !!day.f
        }) 
    }, [data])

    return (
        < >
            <h2 className="text-gray-800">Nepali Festivals for {currentNepaliYear}, Month {currentNepaliMonth}</h2>
            <br /><br />
            {isLoading ? <p>Loading...</p> : (
                renderCalendar(data?.days)
            )}
            <EventList festivals={festivals}/>
        </>
    );

}

const renderCalendar = (monthData: Day[]) => {
    return (
        <div className="grid grid-cols-7 gap-2">
            {DAYS_OF_WEEK.map((day, index) => (
                <div key={index} className="border border-gray-300 p-2">
                    <div className={"text-center text-gray-800  " + (index == 6 ? ' text-red-300' : '')}>{day?.initial}</div>
                </div>
            ))}
            {monthData.map((day, index) => (
                <div key={index} className="border border-gray-300 p-2">
                    <div className={"text-center text-gray-800 " + (day.h ? ' text-red-300' : '')}>{day.n}</div>
                    {day.f && <div className={"text-sm text-gray-800 " + (day.h ? ' text-red-300' : '')}>{day.f}</div>}
                </div>
            ))}
        </div>
    );
};

export default FestivalList