# app/components/crud.py
from sqlalchemy.orm import Session
from app.components import models, schemas
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_user_by_email(db: Session, user_role : str, user_email: str):
    
    if user_role == schemas.RoleEnum.TEAM:
        return db.query(models.Team).filter(models.Team.email == user_email).first()
    elif user_role == schemas.RoleEnum.JURY:
        return db.query(models.JuryMember).filter(models.JuryMember.email == user_email).first()
    else:
        return None    

def create_team(db: Session, team: schemas.UserCreate):
    hashed_password = pwd_context.hash(team.password)
    db_team = models.Team(
        name=team.name,
        email=team.email,
        hashed_password=hashed_password,
    )
    db.add(db_team)
    db.commit()
    db.refresh(db_team)
    return db_team

def create_jury_member(db: Session, user: schemas.UserCreate):
    hashed_password = pwd_context.hash(user.password)
    db_user = models.JuryMember(
        name=user.name,
        email=user.email,
        hashed_password=hashed_password,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def create_submission(
    db: Session,
    team_id: int,
    accuracy: float,
    precision: float,
    recall: float,
    f1_score: float,
    file_path: str,
    jury_score: float = None,
):
    db_submission = models.Submission(
        team_id=team_id,
        accuracy=accuracy,
        precision=precision,
        recall=recall,
        f1_score=f1_score,
        file_path=file_path,
        jury_score=None,
    )
    db.add(db_submission)
    db.commit()
    db.refresh(db_submission)
    return db_submission


def create_jury_score(db: Session, team_id: int, jury_id: int, score: float):
    jury_score = db.query(models.JuryScore).filter_by(team_id=team_id, jury_id=jury_id).first()
    
    if jury_score:
        jury_score.score = score
    else:
        jury_score = models.JuryScore(team_id=team_id, jury_id=jury_id, score=score)
        db.add(jury_score)
    
    db.commit()
    db.refresh(jury_score)
    return jury_score


def get_average_jury_score(db: Session, team_id: int):
    scores = db.query(models.JuryScore).filter_by(team_id=team_id).all()
    if not scores:
        return None
    return sum([score.score for score in scores]) / len(scores)
