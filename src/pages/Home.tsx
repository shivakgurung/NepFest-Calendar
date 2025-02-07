
import FestivalList from "../components/FestivalList/FestivalList"
import Calendar from "../components/Main/Calendar"
import EventList from "../components/Main/EventList"

const Home = () => {
    
    return (
        <>
            <div className="w-full max-w-7xl mx-auto px-2 lg:px-8">
                <h2 className="text-2xl text-gray-800 font-bold underline">
                    Nepalese Festivals
                </h2>
                <FestivalList />
                <br />
                <br />


                <div className="grid grid-cols-12 gap-8 max-w-4xl mx-auto xl:max-w-full">
                    <Calendar />
                    <EventList />
                </div>
            </div>
        </>
    )
}

export default Home