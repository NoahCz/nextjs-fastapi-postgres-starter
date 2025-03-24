"use client";
import { useUser } from "@/app/context/user/UserContext";
import { ProfilePicture } from "../profile-picture";
import { MessageProps } from "./message.interface";

export const Message = ({ message }: MessageProps) => {
  const { user } = useUser();

  const { username } = user ?? {};

  const isBotResponse = !message.userId;
  if (isBotResponse) {
    return (
      <div className="flex place-content-start">
        <div className="basis-4/5 justify-self-start">
          <span className="text-sm text-slate-600">{`AI -- ${message.createdAt}`}</span>
          <div className="bg-green-400 text-black rounded-xl p-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <ProfilePicture height={12} width={12} />
                <p>{message.content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex place-content-end">
      <div className="basis-4/5 justify-self-end">
        <span className="text-sm text-slate-600">{`${username} -- ${message.createdAt}`}</span>
        <div className="bg-blue-300 text-black rounded-xl p-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <ProfilePicture height={24} width={24} />
              <p>{message.content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
