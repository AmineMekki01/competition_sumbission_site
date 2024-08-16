# app/routers/submissions.py
from typing import List
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.components import models, schemas, crud, metrics, auth_helpers
from app.components.database import get_db

router = APIRouter()

@router.post("/submit/", response_model=schemas.Submission)
async def submit_file(user_id: str = Form(...), file: UploadFile = File(...), db: Session = Depends(get_db)):
    team = db.query(models.Team).filter(models.Team.id == user_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    file_location = f"data/{team.name}_{file.filename}"
    with open(file_location, "wb+") as file_object:
        file_object.write(file.file.read())

    ground_truth_path = "./data/ground_truth.csv"
    accuracy, precision, recall, f1 = metrics.calculate_metrics(file_location, ground_truth_path)

    submission = crud.create_submission(db, team.id, accuracy, precision, recall, f1, file_location, jury_score=None)
    
    return submission



@router.get("/submission_history/", response_model=List[schemas.Submission])
def get_submission_history(
    user_id : int,
    db: Session = Depends(get_db),
):
    submissions = db.query(models.Submission).filter(models.Submission.team_id == user_id).all()
    if not submissions:
        raise HTTPException(status_code=404, detail="No submissions found")
    return submissions