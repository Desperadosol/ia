import React, { useState, useContext } from "react";
import Calendar from "@/components/Calendar";
import { Modal, Button } from "react-bootstrap";


import { getEvents, getTeachers } from "@/lib/firestore_interface";
import EventForm from "@/components/EventForm";
import { UserContext } from "@/lib/context";
import Loader from "@/components/Loader";
import AddEventButton from "@/components/AddEventButton";

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

  return (
    <>
      {username ? (
        <div>
          <div className="text-center mt-5">
            {role == "teacher" && <AddEventButton />}
          </div>
          <Calendar events={events} teachers={teachers} theme={theme} />
        </div>
      ) : (
        <Loader show={true}/>
      )}
    </>
  );
}
