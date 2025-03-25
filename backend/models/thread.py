from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from models.base import Base


class Thread(Base):
    __tablename__ = "thread"

    id: Mapped[int] = mapped_column(primary_key=True)
    userId: Mapped[int] = mapped_column(ForeignKey("user.id"))

    messages = relationship("Message", back_populates="thread", cascade="all, delete-orphan")
    user = relationship("User", back_populates="threads")

    def __repr__(self) -> str:
        return f"Thread(id={self.id!r}, userId={self.userId!r}, created_at={self.created_at!r}, updated_at={self.updated_at!r})"
