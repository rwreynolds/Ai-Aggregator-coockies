// components/chat/ChatInput.tsx
import { useState, FormEvent, KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export default function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <div className="flex-grow relative">
        <textarea
          className="w-full border rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none overflow-auto"
          placeholder="Type your message..."
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          style={{ minHeight: "48px", maxHeight: "120px" }}
        />
      </div>
      <Button
        type="submit"
        disabled={isLoading || !message.trim()}
        className="flex-shrink-0"
        isLoading={isLoading}
      >
        {!isLoading && <Send size={18} />}
      </Button>
    </form>
  );
}