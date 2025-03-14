// app/chat/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ChatContainer from "@/components/chat/ChatContainer";
import SettingsPanel from "@/components/chat/SettingsPanel";
import { ChatMessage, UserSettings } from "@/lib/types";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function ChatPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [settings, setSettings] = useState<UserSettings>({
    service: "openai",
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    maxTokens: 1000,
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Initialize session
  useEffect(() => {
    if (status === "authenticated") {
      // Generate a session ID for this chat session
      const newSessionId = uuidv4();
      setSessionId(newSessionId);

      // Load user settings
      const loadUserSettings = async () => {
        try {
          const response = await axios.get("/api/settings");
          if (response.data?.settings) {
            setSettings({
              service: response.data.settings.defaultService,
              model: response.data.settings.defaultModel,
              temperature: response.data.settings.temperature,
              maxTokens: response.data.settings.maxTokens,
              assistantId: response.data.settings.defaultAssistantId,
            });
          }
        } catch (error) {
          console.error("Failed to load user settings:", error);
        }
      };

      loadUserSettings();
    }
  }, [status]);

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };

  const handleSettingsChange = (newSettings: UserSettings) => {
    setSettings(newSettings);
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Create user message
    const userMessage: ChatMessage = {
      id: uuidv4(),
      role: "user",
      content,
      timestamp: new Date(),
      service: settings.service,
      model: settings.model,
    };

    // Add to messages
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      // Send to API
      const response = await axios.post("/api/chat", {
        message: content,
        sessionId,
        settings,
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      });

      // Add AI response to messages
      const aiMessage: ChatMessage = {
        id: uuidv4(),
        role: "assistant",
        content: response.data.message,
        timestamp: new Date(),
        service: settings.service,
        model: settings.model,
      };

      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Failed to send message:", error);

      // Add error message
      const errorMessage: ChatMessage = {
        id: uuidv4(),
        role: "system",
        content: "Sorry, there was an error processing your request. Please try again.",
        timestamp: new Date(),
        service: settings.service,
        model: settings.model,
      };

      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex-grow overflow-hidden">
        {/* Settings Panel */}
        <div
          className={`transition-all duration-300 bg-white shadow-md ${
            settingsOpen ? "max-h-96" : "max-h-0"
          } overflow-hidden`}
        >
          <SettingsPanel settings={settings} onSettingsChange={handleSettingsChange} />
        </div>

        {/* Chat Container */}
        <ChatContainer
          messages={messages}
          isLoading={isLoading}
          onSendMessage={sendMessage}
          onToggleSettings={toggleSettings}
          settingsOpen={settingsOpen}
        />
      </div>
    </div>
  );
}