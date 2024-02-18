import { deleteEvent } from "@/lib/firestore_interface";
import { useState } from "react";
import Link from "next/link";

export default function TeacherEvents({ events: initialEvents }) {
    const [events, setEvents] = useState(initialEvents);

    const handleDelete = async (id) => {
        await deleteEvent(id);
        setEvents(events.filter(event => event.id !== id));
    };

    return (
        <div className="card text-center mx-auto my-5" style={{maxWidth: '80%', minHeight: "500px"}}>
            <div className="card-body">
                <h1 className="card-title">Teacher Events</h1>
                <div className="d-flex flex-wrap justify-content-center">
                    {events.map((event) => (
                        <Event key={event.id} event={event} onDelete={handleDelete} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function Event({ event, onDelete }) {
    return (
        <div className="card m-2" style={{width: '90%'}}>
            <div className="card-body d-flex justify-content-between">
                <Link href={`/events/${event.id}`} className="stretched-link">
                    <h2 className="card-title">{event.title}</h2>
                </Link>
                <button className="btn btn-danger" onClick={() => onDelete(event.id)}>Delete</button>
            </div>
        </div>
    );
}