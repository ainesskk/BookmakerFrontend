import EventsList from "./EventsList.jsx";
import {useEffect, useState} from "react";
import {getEvents} from "../../api/eventApi.js";
import SearchBar from "../Searchbar/Searchbar.jsx"

export default function EventsPage() {
    const [events, setEvents] = useState([]);
    const [noEvents, setNoEvents] = useState(true);
    const [searchStringEvent, setSearchStringEvent] = useState(() => sessionStorage.getItem("searchStringEvent") || "");


    useEffect(() => {
        sessionStorage.setItem("searchStringEvent", searchStringEvent);
        if (searchStringEvent !== "") {
            eventsSearch();
        } else {
            setNoEvents(true);
            setEvents([]);
        }
    }, [searchStringEvent])

    const eventsSearch = async () => {
        if (searchStringEvent === "") {
            setNoEvents(true);
            setEvents([]);
            return;
        }

        const data = await getEvents(searchStringEvent)
        if (data !== undefined) {
            if (data.length !== 0) {
                setEvents(data);
                setNoEvents(false);
            } else {
                setNoEvents(true);
                setEvents([]);
            }
        } else {
            setNoEvents(true);
            setEvents([]);
        }
    };

    const buttonClick = async () => {
        eventsSearch();
    };

    const updateSearchStringEvent = (searchStringEvent) => {
        setSearchStringEvent(searchStringEvent);
    }

    return (
        <>
            <div className="w-50 mt-5 m-auto position-relative ">
                <div className="w-100">
                    <SearchBar searchString={searchStringEvent} updateSearchString={updateSearchStringEvent}
                               buttonClick={buttonClick} placeholder={"Введите название события..."}/>
                </div>
                <div className="w-100 mt-5 m-auto">
                    {noEvents === true ?
                        <div className="d-flex justify-content-center align-items-center">
                            <p className="fs-5 m-auto pt-4">Нет результатов</p>
                        </div> :
                        <EventsList events={events}/>}
                </div>
            </div>

        </>
    )
}