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
      console.log("user", user, account, profile);
      return true;
    },
    async jwt(token, user, account, profile, isNewUser) {
      console.log(token);
      console.log(user);
      console.log(account);
      console.log(profile);
      console.log(isNewUser);
      if (account.accessToken) {
        token.accessToken = account.accessToken;
      }
      return Promise.resolve(token);
    },
    async session(session, token) {
      console.log(session);
      console.log(token);
      return session;
    },
  },
});
