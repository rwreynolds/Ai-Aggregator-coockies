// components/chat/ChatContainer.tsx
import { useRef, useEffect } from "react";
import ConversationHistory from "./ConversationHistory";
import ChatInput from "./ChatInput";
import { ChatMessage } from "@/lib/types";
import { Settings } from "lucide-react";

interface ChatContainerProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
  onToggleSettings: () => void;
  settingsOpen: boolean;
}

export default function ChatContainer({
  messages,
  isLoading,
  onSendMessage,
  onToggleSettings,
  settingsOpen,
}: ChatContainerProps) {
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white p-4 border-b flex justify-between items-center">
        <h1 className="text-xl font-semibold">AI Chat</h1>
        <button
          onClick={onToggleSettings}
          className={`p-2 rounded-full ${
            settingsOpen ? "bg-indigo-100 text-indigo-600" : "hover:bg-gray-100"
          }`}
          aria-label="Toggle settings"
        >
          <Settings size={20} />
        </button>
      </div>

      {/* Conversation */}
      <div className="flex-grow overflow-auto p-4">
        <ConversationHistory messages={messages} />
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white">
        <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}