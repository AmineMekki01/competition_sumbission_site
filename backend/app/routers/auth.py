# app/routers/auth.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.components import schemas, crud
from app.components.database import get_db
from app.components import auth_helpers

router = APIRouter()

@router.post("/register/")
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    if user.role == schemas.RoleEnum.TEAM:
        user_data = crud.get_user_by_email(db, user_role=user.role, user_email=user.email)
        if user_data:
            print("Email already registered")
            raise HTTPException(status_code=400, detail="Email already registered")
        new_user = crud.create_team(db, user)
    elif user.role == schemas.RoleEnum.JURY:
        jury_data = crud.get_user_by_email(db, user_role=user.role, user_email=user.email)
        if jury_data:
            print("Email already registered")
            raise HTTPException(status_code=400, detail="Email already registered")
        new_user = crud.create_jury_member(db, user)
    else:
        print(f'Invalid role provided: {user.role}')
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

