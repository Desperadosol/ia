import { getEvent } from "@/lib/firestore_interface";
import { getUser } from "@/lib/firestore_interface";
import { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "@/lib/context";
import { updateEvent } from "@/lib/firestore_interface";
import { uploadFile, deleteFile } from "@/lib/storage_interface"; // Import uploadFile function
import { arrayUnion, arrayRemove } from "firebase/firestore";
import Spinner from "@/components/Spinner";

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
      eventData: event,
      teacherData: teacherData,
    },
  };
}

export default function EventPage({ eventData, teacherData }) {
  const { user, role } = useContext(UserContext);
  
  async function handleJoin() {
    if (eventData.students && eventData.students.includes(user.uid)) {
      // Check if the user has already joined for this event
      alert("You have already joined for this event.");
      return;
    }

    if (
      eventData.students &&
      eventData.students.length >= eventData.maxStudents
    ) {
      // Check if the event is already full (reached maximum number of students)
      alert("This event is already full.");
      return;
    }

    await updateEvent(eventData.id, {
      students: [...(eventData.students || []), user.uid],
    });
    // Add the user to the list of students for this event
    alert("You have successfully joined for this event.");
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
            <li className="list-group-item">Price: ${eventData.price}</li>
            <li className="list-group-item">
              Minimum Students: {eventData.minStudents}
            </li>
            <li className="list-group-item">
              Maximum Students: {eventData.maxStudents}
            </li>
            <li className="list-group-item">
              Students Applied:{" "}
              {eventData.students == null ? 0 : eventData.students.length}
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
      {role == "student" ? (
        <div className="text-center mt-5">
          <button className="btn btn-success btn-lg" onClick={handleJoin}>
            Join the event
          </button>
        </div>
      ) : null}

      {user && eventData.students && eventData.students.includes(user.uid) && eventData.googleMeetLink ? (
        <div className="text-center mt-5">
          <button className="btn btn-light btn-lg d-flex align-items-center" onClick={() => window.open(eventData.googleMeetLink, "_blank")}>
            Join the meeting
            <img src="/googlemeet.png" style={{ maxWidth: "32px", maxHeight: "32px", marginLeft: "4px" }}/>
          </button>
        </div>
      ) : null}

      {role != "student" && user && user.uid == eventData.teacherID &&(
        <GoogleMeet user={user} eventData={eventData}/>
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
    await deleteFile(path)
    .catch((error) => {
      console.error('Error deleting file from Firebase Storage:', error);
    });

    // Delete the file from Firestore
    await updateEvent(eventData.id, { files: arrayRemove(file) });
    setEventFiles((prevFiles) => prevFiles.filter((f) => f.name !== file.name));
  }

  async function handleFileSubmit() {
    if (!file) {
      alert("Please select a file to upload.");
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

    setEventFiles((prevFiles) => [...prevFiles, newFile]);

    setLoading(false); // End loading
  }

  return (
    <section>
      <div className="container mt-5">
        {user && user.uid == eventData.teacherID && (
          <div className="row">
            <div className="col-md-6 my-2">
              <input className="form-control" type="file" ref={fileInputRef} onChange={handleFileUpload} />
            </div>
            <div className="col-md-6 my-2">
              <button
                className="btn btn-light position-relative"
                onClick={handleFileSubmit}
                disabled={loading}
                style={{minWidth: "100px"}}
              >
                {loading ? <Spinner /> : 'Upload File'}
              </button>
            </div>
          </div>
        )}
        {(user && ((user.uid == eventData.teacherID) || (eventData.students.includes(user.uid)))) && eventFiles &&
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

function GoogleMeet({ user, eventData }) {
  const [googleMeetLink, setGoogleMeetLink] = useState(eventData.googleMeetLink || ""); // State to hold the Google Meet link
  
  async function handleGoogleMeetLinkSave() {
    if (!googleMeetLink) {
      alert("Please enter a Google Meet link.");
      return;
    }

    await updateEvent(eventData.id, { googleMeetLink });
    alert("Google Meet link saved successfully.");
  }

  return (
    <div className="input-group mt-5 ">
      <input type="text" className="form-control" style={{ maxWidth: "300px" }} value={googleMeetLink} onChange={(e) => setGoogleMeetLink(e.target.value)} placeholder="Enter Google Meet link" />
      <button className="btn btn-outline-primary position-relative" onClick={handleGoogleMeetLinkSave}>
        Save Google Meet link
      </button>
    </div>
  );
}