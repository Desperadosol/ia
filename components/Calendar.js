import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import styles from "@/styles/Calendar.module.css"; // Import your CSS module

const Calendar = ({ events, theme }) => {
  const [hoveredEvent, setHoveredEvent] = useState(null);

  const handleEventClick = (eventInfo) => {
    // Access the event information here
    const eventId = eventInfo.event.id;

    // Define the behavior (e.g., redirect to event details page)
    window.location.href = `/event/${eventId}`;
  };

  const handleEventMouseEnter = (eventInfo) => {
    // Set the hovered event when the mouse enters an event
    setHoveredEvent(eventInfo.event);
    console.log(eventInfo.event);
  };

  const handleEventMouseLeave = () => {
    // Clear the hovered event when the mouse leaves an event
    setHoveredEvent(null);
  };

  return (
    <div className={styles.calendarContainer}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
        eventMouseEnter={handleEventMouseEnter}
        eventMouseLeave={handleEventMouseLeave}
        eventContent={(eventInfo) => (
          <>
            <div
              className={`${styles.customEvent} ${
                eventInfo.event === hoveredEvent ? styles.hoveredEvent : ""
              }`}
            >
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
            {hoveredEvent && hoveredEvent.title == eventInfo.event.title && (
              <div
                className={`${styles.hoveredEventInfo} bg-${theme} text-${
                  theme == "dark" ? "white" : "black"
                }`}
                style={{ border: "1px solid var(--primary)" }}
              >
                <strong>{hoveredEvent.title}</strong>
                <br />
                Something else here
              </div>
            )}
          </>
        )}
      />
    </div>
  );
};

export default Calendar;
