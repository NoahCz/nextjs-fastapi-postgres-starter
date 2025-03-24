"use client";

import { useUser } from "../../context/user/UserContext";
import { ProfilePicture } from "../profile-picture/profile-picture.component";

export function UserInfo() {
  const { user, loading, error } = useUser();

  if (loading) {
    return (
      <div className="mb-4 p-4 text-black bg-gray-100 rounded-md">
        Loading user data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
        Error: {error}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mb-4 p-4 bg-yellow-100 rounded-md">
        Please log in to continue
      </div>
    );
  }

  return (
    <div className="mb-4 p-4 text-black bg-blue-300 rounded-md">
      <h2 className="text-lg font-semibold">Welcome, {user.name}!</h2>
      <div className="flex gap-2 items-center">
        <ProfilePicture alt="Profile Picture" width={36} height={36} />
        <p>{user.username}</p>
      </div>
    </div>
  );
}
