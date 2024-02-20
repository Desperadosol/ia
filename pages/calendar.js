import React, { useState, useContext } from "react";
import Calendar from "@/components/Calendar";
import { Modal, Button } from "react-bootstrap";


import { getEvents, getTeachers } from "@/lib/firestore_interface";
import EventForm from "@/components/EventForm";
import { UserContext } from "@/lib/context";
import Loader from "@/components/Loader";

export async function getServerSideProps() {
  const events = await getEvents();
  const teachers = await getTeachers();
  return {
    props: {
      events,
      teachers,
    },
  };
}

export default function CalendarPage({ events, teachers, theme }) {
  const { user, username, role } = useContext(UserContext);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {username ? (
        <div>
          <div className="text-center mt-5">
            {role == "teacher" && (
              <div>
                <Button variant="primary" className="btn-lg" onClick={handleShow}>
                  Add Event
                </Button>
                <Modal show={show} onHide={handleClose} style={{ padding: 0 }}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add Lesson</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <EventForm handleClose={handleClose} />
                  </Modal.Body>
                </Modal>
              </div>
            )}
          </div>
          <Calendar events={events} teachers={teachers} theme={theme} />
        </div>
      ) : (
        <Loader show={true}/>
      )}
    </>
  );
}
