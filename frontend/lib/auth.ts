import NextAuth, { type NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: "read:user user:email repo",
        },
      },
    }),

    CredentialsProvider({
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
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          const data = await res.json();

          if (!res.ok || !data.token) {
            console.error("Credentials login failed:", data.message);
            throw new Error(data.message || "Invalid email or password");
          }

          return data;
        } catch (error) {
          console.error("Credentials login error:", error);
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
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/auth/github/sync`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  githubId: user.id,
                  username: user.name,
                  email: user.email,
                  accessToken: account.access_token,
                }),
              }
            );

            const response = await res.json();
            const data = response.data;
            if (!res.ok) throw new Error(data.message || "GitHub sync failed");

            token.apiToken = data.token;
            token.id = data.user.id;
          } catch (error) {
            console.error("GitHub sync error:", error);
            return { ...token, error: "GitHubSyncError" };
          }
        }

        // 🔥 Credentials Login Flow
        if (account.provider === "credentials") {
          token.apiToken = user.token;
          token.id = user.user?.id;
        }
      }

      return token;
    },

    async session({ session, token }) {
      // 🔥 Store fields inside session.user (correct place)
      session.user.id = token.id as string;
      session.user.apiToken = token.apiToken as string;
      session.user.error = token.error as string | undefined;

      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
