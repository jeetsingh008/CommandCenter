import { Calendar } from "lucide-react";
import Image from "next/image";

export interface UserProfile {
  fullName: string;
  username: string;
  avatar: string;
  coverImage?: string;
  dob?: string;
  bio?: string;
}

const FALLBACK_USER: UserProfile = {
  fullName: "Alex Developer",
  username: "alexdev",
  avatar: "/images/avatar.jpg",
  coverImage: "/images/cover-image.jpg",
  dob: "1998-05-15",
  bio: "Full Stack Developer building cool things.",
};

const DashboardHeader = ({ user }: { user?: UserProfile }) => {
  // ✅ Derived data (NO state, NO effect)
  const userData = user ?? FALLBACK_USER;

  const formattedDate = userData.dob
    ? new Date(userData.dob).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Add Date of Birth";

  return (
    <div className="w-full bg-white relative shadow-xl border-b border-gray-200">
      {/* Cover Image */}
      <div className="h-48 w-full bg-gray-100 relative group">
        <Image
          src={userData.coverImage || "/images/cover-image.jpg"}
          alt="Cover"
          fill
          priority
          className="object-cover"
        />

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
              src={userData.avatar}
              alt={userData.fullName}
              fill
              priority
              className="rounded-full border-4 border-white shadow-md object-cover bg-white"
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
          {userData.bio && (
            <p className="text-gray-600 text-center mt-3 max-w-md">
              {userData.bio}
            </p>
          )}

          {/* Stats */}
          <div className="flex gap-8 mt-6 border-t border-gray-100 pt-6 w-full max-w-md justify-center">
            {[
              { label: "Projects", value: 12 },
              { label: "Logs", value: 145 },
              { label: "Day Streak", value: 32 },
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
