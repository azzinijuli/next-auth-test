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

import { getToken } from "next-auth/jwt";

const secret = process.env.NEXT_PUBLIC_IDP_SECRET;

export default async function handler(req, res) {
  const token = await getToken({ req, secret });
  if (token) {
    // Signed in
    console.log("JSON Web Token", JSON.stringify(token, null, 2));
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
}
