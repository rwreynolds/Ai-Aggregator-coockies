from typing import List, Dict, Any, Optional
from datetime import datetime
from pydantic import BaseModel, Field


class MessageContent(BaseModel):
    """Message content model."""
    content: str
    role: str
    service: str
    model: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class Message(BaseModel):
    """Message model for MongoDB storage."""
    id: Optional[str] = None
    conversation_id: Optional[str] = None
    user_id: str
    content: str
    role: str = "user"  # user, assistant, system
    service: str
    model: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

    def to_dict(self) -> Dict[str, Any]:
        """Convert message object to dictionary."""
        return {
            "id": self.id,
            "conversation_id": self.conversation_id,
            "user_id": self.user_id,
            "content": self.content,
            "role": self.role,
            "service": self.service,
            "model": self.model,
            "timestamp": self.timestamp
        }

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'Message':
        """Create message object from dictionary."""
        return cls(**data)


class Conversation(BaseModel):
    """Conversation model for MongoDB storage."""
    id: Optional[str] = None
    user_id: str
    session_id: str
    title: str
    messages: List[Message] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    def to_dict(self) -> Dict[str, Any]:
        """Convert conversation object to dictionary."""
        return {
            "id": self.id,
            "user_id": self.user_id,
            "session_id": self.session_id,
            "title": self.title,
            "messages": [msg.to_dict() for msg in self.messages],
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'Conversation':
        """Create conversation object from dictionary."""
        if "messages" in data:
            data["messages"] = [Message.from_dict(msg) for msg in data["messages"]]
        return cls(**data)