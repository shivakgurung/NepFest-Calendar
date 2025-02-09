import { FC } from "react"
import { DAYS_OF_WEEK } from "../../lib/constant"
import { CalendarProps, Day } from "../../types/day"

const Calendar: FC<CalendarProps> = ({ dayArray, monthMeta }) => {
  return (
    <>
      <div className="col-span-12 xl:col-span-7 px-2.5 py-5 sm:p-8 bg-gradient-to-b from-white/25 to-white xl:bg-white rounded-2xl max-xl:row-start-1">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-5">
          <div className="flex items-center justify-between gap-4 w-full">
            <button className="text-indigo-600 p-1 rounded transition-all duration-300 hover:text-white hover:bg-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10.0002 11.9999L6 7.99971L10.0025 3.99719" stroke="currentcolor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>
            {/* <div><p className="text-gray-800">button</p></div> */}
              <h5 className="text-2xl pr-4 leading-8 font-semibold text-gray-900">{monthMeta?.np}</h5>
            <div className="flex items-center justify-between">
              <h5 className="text-l leading-8 font-semibold text-gray-900">{monthMeta?.en}</h5>

              <button className="text-indigo-600 p-1 rounded transition-all duration-300 hover:text-white hover:bg-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6.00236 3.99707L10.0025 7.99723L6 11.9998" stroke="currentcolor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* <div className="flex items-center rounded-md p-1 bg-indigo-50 gap-px">
                    <button className="py-2.5 px-5 rounded-lg bg-indigo-50 text-indigo-600 text-sm font-medium transition-all duration-300 hover:bg-indigo-600 hover:text-white">Day</button>
                    <button className="py-2.5 px-5 rounded-lg bg-indigo-600 text-white text-sm font-medium transition-all duration-300 hover:bg-indigo-600 hover:text-white">Week</button>
                    <button className="py-2.5 px-5 rounded-lg bg-indigo-50 text-indigo-600 text-sm font-medium transition-all duration-300 hover:bg-indigo-600 hover:text-white">Month</button>
                  </div> */}

        </div>
        <div className="border border-indigo-200 rounded-xl bg-indigo-50 overflow-hidden">
          <div className="grid grid-cols-7 rounded-t-3xl border-b border-indigo-200  ">
            {DAYS_OF_WEEK.map((day) => {
              return (
                <div key={day?.name} className={(day?.initial == 'Sa' ? "text-red-600" : "text-indigo-600 border-r ") + " py-3.5   border-indigo-200 flex items-center justify-center text-sm font-medium "}>{day?.initial}</div>
              )
            })}
          </div>
          <div className="grid grid-cols-7 rounded-b-xl">
            {dayArray?.map((day: Day, index: number) => (
              <div
                key={index}
                className={`relative flex flex-col items-center justify-center xl:aspect-square max-xl:min-h-[60px] 
      p-3.5 bg-gray-50 border-r border-b border-indigo-200 transition-all duration-300 hover:bg-indigo-50
      ${day.h ? "text-red-600" : "text-gray-400"}`}
              >

                <span className="text-3xl xl:text-4xl font-bold">{day?.n}</span>


                <span className="text-xs font-semibold mt-1">{day?.e}</span>

                {/* Festival name (only if it's a holiday and has a festival) */}
                {day?.h && !!day?.f && (
                  <div className="absolute bottom-4 left-3.5 p-1.5 xl:px-2.5 h-max rounded bg-purple-50">
                    <p className="hidden xl:block text-xs font-medium text-red-500 mb-px">{day?.f}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>




    </>
  )
}

export default Calendar

