import { useContext } from 'react';
import { UserContext } from "@/lib/context";

export default function Teacher() {
  const { user, role } = useContext(UserContext);

  if (!user) {
    return <p>Please log in to view this page.</p>;
  }

  if (role !== 'teacher') {
    return <p>You do not have permission to view this page.</p>;
  }

  return (
    <div>
      <h1>Teacher Panel</h1>
      {/* Admin panel content goes here */}
    </div>
  );
}