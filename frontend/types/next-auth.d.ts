import 'next-auth';
import 'next-auth/jwt';

/**
 * This file is used to "augment" or "extend" the default types
 * provided by next-auth. This tells TypeScript about the new
 * properties we are adding to the Session and JWT.
 */

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback */
  interface JWT {
    /** Our custom Express API token */
    apiToken?: string;
    /** Our custom user ID from MongoDB */
    id?: string;
    /** To flag any errors */
    error?: string;
  }
}

declare module 'next-auth' {
  /**
   * Returned by `auth()`, `useSession()`, `getSession()`
   */
  interface Session {
    user: {
      id: string; // Add the user ID to the session user
    } & DefaultSession['user']; // Keep the default properties (name, email, image)
    
    /** Our custom Express API token */
    apiToken: string;
    /** To flag any errors */
    error?: string;
  }

  /**
   * The `user` object we return from our `authorize` function.
   * This is merged with the default `User` type.
   */
  interface User {
    token: string;
    user: {
      id: string;
      email: string;
    };
  }
}