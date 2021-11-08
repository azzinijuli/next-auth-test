import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const secret = process.env.NEXT_PUBLIC_IDP_SECRET;
  const stringifiedToken = await getToken({ req, secret });
  const session = await getSession({ req });
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwZXJzb25hbCIsImluc3RhbmNlIjoiNjEifQ.Uq-dOKkLtkZQppeygKvRazDig2hcBnebOIYphdFH62M";
  if (session) {
    // Signed in
    const baseUrlStore = "https://backoffice-staging.personal-svcs.com/"; //UAT
    const externalId = stringifiedToken.sub;
    const newUrl = `${baseUrlStore}/v1/customers/54${externalId}}/products?status=PURCHASED,CANCELLED,EXPIRED`;
    const response = await fetch(newUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    console.log(stringifiedToken.sub);
  } else {
    // Not Signed in
    res.status(401);
  }
}
