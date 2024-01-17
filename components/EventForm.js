import React, { useState } from 'react';
import { addEvent } from '@/lib/firestore_interface';
import { Modal } from 'react-bootstrap';

function EventForm({ handleClose }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const event = { 
      title, 
      start: `${date}T${startTime}:00`, 
      end: `${date}T${endTime}:00` 
    };
    await addEvent(event);
    setTitle('');
    setDate('');
    setStartTime('');
    setEndTime('');
    handleClose();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="mb-3 mx-3">
        <label htmlFor="title" className="form-label">Title of the Lesson:</label>
        <input type="text" id="title" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className="mb-3 mx-3">
        <label htmlFor="date" className="form-label">Date:</label>
        <input type="date" id="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>
      <div className="mb-3 mx-3">
        <label htmlFor="startTime" className="form-label">Start Time:</label>
        <input type="time" id="startTime" className="form-control" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
      </div>
      <div className="mb-3 mx-3">
        <label htmlFor="endTime" className="form-label">End Time:</label>
        <input type="time" id="endTime" className="form-control" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
      </div>
      <div className='w-100 text-center'>
        <button type="submit" className="btn btn-primary mt-2">Add Event</button>
      </div>
    </form>
  );
}

export default EventForm;