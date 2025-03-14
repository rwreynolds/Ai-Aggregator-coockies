// components/chat/ConversationHistory.tsx
import { ChatMessage } from "@/lib/types";
import ChatBubble from "./ChatBubble";

interface ConversationHistoryProps {
  messages: ChatMessage[];
}

export default function ConversationHistory({ messages }: ConversationHistoryProps) {
  // Group messages by sender for better visual separation
  const messageGroups = messages.reduce<ChatMessage[][]>((groups, message) => {
    const lastGroup = groups[groups.length - 1];

    if (lastGroup && lastGroup[0].role === message.role) {
      lastGroup.push(message);
    } else {
      groups.push([message]);
    }

    return groups;
  }, []);

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <p className="mb-2 text-lg font-medium">Welcome to AI Aggregator</p>
        <p className="text-center max-w-md">
          Start a conversation with multiple AI models. Use the settings button above to configure your experience.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messageGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="space-y-2">
          {group.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}
        </div>
      ))}
    </div>
  );
}