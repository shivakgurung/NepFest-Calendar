import { FC } from "react"
import { LocalEvent } from "../../types/LocalEvent"
import Dropdown from "../Dropdown/Dropdown";


interface isShowOptionProps {
    isShowOptions: boolean;
}

type EventProps = LocalEvent & isShowOptionProps;

const Event: FC<EventProps> = ({ date, text, isShowOptions }) => {
    
    return (
        < >
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5  flex-1 justify-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                    <p className="text-base font-medium text-gray-900 text-center">{date}</p>
                </div>
                {isShowOptions? (<Dropdown options={["Update", "Delete"]} date={date} text={text}/>):null}
            </div>
            <h6 className="text-xl leading-8 font-semibold text-black mb-1">{text}</h6>
            {/* <p className="text-base font-normal text-gray-600">View Detail</p> */}
        </>
    )
}

export default Event