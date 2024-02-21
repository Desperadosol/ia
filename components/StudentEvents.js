import { useState, useContext } from "react";
import Link from "next/link";

import { UserContext } from "@/lib/context";
import { deleteStudentFromEvent } from "@/lib/firestore_interface";
import toast from "react-hot-toast";

export default function StudentEvents({ events: initialEvents }) {
  const { user } = useContext(UserContext);
  const [events, setEvents] = useState(initialEvents);

  const handleDelete = async (eventid, studentid) => {
    await deleteStudentFromEvent(eventid, studentid);
    setEvents(events.filter((event) => event.id !== eventid));
    toast.success("You have successfully left the event.");
  };

  return (
    <div
      className="card text-center mx-auto my-5"
      style={{ maxWidth: "80%", minHeight: "500px" }}
    >
      <div className="card-body">
        <h1 className="card-title">My Events</h1>
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
        <div className="my-2">
          <Link href="/calendar" className="btn btn-light btn-lg">
            View All Events
          </Link>
        </div>
      </div>
    </div>
  );
}

function Event({ event, onDelete, userID }) {
  const [loading, setLoading] = useState(false);

  const Delete = async (eventID, userID) => {
    setLoading(true);
    await onDelete(eventID, userID);
    setLoading(false);
  };

  
  return (
    <div className="card m-2" style={{ width: "90%" }}>
      <div className="card-body">
        <h2 className="card-title text-center">{event.title}</h2>
        <div className="row mt-4">
          <div className="col-12 col-md-6 fs-5 text-center ">
            <p className="card-text">
              Date: {new Date(event.start).toDateString()}
            </p>
            <p className="card-text">
              Start of the Event: {new Date(event.start).toLocaleTimeString()}
            </p>
            <p className="card-text">
              End of the Event: {new Date(event.end).toLocaleTimeString()}
            </p>
          </div>
          <div className="col-12 col-md-6 mt-3 mt-md-0 fs-5 text-center">
            <p className="card-text">Subject: {event.subject}</p>
            {event.googleMeetLink ? (
              <div className="text-center d-flex justify-content-center">
                <button
                  className="btn btn-light btn-lg d-flex align-items-center"
                  onClick={() =>
                    window.open(event.googleMeetLink, "_blank")
                  }
                >
                  Join the meeting
                  <img
                    src="/googlemeet.png"
                    style={{
                      maxWidth: "32px",
                      maxHeight: "32px",
                      marginLeft: "4px",
                    }}
                  />
                </button>
              </div>
            ) : (
              <p className="card-text">Google Meet link is not specified</p>
            )}
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12 col-md-6 text-center">
            <Link
              href={`/events/${event.id}`}
              className="btn btn-light d-block mx-auto"
            >
              Visit the event page
            </Link>
          </div>
          <div className="col-12 col-md-6 text-center mt-3 mt-md-0">
            <button
              className="btn btn-danger d-block mx-auto w-100"
              onClick={() => Delete(event.id, userID)}
            >
              {loading ? "Leaving..." : "Leave"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
