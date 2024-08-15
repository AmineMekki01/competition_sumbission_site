# app/components/schemas.py
from pydantic import BaseModel
from typing import Optional
from enum import Enum


class RoleEnum(str, Enum):
    TEAM = "team"
    JURY = "jury"

class TeamCreate(BaseModel):
    name: str
    password: str


class Team(BaseModel):
    id: int
    name: str
    id: int

    class Config:
        orm_mode = True

class Submission(BaseModel):
    id: int
    team_id: int
    file_path: str
    accuracy: float
    jury_score: Optional[float] = None
    
    class Config:
        orm_mode = True
        

class Token(BaseModel):
    access_token: str
    token_type: str
    user_id: int


class UserLogin(BaseModel):
    email: str
    password: str
    role: str

class UserBase(BaseModel):
    name: str
    email: str
    role: RoleEnum

class UserCreate(UserBase):
    password: str

