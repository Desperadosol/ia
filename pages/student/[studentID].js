import { useContext } from 'react';

import { UserContext } from "@/lib/context";
import { getEvents } from '@/lib/firestore_interface';
import StudentEvents  from '@/components/StudentEvents';
import Loader from '@/components/Loader';

export async function getServerSideProps({ query }) {
  const { studentID } = query;
  const events = await getEvents();
  const studentEvents = events.filter(event => event.students.includes(studentID));
  return {
    props: {
      studentEvents
    }
  }
}


export default function Student(props) {
  const { user, username, role } = useContext(UserContext);

  return (
    <section>
    {user && username ? (
    <div
      className="w-100 py-5"
      style={{ background: "var(--grad2)", minHeight: "100vh" }}
    >
      <StudentEvents events={props.studentEvents} />
    </div>) : (
      <Loader show/>
    )}
  </section>
  );
}