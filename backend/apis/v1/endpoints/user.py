from fastapi import APIRouter, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from apis.v1.schemas.user import UserRead
from db.db_engine import engine
from models import User

router = APIRouter()


@router.get("/users/me")
async def get_my_user():
    async with AsyncSession(engine) as session:
        async with session.begin():
            result = await session.execute(select(User))
            user = result.scalars().first()

            if user is None:
                raise HTTPException(status_code=404, detail="User not found")
            return UserRead(
                id=user.id,
                name=user.name,
                username=user.username,
                profilePicture=user.profile_picture_link,
            )
