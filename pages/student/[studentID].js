import { useContext } from 'react';

import { UserContext } from "@/lib/context";
import { getEvents } from '@/lib/firestore_interface';
import StudentEvents  from '@/components/StudentEvents';

export async function getServerSideProps({ query }) {
  const { studentID } = query;
  const events = await getEvents();
  const studentEvents = events.filter(event => event.students.includes(studentID));
  return {
    props: {
      data: studentEvents
    }
  }
}


export default function Student(props) {
  const { user, role } = useContext(UserContext);

  if (!user) {
    return <p>Please log in to view this page.</p>;
  }

  if (role !== 'student') {
    return <p>You do not have permission to view this page.</p>;
  }

  return (
    <div>
        <h1>Student Panel</h1>
        <StudentEvents events={props.data} />
    </div>
  );
}