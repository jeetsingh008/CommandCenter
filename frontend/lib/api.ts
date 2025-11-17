import { auth } from "@/lib/auth"; // We import the auth config to get the session

// This is the base URL of your Express.js backend
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!BASE_URL) {
  throw new Error(
    'NEXT_PUBLIC_API_URL is not set in your .env.local file. Please add it (e.g., NEXT_PUBLIC_API_URL="http://localhost:8080/api/v1")'
  );
}

/**
 * A helper function to get the session and construct the auth headers.
 * This runs ONLY on the server and ensures every API request
 * is authenticated with the user's Express.js JWT.
 */

async function getApiContext() {
  const session = await auth();

  // We get the apiToken we stored in the session in lib/auth.ts
  const token = session?.apiToken;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return { headers };
}

/**
 * A generic request handler that includes error handling.
 */
async function request(endpoint: string, options: RequestInit) {
  const { headers } = await getApiContext();
  const url = `${BASE_URL}/${endpoint}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  if (!res.ok) {
    // If the server returns a 4xx or 5xx error, try to parse the error
    // message from the backend and throw an error.
    let errorMessage = `API request failed with status ${res.status}`;
    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e) {
      // Could not parse JSON, use status text
      errorMessage = res.statusText || errorMessage;
    }
    throw new Error(errorMessage);
  }

  // Handle successful "No Content" responses (e.g., from a DELETE request)
  if (res.status === 204) {
    return null;
  }

  // Parse and return the successful JSON response
  return res.json();
}

/**
 * Our server-side API client object.
 * We will import this in Server Components and Server Actions.
 */
export const api = {
  get: (endpoint: string) => {
    return request(endpoint, { method: "GET" });
  },

  post: (endpoint: string, data: any) => {
    return request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  put: (endpoint: string, data: any) => {
    return request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  delete: (endpoint: string) => {
    return request(endpoint, { method: "DELETE" });
  },
};
