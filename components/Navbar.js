import { UserContext } from "@/lib/context";
import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/router";

export default function Navbar({ theme, setTheme }) {
  const { user, username, role } = useContext(UserContext);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.setAttribute("data-bs-theme", "dark");
    } else {
      setTheme("light");
      document.documentElement.setAttribute("data-bs-theme", "light");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link active hover-undrln"
                aria-current="page"
                href="/"
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active hover-undrln" href="/contact">
                Contact
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active hover-undrln" href="/about">
                About
              </a>
            </li>
            {user && username && (
              <li className="nav-item">
                <a className="nav-link active hover-undrln" href="/calendar">
                  Calendar
                </a>
              </li>
            )}
            {user && username && role === "admin" && (
              <li className="nav-item">
                <a className="nav-link active hover-undrln" href="/admin">
                  Admin
                </a>
              </li>
            )}
            {user && username && (role == "student" || role == "teacher") && (
              <li className="nav-item">
                <a
                  className="nav-link active hover-undrln"
                  href={`/student/${user.uid}`}
                >
                  My Events
                </a>
              </li>
            )}
            {user && username && role === "teacher" && (
              <li className="nav-item">
                <a
                  className="nav-link active hover-undrln"
                  href={`/teacher/${user.uid}`}
                >
                  Teacher
                </a>
              </li>
            )}
          </ul>
          <div className="me-4">
            <button
              className={`btn me-3 btn-${theme == "dark" ? "light" : "dark"}`}
              onClick={toggleTheme}
              style={{ paddingTop: "3.6px" }}
            >
              {theme == "dark" ? (
                <Image src="/moon.png" alt="" width="24" height="24" />
              ) : (
                <Image src="/sun-512.png" alt="" width="24" height="24" />
              )}
            </button>
            {user ? (
              <SignOutButton theme={theme} />
            ) : (
              <Link href="/enter">
                <button className="btn fw-semibold log-in-btn">Log in</button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .log-in-btn {
          color: var(--primary);
          border: 2px solid var(--primary);
        }

        .log-in-btn:hover {
          color: white;
          background-color: var(--primary);
        }

        .hover-undrln:hover {
          text-decoration: underline;
          text-decoration-thickness: 2px;
          text-underline-offset: 3px;
        }
      `}</style>
    </nav>
  );
}

function SignOutButton({ theme }) {
  const router = useRouter();
  const logout = () => {
    auth.signOut();
    router.push("/");
  };

  return (
    <button
      className={`btn btn-outline-${theme == "dark" ? "light" : "dark"}`}
      onClick={logout}
    >
      Sign Out
    </button>
  );
}
