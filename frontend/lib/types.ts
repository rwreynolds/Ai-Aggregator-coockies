// lib/types.ts
import { Session } from "next-auth";

// lib/types.ts or create a new file: types/next-auth.d.ts

import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}

export interface UserSettings {
  service: string;
  model: string;
  temperature: number;
  maxTokens: number;
  assistantId?: string;
  serviceThread?: string;
  sessionThread?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  service: string;
  model: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ExtendedSession extends Session {
  user: {
    id: string;
    name: string;
    email: string;
  }
}

export interface ServiceModel {
  service: string;
  models: string[];
}

export const availableServices: ServiceModel[] = [
  {
    service: "openai",
    models: ["gpt-3.5-turbo", "gpt-4", "gpt-4-turbo"]
  },
  {
    service: "anthropic",
    models: ["claude-2", "claude-3-opus", "claude-3-sonnet"]
  },
  {
    service: "google",
    models: ["gemini-pro", "gemini-ultra"]
  },
  {
    service: "mistral",
    models: ["mistral-small", "mistral-medium", "mistral-large"]
  }
];