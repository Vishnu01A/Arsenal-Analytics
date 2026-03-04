from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware # Add this
from sqlmodel import Session, select
from database import get_session
from models import EPLStanding

app = FastAPI()

# Add this block to allow your Next.js app to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/standings")
def read_standings(session: Session = Depends(get_session)):
    statement = select(EPLStanding).order_by(EPLStanding.position)
    results = session.exec(statement).all()
    return results