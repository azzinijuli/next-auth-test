import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";

export default function Component() {
  const { data: session } = useSession();
  const baseUrlStore = "https://backoffice-staging.personal-svcs.com"; //UAT
  const externalId = session.user.name;

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const res = await fetch(
      `${baseUrlStore}}/v1/customers/${externalId}/products?status=PURCHASED,CANCELLED,EXPIRED`
    );
    const data = await res.json();
    console.log(data);
  }

  if (session) {
    return (
      <>
        Signed in as {session.user.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn("idp")}>Sign in</button>
    </>
  );
}
