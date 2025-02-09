import { useMemo } from "react";
import { useCalendar } from "../../context/CalendarContext";
import { MAX_YEAR, MIN_YEAR, NEPALI_MONTHS_OF_YEAR } from "../../lib/constant";

const DateSet = () => {
    const { selectedYearMonth, setSelectedYearMonth } = useCalendar();
    // Generate years from 2000 to 2100
    const years = useMemo(() => Array.from({ length: 21 }, (_, i) => 2080 + i), []);

    const isNextDisabled = selectedYearMonth.year >= MAX_YEAR && selectedYearMonth.month >= 12;
    const isPrevDisabled = selectedYearMonth.year <= MIN_YEAR && selectedYearMonth.month <= 1;



    const getNextMonth = () => {
        if (selectedYearMonth?.month > 11) {
            let year = selectedYearMonth?.year + 1;
            setSelectedYearMonth(() => ({ year, month: 1 }))
        }
        else {
            let month = selectedYearMonth?.month + 1;
            setSelectedYearMonth((prev) => ({ ...prev, month }))
        }
    }

    const getPrevMonth = () => {
        if (selectedYearMonth?.month == 1) {
            let year = selectedYearMonth?.year - 1;
            setSelectedYearMonth(() => ({ year, month: 12 }))
        }
        else {
            let month = selectedYearMonth?.month - 1;
            setSelectedYearMonth((prev) => ({ ...prev, month }))
        }
    }

    return (
        <div className="flex">
            <button
                disabled={isPrevDisabled}
                aria-disabled="true"
                aria-describedby=""
                title=""
                onClick={getPrevMonth}
                className="disabled:bg-gray-600 disabled:cursor-not-allowed p-2 rounded transition-all duration-300 text-white bg-indigo-600 hover:bg-indigo-700" >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10.0002 11.9999L6 7.99971L10.0025 3.99719" stroke="currentcolor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
            </button>
            <form className="flex">
                {/* <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-900 ">Year</label> */}
                <select id="year"
                    value={selectedYearMonth?.year}
                    onChange={(e) =>
                        setSelectedYearMonth((prev) => ({ ...prev, year: Number(e.target.value) }))
                    }

                    className=" mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block p-2.5 overflow-y-scroll scrollbar-hide">
                    {years.map((year) => (
                        <option
                            key={year}
                            value={year}

                            className={year === selectedYearMonth?.year ? "bg-indigo-600" : ""}
                        >
                            {year}
                        </option>
                    ))}
                </select>

                {/* <label htmlFor="month" className="block mb-2 text-sm font-medium text-gray-900 ">Month</label> */}
                <select
                    value={selectedYearMonth?.month}
                    onChange={(e) =>
                        setSelectedYearMonth((prev) => ({ ...prev, month: Number(e.target.value) }))
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


            <button
                disabled={isNextDisabled}
                onClick={getNextMonth}
                aria-disabled="true"
                aria-describedby=""
                title=""
                className=" disabled:bg-gray-600 disabled:cursor-not-allowed p-2 rounded transition-all duration-300 text-white bg-indigo-600 hover:bg-indigo-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6.00236 3.99707L10.0025 7.99723L6 11.9998" stroke="currentcolor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
            </button>
        </div>
    )
}

export default DateSet