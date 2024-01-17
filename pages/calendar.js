import React, { useState, useContext } from "react";
import Calendar from "@/components/Calendar";
import { Modal, Button } from "react-bootstrap";

import { getEvents } from "@/lib/firestore_interface";
import EventForm from "@/components/EventForm";
import { UserContext } from "@/lib/context";

export async function getServerSideProps() {
  const events = await getEvents();
  return {
    props: {
      events,
    },
  };
}

export default function CalendarPage({ events, theme }) {
  const { user, role } = useContext(UserContext);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <h1>Calendar</h1>
      {(role == "teacher" || role=="admin") && (
        <>
          <Button variant="primary" onClick={handleShow}>
            Add Event
          </Button>
          <Modal show={show} onHide={handleClose} style={{ padding: 0 }}>
            <Modal.Header closeButton>
              <Modal.Title>Add Lesson</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <EventForm />
            </Modal.Body>
          </Modal>
        </>
      )}
      <Calendar events={events} theme={theme} />
    </div>
  );
}
