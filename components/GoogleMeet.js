import { useState } from 'react'
import { updateEvent } from "@/lib/firestore_interface";

export default function GoogleMeet({ user, eventData }) {
  const [googleMeetLink, setGoogleMeetLink] = useState(
    eventData.googleMeetLink || ""
  ); // State to hold the Google Meet link
  const [loading, setLoading] = useState(null);
  async function handleGoogleMeetLinkSave() {
    if (!googleMeetLink) {
      alert("Please enter a Google Meet link.");
      return;
    }
    setLoading(true);
    await updateEvent(eventData.id, { googleMeetLink });
    setLoading(null);
  }

  return (
    <div className="input-group mt-5 ">
      <input
        type="text"
        className="form-control"
        style={{ maxWidth: "300px" }}
        value={googleMeetLink}
        onChange={(e) => setGoogleMeetLink(e.target.value)}
        placeholder="Enter Google Meet link"
      />
      <button
        className="btn btn-outline-primary position-relative"
        onClick={handleGoogleMeetLinkSave}
      >
        {!loading ? "Save Google Meet link" : "Uploading..."}
      </button>
    </div>
  );
}
