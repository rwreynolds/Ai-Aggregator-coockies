import os
from pymongo import MongoClient
from pymongo.collection import Collection
from pymongo.database import Database
from datetime import datetime
from typing import Dict, List, Any, Optional

# MongoDB client
mongo_client = None
mongo_db = None


def init_mongo(app=None):
    """Initialize MongoDB connection."""
    global mongo_client, mongo_db

    mongo_uri = os.getenv("MONGODB_URI", "mongodb://localhost:27017/ai_aggregator")
    if not mongo_client:
        mongo_client = MongoClient(mongo_uri)
        db_name = mongo_uri.split("/")[-1]
        mongo_db = mongo_client[db_name]

        # Create indexes
        mongo_db.conversations.create_index("user_id")
        mongo_db.conversations.create_index("session_id")
        mongo_db.messages.create_index("conversation_id")
        mongo_db.messages.create_index([("conversation_id", 1), ("timestamp", 1)])

    return mongo_db


def get_db() -> Database:
    """Get MongoDB database instance."""
    global mongo_db
    if not mongo_db:
        init_mongo()
    return mongo_db


def save_message(user_id: str, session_id: str, message: Dict[str, Any]) -> str:
    """Save a message to MongoDB and return the message ID."""
    db = get_db()

    # Check if conversation exists
    conversation = db.conversations.find_one({
        "user_id": user_id,
        "session_id": session_id
    })

    # Create conversation if it doesn't exist
    if not conversation:
        conversation_id = db.conversations.insert_one({
            "user_id": user_id,
            "session_id": session_id,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "title": message.get("content", "")[:30] + "..." if len(message.get("content", "")) > 30 else message.get(
                "content", "")
        }).inserted_id
    else:
        conversation_id = conversation["_id"]
        # Update conversation timestamp
        db.conversations.update_one(
            {"_id": conversation_id},
            {"$set": {"updated_at": datetime.utcnow()}}
        )

    # Add conversation_id to message
    message["conversation_id"] = conversation_id

    # Make sure timestamp exists
    if "timestamp" not in message:
        message["timestamp"] = datetime.utcnow()

    # Insert message
    message_id = db.messages.insert_one(message).inserted_id

    return str(message_id)


def get_conversation_messages(conversation_id: str) -> List[Dict[str, Any]]:
    """Get all messages for a conversation."""
    db = get_db()
    messages = list(db.messages.find(
        {"conversation_id": conversation_id},
        {"_id": 0}
    ).sort("timestamp", 1))
    return messages


def get_user_conversations(user_id: str, limit: int = 20, skip: int = 0) -> List[Dict[str, Any]]:
    """Get conversations for a user."""
    db = get_db()
    conversations = list(db.conversations.find(
        {"user_id": user_id},
        {"_id": 1, "title": 1, "created_at": 1, "updated_at": 1, "session_id": 1}
    ).sort("updated_at", -1).skip(skip).limit(limit))
    return conversations


def get_session_conversation(user_id: str, session_id: str) -> Optional[Dict[str, Any]]:
    """Get conversation for a specific session."""
    db = get_db()
    conversation = db.conversations.find_one(
        {"user_id": user_id, "session_id": session_id},
        {"_id": 1, "title": 1, "created_at": 1, "updated_at": 1}
    )
    return conversation