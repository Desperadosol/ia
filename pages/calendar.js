import React from 'react';
import Calendar from '@/components/Calendar';

const CalendarPage = ({ theme }) => {
  // Fetch or provide events data as needed
  const events = [
    {
      title: 'Business and Management',
      start: '2024-01-15T10:00:00',
      end: '2024-01-15T13:00:00',
    },
    {
      title: 'Mathematics',
      start: '2024-01-15T09:00:00',
      end: '2024-01-15T13:00:00',
    },
    // Add more events as needed
  ];

  return (
    <div>
      <h1>Class Calendar</h1>
      <Calendar events={events} theme={theme}/>
    </div>
  );
};

export default CalendarPage;
