from pydantic import BaseModel


class UserRead(BaseModel):
    id: int
    name: str
    profilePicture: str
    username: str
