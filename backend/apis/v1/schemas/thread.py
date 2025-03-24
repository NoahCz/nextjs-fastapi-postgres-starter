from datetime import datetime

from pydantic import BaseModel


class ThreadCreate(BaseModel):
    userId: int


class ThreadResponse(BaseModel):
    id: int
    userId: int
    createdAt: datetime
    updatedAt: datetime
