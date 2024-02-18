import { useContext } from 'react';

import { UserContext } from "@/lib/context";
import { getEvents } from '@/lib/firestore_interface';
import TeacherEvents  from '@/components/TeacherEvents';

export async function getServerSideProps({ query }) {
  const { teacherID } = query;
  const events = await getEvents();
  const teacherEvents = events.filter(event => event.teacherID == teacherID);
  return {
    props: {
      data: teacherEvents
    }
  }
}


export default function Teacher(props) {
  const { user, role } = useContext(UserContext);

  if (!user) {
    return <p>Please log in to view this page.</p>;
  }

  if (role !== 'teacher') {
    return <p>You do not have permission to view this page.</p>;
  }

  return (
    <div className='w-100 vh-100 py-5' style={{backgroundColor: "var(--primary)"}}>
      <TeacherEvents events={props.data} />
    </div>
  );
}
