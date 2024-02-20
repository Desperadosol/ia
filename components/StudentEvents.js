import { useState, useContext } from "react";
import Link from "next/link";

import { UserContext } from "@/lib/context";
import { deleteStudentFromEvent } from "@/lib/firestore_interface";

export default function StudentEvents({ events: initialEvents }) {
  const { user } = useContext(UserContext);
  const [events, setEvents] = useState(initialEvents);

  const handleDelete = async (eventid, studentid) => {
    await deleteStudentFromEvent(eventid, studentid);
    setEvents(events.filter((event) => event.id !== eventid));
  };

  return (
    <div
      className="card text-center mx-auto my-5"
      style={{ maxWidth: "80%", minHeight: "500px" }}
    >
      <div className="card-body">
        <h1 className="card-title">Joined Events</h1>
        <div className="d-flex flex-wrap justify-content-center">
          {events.map((event) => (
            <Event
              key={event.id}
              event={event}
              onDelete={handleDelete}
              userID={user.uid}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Event({ event, onDelete, userID }) {
  return (
    <div className="card m-2" style={{ width: "90%" }}>
      <div className="card-body d-flex justify-content-between align-items-center">
        <h2 className="card-title">{event.title}</h2>

        <div>
          <Link href={`/events/${event.id}`} className="btn btn-light mx-2">
            Visit the event page
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => onDelete(event.id, userID)}
          >
            Leave
          </button>
        </div>
      </div>
    </div>
  );
}
