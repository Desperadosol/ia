import { getEvent } from "@/lib/firestore_interface";

export async function getServerSideProps({ query }) {
  const event = await getEvent(query.event);

  return {
    props: {
      eventData: event,
    },
  };
}
export default function EventPage({ eventData }) {
  return (
    <div>
      <h1>{eventData.title}</h1>

      {/* Display other event data here */}
    </div>
  );
}
