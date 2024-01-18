import { getEvent } from "@/lib/firestore_interface";
import { getUser } from "@/lib/firestore_interface";
import { Container, Card, ListGroup } from "react-bootstrap";

export async function getServerSideProps({ query }) {
  const event = await getEvent(query.event);
  const userData = await getUser(event.techerId);

  return {
    props: {
      eventData: event,
      userData: userData,
    },
  };
}

export default function EventPage({ eventData, userData }) {
  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h5>{eventData.title}</h5>
        </div>
        <div className="card-body">
          <h5 className="card-title">Subject: {eventData.subject}</h5>
          <strong>Event Details:</strong>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Day: {new Date(eventData.start).toLocaleString().split(", ")[0]}
            </li>
            <li className="list-group-item">
              Start Time:{" "}
              {new Date(eventData.start).toLocaleString().split(", ")[1]}
            </li>
            <li className="list-group-item">
              End Time:{" "}
              {new Date(eventData.end).toLocaleString().split(", ")[1]}
            </li>
            <li className="list-group-item">Price: ${eventData.price}</li>
            <li className="list-group-item">
              Minimum Students: {eventData.minStudents}
            </li>
            <li className="list-group-item">
              Maximum Students: {eventData.maxStudents}
            </li>
            <li className="list-group-item">
              Students Applied:{" "}
              {eventData.students == null ? 0 : eventData.students.length}
            </li>
          </ul>
        </div>
      </div>
      <div className="card mt-5">
        <div className="card-header">
          <h5>Teacher Details</h5>
        </div>
        <div className="card-body">
          <h5 className="card-title">{userData.displayName}</h5>
          <p className="card-text">E-mail: {userData.email}</p>
        </div>
      </div>
    </div>
  );
}
