"use client";

import { useState, useEffect, useCallback } from "react";
import { IMessage } from "@/app/types/message";
import { Message } from "../message";
import { useApiBasePath } from "@/app/hooks/useApiBasePath";
import { useUser } from "@/app/context/user/UserContext";

export const ChatWindow = ({ threadId }: { threadId: string }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);

  const apiBasePath = useApiBasePath();
  const { user } = useUser();

  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${apiBasePath}/threads/${threadId}/messages`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data = await response.json();
      setMessages(data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  }, [apiBasePath, threadId]);

  useEffect(() => {
    fetchMessages();
  }, [threadId, fetchMessages]);

  const sendMessage = async () => {
    const inputIsWhitespace = !inputValue.trim();
    if (inputIsWhitespace) {
      return;
    }
    try {
      const response = await fetch(`${apiBasePath}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: inputValue,
          userId: user?.id,
          threadId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setInputValue("");
      fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const Messages = () => {
    if (loading) {
      return <p>Loading messages...</p>;
    }
    if (messages.length === 0) {
      return (
        <p className="text-slate-400">
          No messages yet. Start the conversation!
        </p>
      );
    }
    return messages.map((message) => (
      <Message message={message} key={message.id || JSON.stringify(message)} />
    ));
  };

  return (
    <>
      <div className="flex flex-1 flex-col gap-8 overflow-y-auto max-h-full">
        <Messages />
      </div>
      <div className="flex gap-4 mt-4">
        <input
          type="text"
          placeholder="Type your message here..."
          className="text-black border border-gray bg-white w-full rounded-lg p-2"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="bg-blue-400 rounded-full aspect-square px-4 py-2"
          onClick={sendMessage}
        >
          &uarr;
        </button>
      </div>
    </>
  );
};
