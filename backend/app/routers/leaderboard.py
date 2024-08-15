# app/routers/leaderboard.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.components import models
from app.components.database import get_db

router = APIRouter()

@router.get("/leaderboard/")
def get_leaderboard(db: Session = Depends(get_db)):
    teams = db.query(models.Team).all()

    leaderboard = []
    for team in teams:
        accuracy = max((sub.accuracy for sub in team.submissions), default=None)

        leaderboard.append({
            "team_name": team.name,
            "accuracy": accuracy,
            "jury_score": None,
        })

    leaderboard.sort(key=lambda x: (x['accuracy'] if x['accuracy'] is not None else 0), reverse=True)

    return leaderboard