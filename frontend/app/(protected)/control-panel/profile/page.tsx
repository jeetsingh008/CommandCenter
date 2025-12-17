import { Calendar } from "lucide-react";
import Image from "next/image";

// types/user.ts
export interface UserProfile {
  fullName: string;
  username: string;
  avatar: string;
  coverImage?: string;
  dob?: string;
  bio?: string;
}

const DashboardHeader = ({ user }: { user: UserProfile }) => {
  // Fallback data in case user prop is loading or incomplete
  const userData = user || {
    fullName: "Alex Developer",
    username: "alexdev",
    avatar: "/avatar.jpg", // Placeholder
    coverImage: "/cover.jpg", // Placeholder
    dob: "1998-05-15",
    bio: "Full Stack Developer building cool things.",
  };

  const formattedDate = userData.dob
    ? new Date(userData.dob).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Add Date of Birth";

  return (
    <div className="w-full bg-white shadow-sm border-b border-gray-200">
      {/* Cover Image Area */}
      <div className="h-48 w-full bg-gray-100 relative group">
        {userData.coverImage ? (
          <Image
            src={userData.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
            height={50}
            width={50}
          />
        ) : (
          <div className="w-full h-full bg-linear-to-r from-blue-600 to-indigo-600"></div>
        )}

        {/* Optional: Edit Cover Button (Visible on Hover) */}
        <button className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity">
          Change Cover
        </button>
      </div>

      {/* Profile Content Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-16 pb-6 flex flex-col items-center">
          {/* Avatar - Centered and overlapping the cover image */}
          <div className="relative">
            <Image
              height={50}
              width={50}
              src={userData.avatar}
              alt={userData.fullName}
              className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover bg-white"
            />
          </div>

          {/* Name - Centered */}
          <h1 className="mt-3 text-3xl font-bold text-gray-900 text-center">
            {userData.fullName}
          </h1>

          {/* DOB - Centered just below name as requested */}
          <div className="flex items-center justify-center gap-2 mt-1 text-gray-500 text-sm">
            <Calendar size={14} />
            <span>Born: {formattedDate}</span>
          </div>

          {/* Username & Bio */}
          <p className="text-blue-600 text-sm mt-1 font-medium">
            @{userData.username}
          </p>

          {userData.bio && (
            <p className="text-gray-600 text-center mt-3 max-w-md">
              {userData.bio}
            </p>
          )}

          {/* Career Stats (CommandCenter Context) */}
          <div className="flex gap-8 mt-6 border-t border-gray-100 pt-6 w-full max-w-md justify-center">
            <div className="text-center">
              <span className="block text-xl font-bold text-gray-900">12</span>
              <span className="text-xs uppercase tracking-wide text-gray-500">
                Projects
              </span>
            </div>
            <div className="text-center">
              <span className="block text-xl font-bold text-gray-900">145</span>
              <span className="text-xs uppercase tracking-wide text-gray-500">
                Logs
              </span>
            </div>
            <div className="text-center">
              <span className="block text-xl font-bold text-gray-900">32</span>
              <span className="text-xs uppercase tracking-wide text-gray-500">
                Day Streak
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
