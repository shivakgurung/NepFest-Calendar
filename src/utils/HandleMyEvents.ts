import { toast } from "react-toastify";

interface Event {
    date: string;
    text: string;
}

export const handleDeleteMyEvent = (date: string, text: string) => {
    const storedEvents = getPersonalEvents()

    const newEventList = storedEvents.filter(event => {
        return !(event.date == date && event.text == text);
    })

    sortAndStoreEvents(newEventList)
    toast.success("You have successfully deleted the event. ");

}




export const handleUpdateMyEvent = (
    oldDate: string,
    oldText: string,
    newDate: string,
    newText: string
) => {
    const storedEvents = getPersonalEvents();

    const updatedEvents = storedEvents.map(event => {
        if (event.date === oldDate && event.text === oldText) {
            // Update the event with new values
            return { date: newDate, text: newText };
        }
        return event; // Keep other events unchanged
    });

    sortAndStoreEvents(updatedEvents);
    toast.success("You have successfully updated the event. ");

};



export const handleAddMyEvent = (date: string, text: string) => {
    const storedEvents = getPersonalEvents()

    // Add new event
    const updatedEvents = [...storedEvents, { date, text }];
    // console.log(`Updated Events `, updatedEvents)

    sortAndStoreEvents(updatedEvents)
    toast.success("You have successfully added an event. ");
    


}



export const getPersonalEvents = () => {
    const storedEvents: Event[] = JSON.parse(localStorage.getItem("events") || "[]");
    return storedEvents;

}



export const sortAndStoreEvents = (newEventList: Event[]) => {
    // Sort events by date (chronologically)
    newEventList.sort((a, b) => a.date.localeCompare(b.date));

    // Save back to localStorage
    localStorage.setItem("events", JSON.stringify(newEventList));
    window.dispatchEvent(new Event("storage"));
}

export const getMyEvents = (searchValue : string) => {
    const events = getPersonalEvents()
    const myEvents = events.filter(event => {
        return event.text.includes(searchValue)
    })
    return myEvents
}