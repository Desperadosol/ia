import { deleteEvent } from "@/lib/firestore_interface";
import { useState, useContext } from "react";

import { UserContext } from "@/lib/context";
import { deleteStudentFromEvent } from "@/lib/firestore_interface";

export default function StudentEvents({ events: initialEvents }) {
    const { user } = useContext(UserContext);
    const [events, setEvents] = useState(initialEvents);

    const handleDelete = async (eventid, studentid) => {
        await deleteStudentFromEvent(eventid, studentid);
        setEvents(events.filter(event => event.id !== eventid));
    };

    return (
        <div>
            <h1>Student Events</h1>
            <ul>
                {events.map((event) => (
                    <Event key={event.id} event={event} onDelete={handleDelete} userID={user.uid}/>
                ))}
            </ul>
        </div>
    );
}

function Event({ event, onDelete, userID }) {
    return (
        <li>
            <h2>{event.title}</h2>
            <p>{event.subject}</p>
            <button className="btn btn-danger" onClick={() => onDelete(event.id, userID)}>Leave</button>
        </li>
    );
}