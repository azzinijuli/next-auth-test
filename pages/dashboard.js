import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();
  console.log("acá", session);
  return (
    <>
      <span>Redirection success</span>;
      {session ?? <p>Signed in as {session}</p>}
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
}
