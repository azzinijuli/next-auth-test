import NextAuth from "next-auth/next";

export default NextAuth({
  providers: [
    {
      id: "idp",
      name: "Portal Unificado",
      type: "oauth",
      authorization:
        "https://idpsesiont.telecom.com.ar/openam/oauth2/realms/convergente/authorize",
      token:
        "https://idpsesiont.telecom.com.ar/openam/oauth2/realms/convergente/access_token",
      userinfo:
        "https://idpsesiont.telecom.com.ar:443/openam/oauth2/convergente/userinfo",
      async profile(profile) {
        console.log(profile);
      },
      clientId: process.env.NEXT_PUBLIC_IDP_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_IDP_CLIENT_SECRET,
    },
  ],
});
