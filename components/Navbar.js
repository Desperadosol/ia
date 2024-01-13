import { UserContext } from "@/lib/context";
import { useContext, useState } from 'react';
import Link from 'next/link';
import  { auth } from '@/lib/firebase';

export default function Navbar() {
  const { user } = useContext(UserContext);
  const [theme, setTheme] = useState("dark");

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
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" aria-disabled="true">
                Disabled
              </a>
            </li>
          </ul>
          <div className="me-4">
            <button class={`btn btn-${theme == 'dark' ? 'light' : 'dark'}`} onClick={toggleTheme} style={{paddingTop: "3.6px"}}>
              {theme == 'dark' ? 
              <img src="moon.png" alt="" width="24" height="24"/> :
              <img src="sun-512.png" alt="" width="24" height="24"/>
              }
            </button>
          </div>
          <div className="u-flex">
            {user? 
            <SignOutButton /> :
            <Link href="/enter">
              <button className="btn btn-outline-success">Log in</button>
            </Link>
            }
          </div>
        </div>
      </div>
    </nav>
  );
};

function SignOutButton() {
  return <button className="btn btn-outline-danger" onClick={() => auth.signOut()}>Sign Out</button>
}