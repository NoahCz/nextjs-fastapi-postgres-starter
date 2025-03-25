from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session

from apis.v1.schemas.thread import ThreadCreate, ThreadResponse
from db.db_engine import sync_engine
from models import Thread, User

router = APIRouter()


@router.post("/threads")
def create_thread(thread: ThreadCreate):
    with Session(sync_engine) as session:
        user = session.get(User, thread.userId)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        new_thread = Thread(userId=thread.userId)
        session.add(new_thread)
        session.commit()

        return {"threadId": new_thread.id}


@router.get("/users/{user_id}/threads", response_model=list[ThreadResponse])
def get_threads_by_user(user_id: int):
    """
    Retrieve all threads belonging to a specific user.
    """
    with Session(sync_engine) as session:
        user = session.get(User, user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        threads = user.threads

        thread_responses = [
            ThreadResponse(
                id=thread.id,
                userId=thread.userId,
                createdAt=str(thread.created_at),
                updatedAt=str(thread.updated_at),
            )
            for thread in threads
        ]

    return thread_responses
