import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from dotenv import load_dotenv
load_dotenv()


from app.routers import auth, submissions, leaderboard
from app.components.database import engine
from app.components.models import Base


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("ALLOWED_ORIGINS"),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(submissions.router)
app.include_router(leaderboard.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Hackathon Platform!"}
