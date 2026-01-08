import React from "react";
import { redirect } from "next/navigation";
// Update path: auth seems to be in lib based on your api.ts snippet
import { auth } from "@/lib/auth";
import { api } from "@/lib/api";
import DashboardHeader from "@/components/DashboardHeader";

export default async function DashboardPage() {
  // 1. Get the session (Server Side)
  const session = await auth();

  // 2. Security Check: If no session, kick them out
  if (!session || !session.user) {
    redirect("/login");
  }

  // 3. Fetch full profile using the api utility
  let userProfile = null;

  try {
    // api.get handles the token, headers, and base URL automatically
    const response = await api.get("auth/current-user");

    // The backend wraps the actual user object in a 'data' property
    // We check if response exists first
    if (response && response.data) {
      userProfile = response.data;
    }
  } catch (error) {
    console.error("Failed to load dashboard data:", (error as Error).message);
    // We don't redirect here, so the user can still see the dashboard (with fallback data)
    // even if the API is temporarily down.
  }

  // 4. Prepare data for the Header (Merge API data with Session fallback)
  const userData = {
    fullName:
      userProfile?.fullName || session.user.name || "CommandCenter User",
    username: userProfile?.username || session.user.email?.split("@")[0],
    avatar: userProfile?.avatar || session.user.image,
    coverImage: userProfile?.coverImage || "",
    dob: userProfile?.dob || null,
    bio: userProfile?.bio || "Ready to track some code?",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        {/* Pass REAL data to the header */}
        <DashboardHeader user={userData} />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Analytics */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-64 flex flex-col items-center justify-center text-center">
                <h3 className="text-lg font-medium text-gray-900">
                  Your Activity Graph
                </h3>
                <p className="text-gray-400 text-sm mt-2">
                  Charts coming soon!
                </p>
              </div>
            </div>

            {/* Right Column: Recent Logs */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 min-h-[500px]">
                <h3 className="font-bold text-gray-900 mb-4">
                  Recent Activity
                </h3>
                <div className="text-sm text-gray-500 italic">No logs yet.</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
