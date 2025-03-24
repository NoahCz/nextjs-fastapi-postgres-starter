from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from apis import v1
from seed import seed_user_if_needed

seed_user_if_needed()

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(v1.router)
