from fastapi import APIRouter

from .endpoints import message, thread, user

router = APIRouter(prefix="/v1")

router.include_router(user.router)
router.include_router(thread.router)
router.include_router(message.router)
