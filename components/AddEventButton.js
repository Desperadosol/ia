import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import EventForm from "@/components/EventForm";

export default function AddEventButton() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Button variant="light" className="btn-lg" onClick={handleShow}>
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
    );
}