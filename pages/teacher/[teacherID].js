import { useContext } from "react";

import { UserContext } from "@/lib/context";
import { getEvents } from "@/lib/firestore_interface";
import TeacherEvents from "@/components/TeacherEvents";
import StudentEvents from "@/components/StudentEvents";
import Loader from "@/components/Loader";

export async function getServerSideProps({ query }) {
  const { teacherID } = query;

  const events = await getEvents();
  const teacherEvents = events.filter((event) => event.teacherID == teacherID);
  return {
    props: {
      teacherEvents,
    },
  };
}

export default function Teacher(props) {
  const { user, role } = useContext(UserContext);

  return (
    <section>
      {user && role=="teacher" ? (
      <div
        className="w-100 py-5"
        style={{ background: "var(--grad)", minHeight: "100vh" }}
      >
        <TeacherEvents events={props.teacherEvents} />
      </div>) : (
        <Loader show/>
      )}
    </section>
  );
}
