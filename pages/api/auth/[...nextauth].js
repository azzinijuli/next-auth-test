import NextAuth from "next-auth/next";

export default NextAuth({
  providers: [
    {
      id: "idp",
      name: "Portal Unificado",
      type: "oauth",
      version: "2.0",
      scope: "openid email",
      state: true,
      protection: "state",
      params: { grant_type: "authorization_code" },
      idToken: true,
      authorizationUrl:
        "https://idpsesiont.telecom.com.ar/openam/oauth2/realms/convergente/authorize?response_type=code",
      accessTokenUrl:
        "https://idpsesiont.telecom.com.ar/openam/oauth2/realms/convergente/access_token",
      requestTokenUrl:
        "https://idpsesiont.telecom.com.ar/openam/oauth2/realms/convergente/authorize",
      profileUrl:
        "https://idpsesiont.telecom.com.ar:443/openam/oauth2/convergente/userinfo",
      profile(profile) {
        console.log(profile);
        return {
          id: profile.id,
        };
      },
      clientId: process.env.NEXT_PUBLIC_IDP_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_IDP_CLIENT_SECRET,
    },
  ],
});
