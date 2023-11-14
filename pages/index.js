import { UserContext } from "@/lib/context";
import { useContext } from 'react';

export default function Home() {
    const { user, username, role } = useContext(UserContext);
    return (
        <main>
            {user ? <h1>{user.displayName}</h1> : <h1>oops</h1>}
            {username ? <h1>{username}</h1> : <h1>oops</h1>}
            {role ? <h1>{role}</h1> : <h1>oops</h1>}
        </main>
    );
}