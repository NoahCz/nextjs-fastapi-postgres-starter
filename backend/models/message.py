from typing import Optional

from sqlalchemy import TIMESTAMP, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base


class Message(Base):
    __tablename__ = "message"

    id: Mapped[int] = mapped_column(primary_key=True)
    threadId: Mapped[int] = mapped_column(Integer)
    userId: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    content: Mapped[str] = mapped_column(String)
    created_at: Mapped[str] = mapped_column(TIMESTAMP, server_default=func.now())

    def __repr__(self) -> str:
        return f"Message(id={self.id!r}, threadId={self.threadId!r}, userId={self.userId!r}, content={self.content!r})"
