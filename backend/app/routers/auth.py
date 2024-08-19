# app/routers/auth.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.components import schemas, crud
from app.components.database import get_db
from app.components import auth_helpers

router = APIRouter()

@router.post("/register/")
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    email_exists, name_exists = crud.is_user_exist(db, email=user.email, name=user.name)

    if email_exists and name_exists:
        raise HTTPException(status_code=400, detail="Both email and username are already registered")
    elif email_exists:
        raise HTTPException(status_code=400, detail="Email already registered")
    elif name_exists:
        raise HTTPException(status_code=400, detail="Username already registered")

    if user.role == schemas.RoleEnum.TEAM:
        new_user = crud.create_team(db, user)
    elif user.role == schemas.RoleEnum.JURY:
        new_user = crud.create_jury_member(db, user)
    else:
        raise HTTPException(status_code=400, detail="Invalid role provided")

    return new_user


@router.post("/token", response_model=schemas.Token)
def login_for_access_token(
    form_data: schemas.UserLogin, 
    db: Session = Depends(get_db)
):
    user = auth_helpers.authenticate_user(db, form_data.email, form_data.password, form_data.role)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = auth_helpers.create_access_token(data={"sub": user.email})
    
    return {"access_token": access_token, "token_type": "bearer", "user_id": user.id}

