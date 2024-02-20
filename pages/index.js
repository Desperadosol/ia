import { UserContext } from "@/lib/context";
import { useContext } from "react";
import Link from "next/link";

export default function Home() {
  const { user, username, role } = useContext(UserContext);
  return (
    <div
      className="vh-100 d-flex pt-5 justify-content-center text-white"
      style={{ backgroundImage: "url('/back2.jpeg')", backgroundSize: "cover" }}
    >
      <div className="text-center p-5 my-5">
        {username && (
          <h1 className="display-1 my-3">
            Welcome to Our Site,
            <span style={{ color: "var(--primary)" }}> {username}</span>
          </h1>
        )}
        {!username && (
          <h1 className="display-1 my-3">
            Welcome to <span style={{ color: "var(--primary)" }}>Our Site</span>
          </h1>
        )}
        {user && role === "student" && (
          <Link
            href={`/student/${user.uid}`}
            className="btn btn-light btn-lg my-4"
          >
            Student Panel
          </Link>
        )}
        {user && role === "teacher" && (
          <Link
            href={`/teacher/${user.uid}`}
            className="btn btn-light btn-lg my-4"
          >
            Teacher Panel
          </Link>
        )}
        {!user && (
          <Link href="/enter">
            <button className="btn btn-light btn-lg">Log in</button>
          </Link>
        )}
      </div>
    </div>
  );
}
