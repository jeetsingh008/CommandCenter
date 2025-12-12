import "next-auth";
import "next-auth/jwt";

/**
 * Extend the JWT token shape
 */
declare module "next-auth/jwt" {
  interface JWT {
    /** Custom backend JWT from Express API */
    apiToken?: string;

    /** MongoDB user ID */
    id?: string;

    /** Used when GitHub sync fails */
    error?: string;
  }
}

/**
 * Extend the NextAuth Session and User types
 */
declare module "next-auth" {
  interface Session {
    user: {
      /** MongoDB user ID */
      id?: string;

      /** Our backend JWT token */
      apiToken?: string;

      /** Error if GitHub sync failed */
      error?: string;

      /** Keep default fields: name, email, image */
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    /** Backend-issued JWT (for Credentials login only) */
    token?: string;

    /** Backend user object */
    user?: {
      id?: string;
      email?: string;
    };

    /** These fields come from GitHub login */
    id?: string; // GitHub ID
    name?: string | null; // GitHub name
    email?: string | null;
  }
}
