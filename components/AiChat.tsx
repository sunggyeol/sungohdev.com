"use client";

import { useState, useRef, useEffect, useCallback } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const send = useCallback(
    async (text: string) => {
      if (!text.trim() || streaming) return;

      const userMsg: Message = { role: "user", content: text.trim() };
      const newMessages = [...messages, userMsg];
      setMessages(newMessages);
      setInput("");
      setStreaming(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: newMessages }),
        });

        if (!res.ok || !res.body) {
          throw new Error("Failed to connect");
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let assistantText = "";

        setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

        let done = false;
        while (!done) {
          const result = await reader.read();
          done = result.done;
          if (done) break;
          const value = result.value;
          assistantText += decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "assistant",
              content: assistantText,
            };
            return updated;
          });
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, I couldn't connect right now. Try again later!",
          },
        ]);
      } finally {
        setStreaming(false);
      }
    },
    [messages, streaming],
  );

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="group flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-500"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-500 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-500" />
        </span>
        Talk to AI Sung Oh
      </button>
    );
  }

  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-2.5 dark:border-gray-700 dark:bg-gray-900">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            AI Sung Oh
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            powered by Claude
          </span>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="custom-scrollbar h-64 space-y-3 overflow-y-auto px-4 py-3"
      >
        {messages.length === 0 && (
          <div className="space-y-2">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Ask me anything about research, projects, or just say hi.
            </p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={msg.role === "user" ? "text-right" : ""}>
            <div
              className={`inline-block max-w-[85%] rounded-lg px-3 py-1.5 text-sm ${
                msg.role === "user"
                  ? "bg-primary-500 text-white"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
              }`}
            >
              {msg.content}
              {msg.role === "assistant" &&
                streaming &&
                i === messages.length - 1 && (
                  <span className="ml-0.5 inline-block h-3.5 w-0.5 animate-pulse bg-current" />
                )}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 px-3 py-2 dark:border-gray-700">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            disabled={streaming}
            className="flex-1 rounded-md border border-gray-200 bg-transparent px-3 py-1.5 text-sm text-gray-900 placeholder-gray-400 focus:border-primary-400 focus:outline-none focus:ring-0 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-primary-400"
          />
          <button
            type="submit"
            disabled={streaming || !input.trim()}
            className="rounded-md bg-primary-500 px-3 py-1.5 text-sm text-white transition-opacity hover:bg-primary-500-dark disabled:opacity-30"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
