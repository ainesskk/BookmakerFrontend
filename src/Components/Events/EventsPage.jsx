import EventsList from "./EventsList.jsx";
import {useEffect, useState} from "react";
import {getEvents} from "../../api/eventApi.js";

export default function EventsPage() {
    const [events, setEvents] = useState([]);
    const [noEvents, setNoEvents] = useState(true);
    const [searchString, setSearchString] = useState(() => sessionStorage.getItem("searchString") || "");


    useEffect(() => {
        sessionStorage.setItem("searchString", searchString);
        if (searchString !== "") {
            eventsSearch();
        } else {
            setNoEvents(true);
            setEvents([]);
        }
    }, [searchString])

    const eventsSearch = async () => {
        if (searchString === "") {
            setNoEvents(true);
            setEvents([]);
            return;
        }

        const data = await getEvents(searchString)
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

    const buttonClick = async (e) => {
        e.preventDefault();
        eventsSearch();
    };

    return (
        <>
            <div className="container w-50 mt-5 ">
                <form className="d-flex">
                    <input className="form-control me-2 fs-5" type="search" placeholder="Введите название события..."
                           aria-label="Search" value={searchString} onChange={(event) => setSearchString(event.target.value)}/>
                    <button className="btn btn-primary fs-5" type="submit" onClick={buttonClick}>Поиск</button>
                </form>
                <div>
                    { noEvents === true ?
                        <div className="d-flex justify-content-center align-items-center">
                            <p className="fs-5 m-auto pt-4">Нет результатов</p>
                        </div> :
                        <EventsList events={events}/>}
                </div>
            </div>

        </>
    )
}