import React from 'react';
import Calendar from '@/components/Calendar';
import { getEvents } from '@/lib/firestore_interface';
import EventForm from '@/components/EventForm';

export async function getServerSideProps() {
  const events = await getEvents();
  return {
    props: {
      events,
    },
  };
}

export default function CalendarPage({ events, theme }) {
  return (
    <div>
      <h1>Calendar</h1>
      <EventForm />
      <Calendar events={events} theme={theme}/>
    </div>
  );
};


