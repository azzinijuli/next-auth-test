// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// export default async function handler(req, res) {
// const baseUrlStore = "https://backoffice-staging.personal-svcs.com"; //UAT
// const externalId = 543777220160;

// const data = await fetch(
//   `${baseUrlStore}}/v1/customers/${externalId}/products?status=PURCHASED,CANCELLED,EXPIRED`
// );
// const json = await data.json();
// console.log("json", json);
// res.status(200).json(json);
// }

// export default async function handler(req, res) {
//   const code = req.query.code;
//   const newUrl = `https://idpsesiont.telecom.com.ar/openam/oauth2/realms/convergente/access_token?code=${code}&grant_type=authorization_code&redirect_uri=https://idp-nextjs-test.netlify.app/api/auth/callback/idp`;
//   const encoded = Buffer.from(
//     `${process.env.NEXT_PUBLIC_IDP_CLIENT_ID}:${process.env.NEXT_PUBLIC_IDP_CLIENT_SECRET}`,
//     "binary"
//   ).toString("base64");

//   const response = await fetch(newUrl, {
//     method: "post",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//       Authorization: `Basic ${encoded}`,
//     },
//   });
//   const data = await response.json();
//   res.redirect(`/dashboard?token=${data.id_token}`);
// }

import { useSession, getSession } from "next-auth/react";

export default function Page() {
  console.log(session);
  const { data: session } = useSession();

  if (typeof window !== "undefined") return null;

  if (session) {
    return (
      <>
        <h1>Protected Page</h1>
        <p>You can view this page because you are signed in.</p>
      </>
    );
  }
  return <p>Access Denied</p>;
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}
