export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

if (!API_URL) {
  console.warn("API_URL is missing! Check .env file.");
}
