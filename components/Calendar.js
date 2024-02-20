import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";

import React, { useState } from "react";
import { useRouter } from "next/router";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import styles from "@/styles/Calendar.module.css"; // Import your CSS module

const Calendar = ({ events, teachers, theme }) => {
  const router = useRouter();
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedTeacher, setSelectedTeacher] = useState("All");

  const handleEventClick = (eventInfo) => {
    const eventId = eventInfo.event.id;
    router.push(`/events/${eventId}`);
  };

  const filteredEvents = events
    .filter(
      (event) => selectedSubject === "All" || event.subject === selectedSubject
    )
    .filter(
      (event) =>
        selectedTeacher === "All" || event.teacherUsername === selectedTeacher
    );

  return (
    <div className={styles.calendarContainer}>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group mb-5" style={{ maxWidth: "600px" }}>
            <label htmlFor="subjectSelect">Filter by subject:</label>
            <select
              className="form-control"
              id="subjectSelect"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Math">Math</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group mb-5" style={{ maxWidth: "600px" }}>
            <label htmlFor="teacherSelect">Filter by teacher:</label>
            <select
              className="form-control"
              id="teacherSelect"
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
            >
              <option value="All">All</option>
              {teachers.map((teacher) => (
                <option value={teacher.username}>{teacher.displayName}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <FullCalendar
        navLinks={true}
        fixedWeekCount={false}
        aspectRatio={1.2}
        themeSystem="bootstrap5"
        headerToolbar={{
          left: "title",
          center: "",
          right: "today,dayGridMonth,prev,next",
        }}
        plugins={[dayGridPlugin, bootstrap5Plugin]}
        initialView="dayGridMonth"
        events={filteredEvents}
        eventClick={handleEventClick}
        eventContent={(eventInfo) => (
          <>
            <div className={`${styles.customEvent} ${eventInfo.event.extendedProps.students.length == eventInfo.event.extendedProps.maxStudents ? styles.eventRed : eventInfo.event.extendedProps.students.length >= eventInfo.event.extendedProps.minStudents ? styles.eventGreen : styles.eventBlue}`}>
              {eventInfo.event.start.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              -{" "}
              {eventInfo.event.end.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              <br />
              {eventInfo.event.extendedProps.subject}
              <br />
              {`"${eventInfo.event.title}"`}
            </div>
          </>
        )}
      />
    </div>
  );
};

export default Calendar;
