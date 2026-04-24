from sqlalchemy import create_engine, event
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///./gatorsched.db"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False},
)

SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,  # SQLAlchemy recommends this to be "True"
    autocommit=False,  # This is automatic in SQLAlchemy 2.0 - remove after confirming in docs
)


@event.listens_for(engine, "connect")
def enable_foreign_keys(dbapi_conn, connection_record):
    cursor = dbapi_conn.cursor()
    cursor.execute("PRAGMA foreign_keys=ON")
    cursor.close()
