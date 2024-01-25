import { deleteEvent } from "@/lib/firestore_interface";
import { useState } from "react";

export default function TeacherEvents({ events: initialEvents }) {
    const [events, setEvents] = useState(initialEvents);

    const handleDelete = async (id) => {
        await deleteEvent(id);
        setEvents(events.filter(event => event.id !== id));
    };

    return (
        <div>
            <h1>Teacher Events</h1>
            <ul>
                {events.map((event) => (
                    <Event key={event.id} event={event} onDelete={handleDelete} />
                ))}
            </ul>
        </div>
    );
}

function Event({ event, onDelete }) {
    return (
        <li>
            <h2>{event.title}</h2>
            <p>{event.subject}</p>
            <button className="btn btn-danger" onClick={() => onDelete(event.id)}>Delete</button>
        </li>
    );
}