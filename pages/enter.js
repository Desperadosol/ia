import { useEffect, useState, useCallback, useContext } from "react";
import debounce from "lodash.debounce";

import { auth, firestore, googleAuthProvider } from "@/lib/firebase";
import {
  saveTeacherPassword,
  getTeacherPassword,
} from "@/lib/firestore_interface";
import { UserContext } from "@/lib/context";
import { generatePassword } from "@/lib/utils";
import GradBack from "@/components/GradBack";
import { useRouter } from "next/router";

export default function Enter({ theme }) {
  const { user, username } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (user && username) {
      router.push("/");
    }
  }, [user, username]);

  return (
    <main>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : null
      ) : (
        <GradBack theme={theme}>
          <div className="text-center mb-2">
            <h5 className="display-2 fw-semibold text-black">
              Log in to our website
            </h5>
          </div>
          <div className="w-100">
            <SignInButton theme={theme} user={user} username={username} />
          </div>
        </GradBack>
      )}
    </main>
  );
}

//sign in with google button
function SignInButton({ user, username }) {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  return (
    <div className="mt-3 d-flex align-items-center justify-content-center">
      <button
        className="btn btn-dark btn-lg d-flex align-items-center fs-3 justify-content-center"
        onClick={signInWithGoogle}
        style={{ minWidth: "min(500px,100%)" }}
      >
        <img
          src="/google.png"
          alt="Google"
          style={{ maxWidth: "50px", maxHeight: "50px", marginRight: "8px" }}
        />
        Continue with Google
      </button>
    </div>
  );
}

// Username form
function UsernameForm() {
  const [formValue, setFormValue] = useState("");
  const [roleValue, setRoleValue] = useState("student");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [teacherPassword, setTeacherPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isTeacherPasswordCorrect, setIsTeacherPasswordCorrect] = useState(false);

  const { user, username, role } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (roleValue === "teacher") {
      const newTeacherPassword = generatePassword();
      await saveTeacherPassword(newTeacherPassword);
    }
    //create refs for both documents
    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${formValue}`);

    // Commit both docs together as a batch write.
    const batch = firestore.batch();
    batch.set(userDoc, {
      username: formValue,
      role: roleValue,
      photoURL: user.photoURL,
      displayName: user.displayName,
      email: user.email,
    });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
    router.push("/");
  };

  const onChange = (e) => {
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };
  //The function checks whether the username is longer than 3 characters and if the username already exists in the collection “usernames”. 
  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = firestore.doc(`usernames/${username}`);
        const { exists } = await ref.get();
        console.log("Firestore read executed!");
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );

  const onRoleChange = (e) => {
    setRoleValue(e.target.value);
  };

  const handleTeacherPasswordChange = async (event) => {
    setTeacherPassword(event.target.value);
    setIsTeacherPasswordCorrect(event.target.value === (await getTeacherPassword()));
  };


  return (
    !username && (
      <section
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ background: "var(--grad)" }}
      >
        <div className="card" style={{ width: "24rem" }}>
          <div className="card-body">
            <h3 className="card-title mb-3">Choose a username</h3>
            <form onSubmit={onSubmit} className="d-flex flex-column">
              <div className="form-group">
                <label className="mb-3 h5" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="username"
                  value={formValue}
                  onChange={onChange}
                />
              </div>
              <UsernameMessage
                username={formValue}
                isValid={isValid}
                loading={loading}
              />
              <div className="form-group">
                <div
                  className="btn-group btn-group-toggle"
                  data-bs-toggle="buttons"
                >
                  <label
                    className={`btn btn-light ${
                      roleValue === "student" ? "active" : ""
                    }`}
                    htmlFor="student"
                  >
                    <input
                      type="radio"
                      name="role"
                      id="student"
                      value="student"
                      className="btn-check"
                      autoComplete="off"
                      checked={role === "student"}
                      onChange={onRoleChange}
                    />
                    Student
                  </label>
                  <label
                    className={`btn btn-light ${
                      roleValue === "teacher" ? "active" : ""
                    }`}
                    htmlFor="teacher"
                  >
                    <input
                      type="radio"
                      name="role"
                      id="teacher"
                      value="teacher"
                      className="btn-check"
                      autoComplete="off"
                      checked={role === "teacher"}
                      onChange={onRoleChange}
                    />
                    Teacher
                  </label>
                </div>
              </div>
              {roleValue === "teacher" && (
                <div className="form-group mt-3">
                  <label className="mb-3 h5" htmlFor="teacherPassword">
                    Teacher Password
                  </label>
                  <div className="input-group">
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      className="form-control"
                      id="teacherPassword"
                      placeholder="Password"
                      value={teacherPassword}
                      onChange={handleTeacherPasswordChange}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      style={{ width: "4.5rem" }}
                    >
                      {isPasswordVisible ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-light mt-3"
                disabled={
                  !isValid || (roleValue === "teacher" && !isTeacherPasswordCorrect)
                }
              >
                Choose
              </button>
            </form>
          </div>
        </div>
      </section>
    )
  );
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-success">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className="text-danger">{username} is already taken!</p>;
  } else {
    return <p></p>;
  }
}
