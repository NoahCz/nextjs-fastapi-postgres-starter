from sqlalchemy import TIMESTAMP, Integer, func
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base


class Thread(Base):
    __tablename__ = "thread"

    id: Mapped[int] = mapped_column(primary_key=True)
    userId: Mapped[int] = mapped_column(Integer)
    created_at: Mapped[str] = mapped_column(TIMESTAMP, server_default=func.now())
    updated_at: Mapped[str] = mapped_column(
        TIMESTAMP, server_default=func.now(), onupdate=func.now()
    )

    def __repr__(self) -> str:
        return f"Thread(id={self.id!r}, userId={self.userId!r}, created_at={self.created_at!r}, updated_at={self.updated_at!r})"
