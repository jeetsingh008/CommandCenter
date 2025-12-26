import { auth } from "@/lib/auth"; // We import the auth config to get the session
import { API_URL } from "./config";

const BASE_URL = API_URL;

if (!BASE_URL) {
  throw new Error(
    'NEXT_PUBLIC_API_URL is not set in your .env.local file. Please add it (e.g., NEXT_PUBLIC_API_URL="http://localhost:8080/api/v1")'
  );
}


async function getApiContext() {
  const session = await auth();

  const token = session?.user?.apiToken;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return { headers };
}

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
    let errorMessage = `API request failed with status ${res.status}`;
    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e) {
      errorMessage = res.statusText || errorMessage;
    }
    throw new Error(errorMessage);
  }

  if (res.status === 204) {
    return null;
  }

  return res.json();
}

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
