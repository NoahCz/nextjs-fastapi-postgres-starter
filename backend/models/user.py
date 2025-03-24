from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base


class User(Base):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(30))
    username: Mapped[str] = mapped_column(String(30))
    profile_picture_link: Mapped[str] = mapped_column(String(128))

    def __repr__(self) -> str:
        return f"User(id={self.id!r}, name={self.name!r}"
