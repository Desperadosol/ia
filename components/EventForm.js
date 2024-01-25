import React, { useContext, useState } from 'react';
import { addEvent } from '@/lib/firestore_interface';
import { UserContext } from "@/lib/context";
import { addMinutes } from '@/lib/utils';

function EventForm({ handleClose }) {
  const { user, role } = useContext(UserContext);

  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [price, setPrice] = useState('');
  const [minStudents, setMinStudents] = useState(1);
  const [maxStudents, setMaxStudents] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const event = { 
      title,
      subject,
      start: `${date}T${startTime}:00`, 
      end: `${date}T${endTime}:00` ,
      price,
      minStudents,
      maxStudents,
      teacherId: user.uid,
      students: [],
    };
    await addEvent(event);
    setTitle('');
    setSubject('');
    setDate('');
    setStartTime('');
    setEndTime('');
    setPrice('');
    handleClose();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="mb-3 mx-3">
        <label htmlFor="title" className="form-label">Title of the Lesson:</label>
        <input type="text" id="title" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className="mb-3 mx-3">
        <label htmlFor="subject" className="form-label">Subject:</label>
        <select id="subject" className="form-control" value={subject} onChange={(e) => setSubject(e.target.value)} required>
          <option value="">Select a subject</option>
          <option value="Math">Math</option>
          <option value="English">English</option>
          <option value="Science">Science</option>
          // Add more options as needed
        </select>
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
        <input type="time" id="endTime" className="form-control" value={endTime} min={addMinutes(startTime, 5)} onChange={(e) => setEndTime(e.target.value)} required />
      </div>
      <div className="mb-3 mx-3">
        <label htmlFor="minStudents" className="form-label">Min Students:</label>
        <input type="number" id="minStudents" className="form-control" min="1" value={minStudents} onChange={(e) => setMinStudents(e.target.value)} required />
      </div>
      <div className="mb-3 mx-3">
        <label htmlFor="maxStudents" className="form-label">Max Students:</label>
        <input type="number" id="maxStudents" className="form-control" min="1" value={maxStudents} onChange={(e) => setMaxStudents(e.target.value)} required />
      </div>
      <div className="mb-3 mx-3">
        <label htmlFor="price" className="form-label">Price (USD):</label>
        <input type="number" id="price" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </div>
      <div className='w-100 text-center'>
        <button type="submit" className="btn btn-primary mt-2">Add Event</button>
      </div>
    </form>
  );
}

export default EventForm;