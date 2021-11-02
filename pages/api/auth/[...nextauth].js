import NextAuth from "next-auth/next";

export default NextAuth({
  providers: [
    {
      id: "idp",
      name: "Portal Unificado",
      type: "oauth",
      wellKnown:
        "https://idpsesiont.telecom.com.ar/openam/oauth2/realms/convergente/.well-known/openid-configuration",
      authorization: { params: { scope: "openid email profile" } },
      idToken: true,
      checks: ["pkce", "state"],
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    },
  ],
});
