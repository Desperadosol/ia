import { useContext, useState } from "react";
import { UserContext } from "@/lib/context";
import { getTeacherPassword } from "@/lib/firestore_interface";

export async function getServerSideProps() {
  const password = await getTeacherPassword();
  return {
    props: { password },
  };
}
export default function Admin({ password }) {
  const { user, role } = useContext(UserContext);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(password);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
  };
  
  if (!user) {
    return <p>Please log in to view this page.</p>;
  }

  if (role !== "admin") {
    return <p>You do not have permission to view this page.</p>;
  }


  return (
    <div>
      <h1>Admin Panel</h1>
      <h2>Teacher's Password</h2>
      <div className="input-group mb-3">
        <input
          type="password"
          className="form-control"
          value={password}
          readOnly
          style={{ maxWidth: "300px" }}
        />
        <button
          className="btn btn-outline-primary"
          type="button"
          onClick={handleCopyClick}
        >
          {isCopied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}
