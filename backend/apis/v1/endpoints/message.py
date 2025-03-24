from datetime import datetime
from typing import Optional

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from apis.v1.schemas.message import MessageCreate, MessageResponse
from db_engine import sync_engine
from models import Message, Thread, User

router = APIRouter()


@router.post("/messages", response_model=MessageResponse)
def create_message(message: MessageCreate):
    """
    Create a new message in a thread.

    If userId is None, the message will be treated as coming from the bot/system.
    """
    with Session(sync_engine) as session:
        thread = session.get(Thread, message.threadId)
        if not thread:
            raise HTTPException(status_code=404, detail="Thread not found")

        if message.userId:
            user = session.get(User, message.userId)
            if not user:
                raise HTTPException(status_code=404, detail="User not found")

        # Create new message
        new_message = Message(
            content=message.content,
            userId=message.userId,  # Can be None for bot messages
            threadId=message.threadId,
            created_at=datetime.now(),
        )

        # Create response message (this is a bot response, so userId is None)
        response_message = Message(
            content="My very well thought out response",
            userId=None,  # Explicitly set to None to indicate bot message
            threadId=message.threadId,
            created_at=datetime.now(),
        )

        thread.updated_at = datetime.now()

        session.add(new_message)
        session.add(response_message)
        session.commit()
        session.refresh(thread)

        return MessageResponse(
            id=new_message.id,
            content=new_message.content,
            userId=new_message.userId,
            threadId=new_message.threadId,
            createdAt=str(new_message.created_at),
        )


@router.get("/messages/thread/{thread_id}", response_model=list[MessageResponse])
def get_messages_by_thread(thread_id: int):
    """
    Retrieve all messages belonging to a specific thread.

    Messages with userId=None are considered bot/system messages.
    """
    with Session(sync_engine) as session:
        thread = session.get(Thread, thread_id)
        if not thread:
            raise HTTPException(status_code=404, detail="Thread not found")

        messages = session.query(Message).filter(Message.threadId == thread_id).all()

        message_responses = [
            MessageResponse(
                id=message.id,
                content=message.content,
                userId=message.userId,
                threadId=message.threadId,
                createdAt=str(message.created_at),
            )
            for message in messages
        ]

        return message_responses
