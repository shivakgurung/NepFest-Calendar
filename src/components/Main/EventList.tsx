import { FC } from "react"
import { Day } from "../../types/day"

interface EventListProps {
    festivals: Day[];
}

const EventList: FC<EventListProps> = ({festivals}) => {
  return (
    <div className="col-span-12 xl:col-span-5">
                <h2 className="font-manrope text-3xl leading-tight text-gray-900 mb-1.5">Upcoming Festivals</h2>
                <p className="text-lg font-normal text-gray-600 mb-8">Plan to celebrate to the fullest</p>
                <div className="flex gap-5 flex-col">

                  {festivals?.map((festival: Day)=> {
                    return (
                        <div className="p-6 rounded-xl bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                        <p className="text-base font-medium text-gray-900">Jan 14, 2020 10:00 - 11:00</p>
                      </div>
                      <div className="dropdown relative inline-flex">
                        <button type="button" data-target="dropdown-b" className="dropdown-toggle inline-flex justify-center py-2.5 px-1 items-center gap-2 text-sm text-black rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:text-emerald-600  ">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="4" viewBox="0 0 12 4" fill="none">
                            <path d="M1.85624 2.00085H1.81458M6.0343 2.00085H5.99263M10.2124 2.00085H10.1707" stroke="currentcolor" stroke-width="2.5" stroke-linecap="round"></path>
                          </svg>

                        </button>
                        <div id="dropdown-b" className="dropdown-menu rounded-xl shadow-lg bg-white absolute -left-10 top-full w-max mt-2 hidden" aria-labelledby="dropdown-b">
                          <ul className="py-2">
                            <li>
                              <a className="block px-6 py-2 text-xs hover:bg-gray-100 text-gray-600 font-medium" href="javascript:;">
                                Edit
                              </a>
                            </li>
                            <li>
                              <a className="block px-6 py-2 text-xs hover:bg-gray-100 text-gray-600 font-medium" href="javascript:;">
                                Remove
                              </a>
                            </li>

                          </ul>
                        </div>
                      </div>
                    </div>
                    <h6 className="text-xl leading-8 font-semibold text-black mb-1">{festival?.f}</h6>
                    <p className="text-base font-normal text-gray-600">View Detail</p>
                  </div>
                    )
                  })}

                  
                </div>
              </div>

  )
}

export default EventList