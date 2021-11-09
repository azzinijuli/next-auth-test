import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const secret = process.env.NEXT_PUBLIC_IDP_SECRET;
  const stringifiedToken = await getToken({ req, secret });
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwZXJzb25hbCIsImluc3RhbmNlIjoiNjEifQ.Uq-dOKkLtkZQppeygKvRazDig2hcBnebOIYphdFH62M";
  // Signed in
  const externalId = 543777220160;
  const newUrl = `https://backoffice-staging.personal-svcs.com/v1/customers/${externalId}/products?status=PURCHASED,CANCELLED,EXPIRED`;
  const response = await fetch(newUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  console.log(data);
  console.log(stringifiedToken);
  // Not Signed in
  res.status(200).json(data);
}
