import { useUser } from "@/app/context/user/UserContext";
import Image from "next/image";
import { ProfilePictureProps } from "./profile-picture.interface";

const PROFILE_PICTURE_FALLBACK = "https://dummyimage.com/300" as const;

export function ProfilePicture({
  width,
  height,
  alt = "Profile Picture",
  className,
}: ProfilePictureProps) {
  const { user } = useUser();
  return (
    <Image
      src={user?.profilePicture ?? PROFILE_PICTURE_FALLBACK}
      alt={alt}
      width={width}
      height={height}
      className={`rounded-full ${className || ""}`}
    />
  );
}
