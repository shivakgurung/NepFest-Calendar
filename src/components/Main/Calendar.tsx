import { FC } from "react"
import { DAYS_OF_WEEK } from "../../lib/constant"
import { CalendarProps, Day } from "../../types/day"

const Calendar: FC<CalendarProps> = ({ dayArray, monthMeta }) => {
  return (
    <>
      <div className="col-span-12 xl:col-span-7 px-1 py-5 sm:p-8 bg-gradient-to-b from-white/25 to-white xl:bg-white rounded-2xl max-xl:row-start-1">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-5">
         
        <h5 className="text-2xl pr-4 leading-8 font-semibold text-gray-900">{monthMeta?.np}</h5>
            <div className="flex items-center justify-between">
              <h5 className="text-l leading-8 font-semibold text-gray-900">{monthMeta?.en}</h5>
              </div>
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
                className={`relative flex flex-col  justify-center xl:aspect-square max-xl:min-h-[60px] 
      p-3.5 bg-gray-50 border-r border-b border-indigo-200 transition-all duration-300 hover:bg-indigo-50
      ${day.h ? "text-red-600" : "text-gray-600"}`}
              >

                <span className="text-lg sm:text-3xl xl:text-4xl font-bold sm:absolute sm:top-4 sm:left-8 md:left-12  ">{day?.n}</span>


                <span className=" text-[10px] sm:text-xs font-semibold  absolute top-2 right-2  sm:mt-1 sm:relatve ">{day?.e}</span>

                {/* Festival name (only if it's a holiday and has a festival) */}
                <div className="hidden sm:block">
                  {day?.h && !!day?.f && (
                    <div className="absolute bottom-4 left-3.5 p-1.5 xl:px-2.5 h-max rounded bg-purple-50">
                      <p className="hidden xl:block text-xs font-medium text-red-500 mb-px">{day?.f}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>




    </>
  )
}

export default Calendar

