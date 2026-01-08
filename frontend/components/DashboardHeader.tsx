import React from "react";
import { Calendar } from "lucide-react";
import Image from "next/image";

const FALLBACK_USER = {
  fullName: "Alex Developer",
  username: "alexdev",
  avatar: "/images/avatar.png", // Reliable fallback
  coverImage: "",
  dob: "1998-05-15",
  bio: "Full Stack Developer building cool things.",
};

const DashboardHeader = ({ user }) => {
  const userData = user || FALLBACK_USER;

  // Formatting Date safely
  const formattedDate = userData.dob
    ? new Date(userData.dob).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Add Date of Birth";

  return (
    <div className="w-full bg-white relative shadow-xl border-b border-gray-200">
      {/* Cover Image Area */}
      <div className="h-48 w-full bg-gray-100 relative group overflow-hidden">
        {userData.coverImage ? (
          <Image
            height={800}
            width={1000}
            src={userData.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        ) : (
          // Fallback Gradient if no cover image
          <div className="w-full h-full bg-linear-to-r from-slate-800 to-zinc-900" />
        )}

        <button className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity">
          Change Cover
        </button>
      </div>

      {/* Profile Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-16 pb-6 flex flex-col items-center">
          {/* Avatar */}
          <div className="relative w-32 h-32">
            <Image
              height={100}
              width={100}
              src={userData.avatar}
              alt={userData.fullName}
              className="w-full h-full rounded-full border-4 border-white shadow-md object-cover bg-white"
            />
          </div>

          {/* Name */}
          <h1 className="mt-3 text-3xl font-bold text-gray-900 text-center">
            {userData.fullName}
          </h1>

          {/* DOB */}
          <div className="flex items-center gap-2 mt-1 text-gray-500 text-sm">
            <Calendar size={14} />
            <span>Born: {formattedDate}</span>
          </div>

          {/* Username */}
          <p className="text-blue-600 text-sm mt-1 font-medium">
            @{userData.username}
          </p>

          {/* Bio */}
          {userData.bio ? (
            <p className="text-gray-600 text-center mt-3 max-w-md">
              {userData.bio}
            </p>
          ) : (
            <p className="text-gray-400 text-center mt-3 text-sm italic">
              No bio yet.
            </p>
          )}

          {/* Stats (Static for now, will connect later) */}
          <div className="flex gap-8 mt-6 border-t border-gray-100 pt-6 w-full max-w-md justify-center">
            {[
              { label: "Projects", value: 0 },
              { label: "Logs", value: 0 },
              { label: "Day Streak", value: 0 },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <span className="block text-xl font-bold text-gray-900">
                  {stat.value}
                </span>
                <span className="text-xs uppercase tracking-wide text-gray-500">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
