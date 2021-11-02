import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log("acá", session);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {session ? (
        <>
          Signed in as {session}
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          Not signed in
          <button
            onClick={() =>
              signIn("idp", {
                callbackUrl: "https://idp-nextjs-test.netlify.app",
              })
            }
          >
            Login auth
          </button>
        </>
      )}
    </div>
  );
}
