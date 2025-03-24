"use client";

import { ChatWindow } from "@/app/components/chat-window";
import { UserProvider } from "@/app/context/user/UserContext";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ThreadPage() {
  const params = useParams();
  const threadId = params.threadId as string;

  return (
    <UserProvider>
      <div className="flex flex-col h-screen">
        <div className="p-4 flex-shrink-0">
          <Link href="/" className="text-blue-300 hover:underline">
            &larr; Back to Home
          </Link>
        </div>

        <div className="flex-1 p-4 overflow-hidden">
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col h-full">
            <h1 className="text-2xl text-black font-bold mb-4 flex-shrink-0">
              Thread #{threadId}
            </h1>
            <ChatWindow threadId={threadId} />
          </div>
        </div>
      </div>
    </UserProvider>
  );
}
