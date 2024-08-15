# app/components/models.py
from sqlalchemy import Column, Integer, String, ForeignKey, Float
from sqlalchemy.orm import relationship
from app.components.database import Base


class Team(Base):
    __tablename__ = "teams"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    
    submissions = relationship("Submission", back_populates="team")
    jury_scores = relationship("JuryScore", back_populates="team")


class JuryMember(Base):
    __tablename__ = "jury_members"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    scores = relationship("JuryScore", back_populates="jury_member")


class JuryScore(Base):
    __tablename__ = "jury_scores"

    id = Column(Integer, primary_key=True, index=True)
    team_id = Column(Integer, ForeignKey("teams.id"))
    jury_id = Column(Integer, ForeignKey("jury_members.id"))
    score = Column(Float)

    team = relationship("Team", back_populates="jury_scores")
    jury_member = relationship("JuryMember", back_populates="scores")

class Submission(Base):
    __tablename__ = "submissions"

    id = Column(Integer, primary_key=True, index=True)
    team_id = Column(Integer, ForeignKey("teams.id"))
    accuracy = Column(Float)
    precision = Column(Float)
    recall = Column(Float)
    f1_score = Column(Float)
    file_path = Column(String)
    jury_score = Column(Float, nullable=True)
    team = relationship("Team", back_populates="submissions")