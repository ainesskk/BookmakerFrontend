import Event from "./Event.jsx";

export default function EventsList({events}) {
    return (
        <>
            <div>
                {
                    events.map(event => {
                        return <Event key={event.id} event={event}></Event>
                    })
                }
            </div>
        </>
    )
}