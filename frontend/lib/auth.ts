import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { API_URL } from "./config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "read:user user:email repo",
        },
      },
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!res.ok) {
            return null;
          }

          const response = await res.json();
          const data = response.data;

          if (!data?.token || !data?.user) {
            return null;
          }

          return {
            token: data.token,
            user: data.user,
          };
        } catch (error) {
          console.error("Credentials authorize error:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        // 🔥 GitHub Login Flow
        if (account.provider === "github") {
          try {
            const res = await fetch(`${API_URL}/auth/github/sync`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                githubId: user.id,
                username: user.name,
                email: user.email,
                accessToken: account.access_token,
              }),
            });

            const response = await res.json();
            const data = response.data;

            if (!res.ok) throw new Error(data.message || "GitHub sync failed");

            token.apiToken = data.token;
            // Handle different ID shapes (MongoDB _id vs GitHub id)
            token.id = data.user._id || data.user.id;
          } catch (error) {
            console.error("GitHub sync error:", error);
            return { ...token, error: "GitHubSyncError" };
          }
        }

        // 🔥 Credentials Login Flow
        if (account.provider === "credentials") {
          // Verify your backend actually returns these fields in the 'user' object above
          token.apiToken = (user as any).token;
          token.id = (user as any).user?._id;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        (session.user as any).apiToken = token.apiToken as string;
        (session.user as any).error = token.error as string | undefined;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },
});
