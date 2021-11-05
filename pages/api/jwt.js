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
