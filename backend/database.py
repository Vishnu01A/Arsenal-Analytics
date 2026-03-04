from sqlmodel import create_engine, Session

DATABASE_URL = "postgresql://postgres:coyg123@localhost:5432/arsenal_analytics"
engine = create_engine(DATABASE_URL, echo=True)

def get_session():
    with Session(engine) as session:
        yield session