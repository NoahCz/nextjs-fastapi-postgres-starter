"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@/app/context/user/UserContext";
import { useApiBasePath } from "@/app/hooks/useApiBasePath";
import { IThread } from "@/app/types/thread/thread.interace";

export function ThreadList() {
  const [threads, setThreads] = useState<IThread[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  const apiBasePath = useApiBasePath();

  useEffect(() => {
    const fetchThreads = async () => {
      if (!user?.id) {
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(`${apiBasePath}/users/${user.id}/threads`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch threads: ${response.status}`);
        }

        const threadsData = await response.json();
        setThreads(threadsData);
        setError(null);
      } catch (err) {
        console.error("Error fetching threads:", err);
        setError("Failed to load threads");
      } finally {
        setIsLoading(false);
      }
    };

    fetchThreads();
  }, [user?.id, apiBasePath]);

  if (isLoading) {
    return (
      <div className="mt-4 p-4 text-black bg-gray-100 rounded-md">
        Loading threads...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
        Error: {error}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mt-4 p-4 bg-yellow-100 rounded-md">
        Please log in to view your threads
      </div>
    );
  }

  if (threads.length === 0) {
    return (
      <div className="mt-4 p-4 bg-slate-300 text-black rounded-md">
        {`You don't have any threads yet. Create one to get started!`}
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Your Threads</h2>
      <div className="space-y-2">
        {threads.map((thread) => (
          <Link
            href={`/thread/${thread.id}`}
            key={thread.id}
            className="block text-black bg-slate-200 p-4  rounded-md hover:bg-gray-300 transition-colors"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{`Thread #${thread.id}`}</span>
              <span className="text-sm text-gray-500">
                {new Date(thread.createdAt).toLocaleDateString()}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
