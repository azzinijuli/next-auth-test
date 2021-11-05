import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (session) {
    // Signed in
    const baseUrlStore = "https://backoffice-staging.personal-svcs.com"; //UAT
    const externalId = session.user?.name;
    const response = await fetch(
      `${baseUrlStore}/v1/customers/${externalId}}/products?status=PURCHASED,CANCELLED,EXPIRED`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    res.status(200).json(data);
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
}

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
