import { auth, firestore, googleAuthProvider } from '../lib/firebase';
import { useEffect, useState, useCallback, useContext } from 'react';
import { UserContext } from "@/lib/context";
import debounce from 'lodash.debounce';
import SignUpCard from '@/components/SignUpCard';

export default function Enter(props) {
    const { user, username } = useContext(UserContext);

    return (
        <main>
            {user ? 
                !username ? <UsernameForm /> : <SignOutButton /> 
                : 
                <SignUpCard>
                    <SignInButton />
                </SignUpCard>
            }
        </main>
    );
}


//sign in with google button
function SignInButton() {
    const signInWithGoogle = async () => {
        await auth.signInWithPopup(googleAuthProvider);
    };

    return (
        <div className='mt-3 d-flex align-items-center'>
          <button className='btn btn-outline-primary d-flex align-items-center' onClick={signInWithGoogle}>
            Sign in with Google
          </button>
          <img src='/google.png' alt="Google" style={{ maxWidth: '32px', maxHeight: '32px' }} />
        </div>
    );
}

//sign-out button
function SignOutButton() {
    return <button className="btn btn-outline-danger" onClick={() => auth.signOut()}>Sign Out</button>
}

// Username form
function UsernameForm() {
    const [formValue, setFormValue] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);

    const { user, username } = useContext(UserContext);

    useEffect(() => {
        checkUsername(formValue);
    }, [formValue])
    
    const onSubmit = async (e) => {
        e.preventDefault();

        //create refs for both documents
        const userDoc = firestore.doc(`users/${user.uid}`)
        const usernameDoc = firestore.doc(`usernames/${formValue}`)

        // Commit both docs together as a batch write.
        const batch = firestore.batch();
        batch.set(userDoc, { username: formValue,
                             photoURL: user.photoURL,
                             displayName: user.displayName, 
                             email: user.email });
        batch.set(usernameDoc, { uid: user.uid });

        await batch.commit();   
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

    const checkUsername = useCallback(
        debounce( async (username) => {
            if (username.length >= 3) {
                const ref = firestore.doc(`usernames/${username}`);
                const { exists } = await ref.get();
                console.log('Firestore read executed!');
                setIsValid(!exists);
                setLoading(false);
            }
        }, 500),
        []
    );

    return (
        !username && (
            <section>
                <h3>Choose a username</h3>
                <form onSubmit={onSubmit}>
                    
                    <input name="username" placeholder="username" value={formValue} onChange={onChange} />
                    
                    <UsernameMessage username={formValue} isValid={isValid} loading={loading} />
                     
                    <button type="submit" className="btn btn-outline-success" disabled={!isValid}>
                        Choose
                    </button>

                    <h3>Debug State</h3>
                    <div>
                        Username: {formValue}
                        <br />
                        Loading: {loading.toString()}
                        <br />
                        Username Valid: {isValid.toString()}
                    </div>
                </form>
            </section>
        )
    );
}

function UsernameMessage({ username, isValid, loading }) {
    if (loading)  {
        return <p>Checking...</p>
    } else if (isValid) {
        return <p className='text-success'>{username} is available!</p>
    } else if (username && !isValid) {
        return <p className='text-danger'>{username} is already taken!</p>
    } else {
        return <p></p>
    }
}