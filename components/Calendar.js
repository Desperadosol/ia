import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import { addWeeks, startOfWeek, endOfWeek } from "date-fns";

import React, { useState } from "react";
import { useRouter } from "next/router";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import styles from "@/styles/Calendar.module.css"; // Import your CSS module

const Calendar = ({ events, theme }) => {
  const router = useRouter();
  const [selectedSubject, setSelectedSubject] = useState('All');

  const handleEventClick = (eventInfo) => {
    const eventId = eventInfo.event.id;
   router.push(`/events/${eventId}`);
  };

  const filteredEvents = selectedSubject === 'All'
    ? events
    : events.filter(event => event.subject === selectedSubject);
  
  return (
    <div className={styles.calendarContainer}>
      <div className="form-group mb-5" style={{maxWidth: "600px"}}>
        <label htmlFor="subjectSelect">Filter by subject:</label>
        <select className="form-control" id="subjectSelect" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
          <option value="All">All</option>
          <option value="Math">Math</option>
          {/* Add more options for other subjects here */}
        </select>
      </div> {/* Here I can add filter by Teacher just next to the filter by subject */}
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
          {console.log(eventInfo.event)}
            <div className={styles.customEvent}>
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
              <br/>
              {`"${eventInfo.event.title}"`}
            </div>
          </>
        )}
      />
    </div>
  );
};

export default Calendar;
