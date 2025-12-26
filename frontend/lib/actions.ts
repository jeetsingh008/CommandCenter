"use server";

import { redirect } from "next/navigation";
import { signIn } from "@/lib/auth";
import { api } from "@/lib/api"; 
import { revalidatePath } from "next/cache"; 

type FormState = {
  message: string;
};

// 👇 1. DEFINE THE URL MANUALLY TO FORCE THE CONNECTION
// We are hardcoding this to ensure it stops trying to connect to Vercel/Localhost
const BACKEND_URL = "https://commandcenter-gkjz.onrender.com/api";

/* =========================
   REGISTER USER
   ========================= */
export async function registerUser(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get("email")?.toString().toLowerCase();
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (!email || !password || !confirmPassword) {
    return { message: "All fields are required." };
  }

  if (password !== confirmPassword) {
    return { message: "Passwords do not match." };
  }

  try {
    console.log(`Attempting to register user: ${email} at ${BACKEND_URL}`);

    // 👇 2. USE THE HARDCODED URL HERE
    const res = await fetch(
      `${BACKEND_URL}/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    // Check if the response is actually JSON before parsing
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
       const text = await res.text();
       console.error("Non-JSON Response received:", text);
       throw new Error("Server returned HTML instead of JSON. Check Backend URL.");
    }

    const data = await res.json();

    if (!res.ok) {
      return { message: data.message || "Registration failed." };
    }
  } catch (error) {
    console.error("Registration Error:", error);
    if (error instanceof Error) {
      return { message: `Registration failed: ${error.message}` };
    }
    return { message: "An unknown error occurred." };
  }

  redirect("/login");
}

/* =========================
   LOGIN USER
   ========================= */
export async function loginUser(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { message: "All fields are required." };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error;
    }

    const err = error as any;

    if (
      err.type === "CredentialsSignin" ||
      err.code === "credentials" ||
      err.message?.includes("CredentialsSignin")
    ) {
      return { message: "Invalid email or password." };
    }

    console.error("Login Error Details:", JSON.stringify(err, null, 2));

    return {
      message: `Login Failed: ${
        err.message || "Check server console for details"
      }`,
    };
  }

  redirect("/control-panel");
}

/* =========================
   CREATE PROJECT ACTION
   ========================= */
export async function createProjectAction(formData: {
  title: string;
  description: string;
  color: string;
}) {
  try {
    const res: any = await api.post("projects", formData);

    if (res.success) {
      revalidatePath("/control-panel");
      return { success: true, data: res.data };
    }

    return { success: false, error: res.message || "Failed to create project" };
  } catch (error: any) {
    console.error("Server Action Error:", error);
    return { success: false, error: error.message || "System Error" };
  }
}

export async function createLogAction(data: {
  title: string;
  description?: string;
  durationMinutes: number;
  date: string;
  projectId?: string;
  category: string;
}) {
  try {
    const res: any = await api.post("logs", data);

    if (res.success) {
      revalidatePath("/control-panel"); 
      return { success: true, data: res.data };
    }

    return { success: false, error: res.message || "Failed to log session" };
  } catch (error: any) {
    console.error("Log Action Error:", error);
    return { success: false, error: error.message || "System Error" };
  }
}