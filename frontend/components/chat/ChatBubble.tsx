// components/chat/ChatBubble.tsx
import { useSession } from "next-auth/react";
import { formatDate, getInitial } from "@/lib/utils";
import { ChatMessage } from "@/lib/types";
import ReactMarkdown from "react-markdown";

interface ChatBubbleProps {
  message: ChatMessage;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const { data: session } = useSession();
  const isUser = message.role === "user";
  const isSystem = message.role === "system";

  if (isSystem) {
    return (
      <div className="flex justify-center my-4">
        <div className="bg-gray-100 text-gray-700 rounded-lg py-2 px-4 max-w-[80%]">
          <p>{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      {!isUser && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white mr-2">
          A
        </div>
      )}
      <div
        className={`relative max-w-[80%] px-4 py-2 rounded-lg shadow-sm ${
          isUser
            ? "bg-indigo-600 text-white rounded-br-none"
            : "bg-white text-gray-800 rounded-bl-none"
        }`}
      >
        <div className="whitespace-pre-wrap">
          {isUser ? (
            message.content
          ) : (
            // components/chat/ChatBubble.tsx
            <ReactMarkdown
              components={{
                p: ({ node, ...props }) => <p className="prose prose-sm max-w-none" {...props} />
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>
        <div
          className={`text-xs mt-1 flex justify-between ${
            isUser ? "text-indigo-200" : "text-gray-500"
          }`}
        >
          <span>
            {message.service}/{message.model}
          </span>
          <span>{formatDate(message.timestamp)}</span>
        </div>
      </div>
      {isUser && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 ml-2">
          {getInitial(session?.user?.name || "")}
        </div>
      )}
    </div>
  );
}