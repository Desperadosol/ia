import { getEvent } from "@/lib/firestore_interface";
import { getUser } from "@/lib/firestore_interface";
import { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "@/lib/context";
import { updateEvent } from "@/lib/firestore_interface";
import { uploadFile, deleteFile } from "@/lib/storage_interface"; // Import uploadFile function
import { arrayUnion, arrayRemove } from "firebase/firestore";
import Spinner from "@/components/Spinner";
import GoogleMeet from "@/components/GoogleMeet";
import { doc, onSnapshot } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import toast from "react-hot-toast";

export async function getServerSideProps({ query }) {
  const event = await getEvent(query.event);
  if (!event) {
    return {
      notFound: true,
    };
  }
  const teacherData = await getUser(event.teacherID);

  return {
    props: {
      initialEventData: event,
      initialTeacherData: teacherData,
    },
  };
}

export default function EventPage({ initialEventData, initialTeacherData }) {
  const { user, role } = useContext(UserContext);

  const [eventData, setEventData] = useState(initialEventData);
  const [teacherData, setTeacherData] = useState(initialTeacherData);

  useEffect(() => {
    const eventRef = doc(firestore, "events", eventData.id);
    const unsubscribeEvent = onSnapshot(eventRef, (doc) => {
      if (doc.exists()) {
        setEventData(doc.data());
        // Clean up teacher subscription on unmount or when event changes
        return () => unsubscribeTeacher();
      }
    });
    // Clean up event subscription on unmount
    return () => unsubscribeEvent();
  }, [eventData, teacherData]);

  async function handleJoin() {
    if (
      eventData.students &&
      eventData.students.length < eventData.maxStudents
    ) {
      await updateEvent(eventData.id, {
        students: [...(eventData.students || []), user.uid],
      });
      // Add the user to the list of students for this event
      toast.success("You have successfully joined for this event.");
    }
  }

  async function handleLeave() {
    if (eventData.students && eventData.students.includes(user.uid)) {
      await updateEvent(eventData.id, {
        students: eventData.students.filter(
          (studentId) => studentId !== user.uid
        ),
      });
      toast.success("You have successfully left the event.");
    }
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h5>{eventData.title}</h5>
        </div>
        <div className="card-body">
          <h5 className="card-title">Subject: {eventData.subject}</h5>
          <strong>Event Details:</strong>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Day: {new Date(eventData.start).toLocaleString().split(", ")[0]}
            </li>
            <li className="list-group-item">
              Start Time:{" "}
              {new Date(eventData.start).toLocaleString().split(", ")[1]}
            </li>
            <li className="list-group-item">
              End Time:{" "}
              {new Date(eventData.end).toLocaleString().split(", ")[1]}
            </li>
            <li className="list-group-item">
              Students Joined:{" "}
              {eventData.students == null ? 0 : eventData.students.length}
            </li>
            <li className="list-group-item">
              Minimum: {eventData.minStudents}
            </li>
            <li className="list-group-item">
              Maximum: {eventData.maxStudents}
            </li>
          </ul>
        </div>
      </div>
      <div className="card mt-5">
        <div className="card-header">
          <h5>Teacher Details</h5>
        </div>
        <div className="card-body">
          <h5 className="card-title">{teacherData.displayName}</h5>
          <p className="card-text">E-mail: {teacherData.email}</p>
        </div>
      </div>

      <div className="text-center mt-5">
        {user && eventData.students && eventData.students.includes(user.uid) ? (
          <button className="btn btn-danger btn-lg" onClick={handleLeave}>
            Leave the event
          </button>
        ) : eventData.students &&
          eventData.students.length >= eventData.maxStudents ? (
          <p>This event is already full.</p>
        ) : (
          <button className="btn btn-success btn-lg" onClick={handleJoin}>
            Join the event
          </button>
        )}
      </div>

      {user &&
      eventData.students &&
      eventData.students.includes(user.uid) &&
      eventData.googleMeetLink ? (
        <div className="text-center mt-5">
          <button
            className="btn btn-light btn-lg d-flex align-items-center"
            onClick={() => window.open(eventData.googleMeetLink, "_blank")}
          >
            Join the meeting
            <img
              src="/googlemeet.png"
              style={{ maxWidth: "32px", maxHeight: "32px", marginLeft: "4px" }}
            />
          </button>
        </div>
      ) : null}

      {role != "student" && user && user.uid == eventData.teacherID && (
        <GoogleMeet user={user} eventData={eventData} />
      )}

      <FilesSection user={user} role={role} eventData={eventData} />
    </div>
  );
}

function FilesSection({ user, role, eventData }) {
  const [file, setFile] = useState(null); // State to hold the selected file
  const [eventFiles, setEventFiles] = useState(eventData.files || []); // State to hold the event files
  const [loading, setLoading] = useState(false); // State to hold the loading status
  const fileInputRef = useRef(); // Ref to hold the file input element

  useEffect(() => {
    setEventFiles(eventData.files);
  }, [eventData.files]);

  async function handleFileUpload(event) {
    const file = event.target.files[0];
    setFile(file);
  }

  async function handleFileDelete(file) {
    const path = `events/${eventData.id}/${file.name}`;

    // Delete the file from Firebase Storage
    await deleteFile(path).catch((error) => {
      console.error("Error deleting file from Firebase Storage:", error);
    });

    // Delete the file from Firestore
    await updateEvent(eventData.id, { files: arrayRemove(file) });
    setEventFiles((prevFiles) => prevFiles.filter((f) => f.name !== file.name));
  }

  async function handleFileSubmit() {
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    setLoading(true); // Start loading

    const path = `events/${eventData.id}/${file.name}`;
    const downloadURL = await uploadFile(path, file);
    const newFile = { name: file.name, url: downloadURL };
    await updateEvent(eventData.id, {
      files: arrayUnion({ name: file.name, url: downloadURL }),
    });

    // Clear the file input and the file state
    fileInputRef.current.value = "";
    setFile(null);

    setEventFiles((prevFiles) => [...(prevFiles || []), newFile]);

    setLoading(false); // End loading
    toast.success("File uploaded successfully");
  }

  return (
    <section>
      <div className="container my-5 p-0">
        {user && user.uid == eventData.teacherID && (
          <div className="row">
            <div className="col-md-6 my-2">
              <input
                className="form-control"
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
              />
            </div>
            <div className="col-md-6 my-2">
              <button
                className="btn btn-light position-relative"
                onClick={handleFileSubmit}
                disabled={loading}
                style={{ minWidth: "100px" }}
              >
                {loading ? <Spinner /> : "Upload File"}
              </button>
            </div>
          </div>
        )}
        {user &&
          (user.uid == eventData.teacherID ||
            eventData.students.includes(user.uid)) &&
          eventFiles &&
          eventFiles.map((file) => (
            <div key={file.name} className="card mt-3">
              <div className="card-body">
                <a href={file.url} download={file.name} target="_blank">
                  {file.name}
                </a>
                {user && user.uid == eventData.teacherID && (
                  <button
                    className="btn btn-danger btn-sm float-end"
                    onClick={() => handleFileDelete(file)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
