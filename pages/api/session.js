import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const secret = process.env.NEXT_PUBLIC_IDP_SECRET;
  const token = await getToken({ req, secret });
  console.log("JSON Web Token", JSON.stringify(token, null, 2));
  const stringifiedToken = JSON.stringify(token);
  console.log("sub", stringifiedToken.name);
  // const token =
  //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwZXJzb25hbCIsImluc3RhbmNlIjoiNjEifQ.Uq-dOKkLtkZQppeygKvRazDig2hcBnebOIYphdFH62M";
  // if (session) {
  //   // Signed in
  //   const baseUrlStore = "https://backoffice-staging.personal-svcs.com"; //UAT
  //   const externalId = session.user?.name;
  //   const response = await fetch(
  //     `${baseUrlStore}/v1/customers/${externalId}}/products?status=PURCHASED,CANCELLED,EXPIRED`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   );
  //   const data = await response.json();
  //   res.status(200).json(data);
  // } else {
  //   // Not Signed in
  //   res.status(401);
  // }
}
