// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default async function handler(req, res) {
  const baseUrlStore = "https://backoffice-staging.personal-svcs.com"; //UAT
  const externalId = 543777220160;

  const data = await fetch(
    `${baseUrlStore}}/v1/customers/${externalId}/products?status=PURCHASED,CANCELLED,EXPIRED`
  );
  const json = await data.json();
  console.log("json", json);
  console.log("req", req);
  res.status(200).json(json);
}
