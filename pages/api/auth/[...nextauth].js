import NextAuth from "next-auth/next";
import { getToken } from "next-auth/jwt";

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
        console.log("perfil", profile);
      },
      clientId: process.env.NEXT_PUBLIC_IDP_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_IDP_CLIENT_SECRET,
    },
  ],
  secret: process.env.SECRET,
  debug: true,
  session: {
    jwt: true,
    maxAge: 60 * 5,
  },
  jwt: {
    secret: process.env.SECRET,
    encryption: false,
  },
  callbacks: {
    async signin(user, account, profile) {
      console.log("usuario", user, account, profile);
      return true;
    },
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      console.log("el token", token);
      console.log("el access token", account.access_token);
      return token;
    },
  },
});
