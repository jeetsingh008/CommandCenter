"use server";

import { redirect } from "next/navigation";
import { signIn } from "@/lib/auth";
import { api } from "@/lib/api"; // 👈 Add this
import { revalidatePath } from "next/cache"; //

type FormState = {
  message: string;
};

/* =========================
   REGISTER USER (Unchanged)
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
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return { message: data.message || "Registration failed." };
    }
  } catch (error) {
    if (error instanceof Error) {
      return { message: `Registration failed: ${error.message}` };
    }
    return { message: "An unknown error occurred." };
  }

  redirect("/login");
}

/* =========================
   LOGIN USER (Updated for Debugging)
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
    // 1. Let Next.js Redirects pass through (Successful login)
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error;
    }

    const err = error as any;

    // 2. Check for Credential Errors (Invalid login)
    if (
      err.type === "CredentialsSignin" ||
      err.code === "credentials" ||
      err.message?.includes("CredentialsSignin")
    ) {
      return { message: "Invalid email or password." };
    }

    // 3. 🛑 DEBUGGING: Return the REAL error message to the UI
    // This will tell us if it's a Database error, Fetch error, or Config error
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
   🆕 CREATE PROJECT ACTION
   ========================= */
export async function createProjectAction(formData: {
  title: string;
  description: string;
  color: string;
}) {
  try {
    // This runs securely on the server
    // api.post uses the headers from auth(), so the token is attached automatically
    const res: any = await api.post("projects", formData);

    if (res.success) {
      // Refresh the dashboard so the new project shows up immediately
      revalidatePath("/control-panel");
      return { success: true, data: res.data };
    }

    return { success: false, error: res.message || "Failed to create project" };
  } catch (error: any) {
    console.error("Server Action Error:", error);
    return { success: false, error: error.message || "System Error" };
  }
}

/* =========================
   LOGOUT USER ---> for future use
   ========================= */
// export async function logoutUser() {
//   await signOut({ redirectTo: "/" });
// }

// =========================
