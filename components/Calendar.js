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

  const handleEventClick = (eventInfo) => {
    // Access the event information here
    const eventId = eventInfo.event.id;

   router.push(`/${eventId}`);
  };

  return (
    <div className={styles.calendarContainer}>
      <FullCalendar
        navLinks={true}
        fixedWeekCount={false}
        aspectRatio={1}
        themeSystem="bootstrap5"
        headerToolbar={{
          left: "title",
          center: "",
          right: "today,dayGridMonth,prev,next",
        }}
        plugins={[dayGridPlugin, bootstrap5Plugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
        eventContent={(eventInfo) => (
          <>
          {console.log(eventInfo.event.end)}
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
              {eventInfo.event.title}
            </div>
          </>
        )}
      />
    </div>
  );
};

export default Calendar;
