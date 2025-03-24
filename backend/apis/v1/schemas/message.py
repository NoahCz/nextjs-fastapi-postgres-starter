from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class MessageCreate(BaseModel):
    content: str
    userId: Optional[int] = None  # None indicates a bot/system message
    threadId: int


class MessageResponse(BaseModel):
    id: int
    content: str
    userId: Optional[int]  # None indicates a bot/system message
    threadId: int
    createdAt: datetime
