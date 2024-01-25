export default function TeacherEvents({ events }) {
    return (
        <div>
            <h1>Teacher Events</h1>
            <ul>
                {events.map((event) => (
                    <li key={event.id}>
                        <h2>{event.title}</h2>
                        <p>{event.subject}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}