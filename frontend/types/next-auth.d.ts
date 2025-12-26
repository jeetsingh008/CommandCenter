import "next-auth";
import "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    apiToken?: string;

    id?: string;

    error?: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;

      apiToken?: string;

      error?: string;

      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    token?: string;

    user?: {
      _id?: string;
      email?: string;
    };

    id?: string; 
    name?: string | null;
    email?: string | null;
  }
}
