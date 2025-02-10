import { FC } from "react"
import { CalendarProps, Day } from "../../types/day"
import Event from "./Event"

const EventList: FC<CalendarProps> = ({ dayArray, monthMeta }) => {
  return (
    <div className="my-4 col-span-12 xl:col-span-5">
      <h2 className="font-manrope text-3xl leading-tight text-gray-900 my-4">विदा तथा पर्वहरु:</h2>
      {/* <p className="text-lg font-normal text-gray-600 mb-8">Plan & celebrate to the fullest</p> */}
      <div className="flex gap-5 flex-col">

        {dayArray?.map((festival: Day, i: number) => {
          return (
            <div key={i} className="p-6 rounded-xl bg-white">
              <Event
                date={festival?.n + ", " + monthMeta?.np + " (" + festival?.e + ", " + monthMeta?.en + ")"}
                text={festival?.f}
                isShowOptions={false}
              />

            </div>
          )
        })}


      </div>
    </div>

  )
}

export default EventList