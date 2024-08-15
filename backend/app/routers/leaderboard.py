# app/routers/leaderboard.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.components import models, crud, schemas
from app.components.database import get_db
from app.components.auth_helpers import oauth2_scheme
from app.components.metrics import calculate_final_score

router = APIRouter()

@router.get("/leaderboard/")
def get_leaderboard(db: Session = Depends(get_db), user_role: str = None):
    teams = db.query(models.Team).all()
    leaderboard = []
    for team in teams:
        accuracy = max((sub.accuracy for sub in team.submissions), default=None)
        jury_score = crud.get_average_jury_score(db, team_id=team.id)

        final_score = calculate_final_score(accuracy, jury_score)

        entry = {
            "team_id": team.id,
            "team_name": team.name,
            "accuracy": accuracy,
            "jury_score": jury_score,
            "final_score": final_score,
            "can_score": user_role == schemas.RoleEnum.JURY
        }
        leaderboard.append(entry)

    leaderboard.sort(key=lambda x: x['final_score'], reverse=True)

    return leaderboard


@router.post("/score/", response_model=schemas.JuryScore)
def score_team(
    score_input: schemas.ScoreInput,
    db: Session = Depends(get_db), 
    token: str = Depends(oauth2_scheme),
):
    print(f"Received data: {score_input}")  # Debugging print statement
    jury_member = db.query(models.JuryMember).filter(models.JuryMember.id == score_input.user_id).first()
    if not jury_member:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized")

    if not (0 <= score_input.score <= 10):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Score must be between 0 and 10")

    jury_score = crud.create_jury_score(db, team_id=score_input.team_id, jury_id=score_input.user_id, score=score_input.score)
    return jury_score
