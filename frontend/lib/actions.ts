"use server";

import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";

type FormState = {
  message: string;
};

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
        headers: {
          "Content-Type": "application/json",
        },
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

export async function loginUser(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      return { message: "All fields are required." };
    }
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "CredentialsSignin") {
        return { message: "Invalid email or password." };
      } else {
        return { message: "An error occurred during sign-in." };
      }
    }
    throw error;
  }

  redirect("/");
}
