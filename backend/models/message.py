from typing import Optional

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from models.base import Base


class Message(Base):
    __tablename__ = "message"

    id: Mapped[int] = mapped_column(primary_key=True)
    threadId: Mapped[int] = mapped_column(ForeignKey("thread.id"))
    userId: Mapped[Optional[int]] = mapped_column(ForeignKey("user.id"), nullable=True)
    content: Mapped[str] = mapped_column(String)

    thread = relationship("Thread", back_populates="messages")
    user = relationship("User", back_populates="messages")
    
    def __repr__(self) -> str:
        return f"Message(id={self.id!r}, threadId={self.threadId!r}, userId={self.userId!r}, content={self.content!r})"
