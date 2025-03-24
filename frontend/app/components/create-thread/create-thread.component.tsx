"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApiBasePath } from "@/app/hooks/useApiBasePath";
import { CreateThreadProps } from "./create-thread.interface";
import { useUser } from "@/app/context/user/UserContext";
import { THREAD_SLUG } from "@/app/thread/[threadId]/page.consts";

export default function CreateThread() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const apiBasePath = useApiBasePath();
  const { user } = useUser();

  const createThread = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiBasePath}/threads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user?.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to create thread");
      }

      const data = await response.json();
      router.replace(`${THREAD_SLUG}/${data?.threadId}`);
    } catch (error) {
      console.error("Error creating thread:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonDisabled = !user || isLoading;
  const buttonText = isLoading ? "Creating..." : "Create New Thread";

  return (
    <button
      onClick={createThread}
      disabled={buttonDisabled}
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
    >
      {buttonText}
    </button>
  );
}
