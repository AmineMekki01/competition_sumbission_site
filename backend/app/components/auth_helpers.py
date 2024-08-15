# app/components/auth_helpers.py
import os
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from app.components import crud


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def authenticate_user(db: Session, email: str, password: str, role: str):
    user = crud.get_user_by_email(db, user_role=role, user_email=email)
    if not user or not verify_password(password, user.hashed_password):
        return None
    return user

def create_access_token(data: dict):
    to_encode = data.copy()
    encoded_jwt = jwt.encode(to_encode, os.getenv("SECRET_KEY"), os.getenv("ALGORITHM"))
    return encoded_jwt
