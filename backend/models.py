from sqlmodel import SQLModel, Field
from uuid import UUID
from typing import Optional

class EPLStanding(SQLModel, table=True):
    __tablename__ = "epl_standings"
    
    id: Optional[UUID] = Field(default=None, primary_key=True)
    position: int
    club: str
    points: int
    played: int
    wins: int
    draws: int
    losses: int
    goal_difference: int
    goals_for: int
    goals_against: int
